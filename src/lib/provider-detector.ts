import { type Address, type PublicClient } from "viem";
import type {
  NFTProvider,
  NFTContractInfo,
  MintParams,
} from "~/lib/types";
import { PROVIDER_CONFIGS } from "~/lib/provider-configs";
import { getPublicClient } from "~/lib/chains";
import {
  ERC165_ABI,
  INTERFACE_IDS,
  MANIFOLD_DETECTION_ABI,
} from "~/lib/nft-standards";

// Re-export from shared library for backward compatibility
export const getClientForChain = getPublicClient;

// Simple cache to prevent rapid duplicate detection calls
const detectionCache = new Map<string, { result: Promise<NFTContractInfo>; timestamp: number }>();
const CACHE_TTL = 30000; // 30 seconds

/**
 * Detects NFT provider and contract info with minimal RPC calls
 * Uses multicall where possible to batch requests and includes retry logic for reliability
 */
export async function detectNFTProvider(
  params: MintParams,
): Promise<NFTContractInfo> {
  const { contractAddress, chainId, provider: specifiedProvider } = params;
  const client = getClientForChain(chainId);

  // Create cache key
  const cacheKey = `${contractAddress}-${chainId}`;
  
  // Check cache for recent detection
  const cached = detectionCache.get(cacheKey);
  if (cached && (Date.now() - cached.timestamp) < CACHE_TTL) {
    console.log(`[Provider Detection] Using cached result for ${contractAddress}`);
    return await cached.result;
  }

  console.log(
    `[Provider Detection] Starting for contract ${contractAddress} on chain ${chainId}`,
  );

  // Create and cache the detection promise
  const detectionPromise = performDetection(params, client);
  detectionCache.set(cacheKey, { result: detectionPromise, timestamp: Date.now() });

  return await detectionPromise;
}

/**
 * Internal function that performs the actual detection logic
 */
async function performDetection(params: MintParams, client: any): Promise<NFTContractInfo> {
  const { contractAddress, chainId, provider: specifiedProvider } = params;

  // If provider is specified, use known configuration
  if (specifiedProvider) {
    console.log(
      `[Provider Detection] Using specified provider: ${specifiedProvider}`,
    );
    const config = PROVIDER_CONFIGS[specifiedProvider];

    // For Manifold, we know the extension address
    if (specifiedProvider === "manifold" && config.extensionAddresses?.[0]) {
      return {
        provider: "manifold",
        isERC1155: true, // Manifold contracts are typically ERC1155
        isERC721: false,
        extensionAddress: config.extensionAddresses[0],
        hasManifoldExtension: true,
      };
    }

    // For other providers, return basic info
    return {
      provider: specifiedProvider,
      isERC1155: false,
      isERC721: false,
    };
  }

  try {
    // First check ERC165 interfaces as they are most reliable
    const [isERC721, isERC1155] = await Promise.all([
      client
        .readContract({
          address: contractAddress,
          abi: ERC165_ABI,
          functionName: "supportsInterface",
          args: [INTERFACE_IDS.ERC721],
        })
        .catch(() => false),

      client
        .readContract({
          address: contractAddress,
          abi: ERC165_ABI,
          functionName: "supportsInterface",
          args: [INTERFACE_IDS.ERC1155],
        })
        .catch(() => false),
    ]);

    // Enhanced Manifold detection with retry logic and fallback methods
    const detectManifold = async (retries = 2): Promise<Address[] | null> => {
      for (let attempt = 0; attempt <= retries; attempt++) {
        try {
          console.log(`[Manifold Detection] Attempt ${attempt + 1}/${retries + 1} for contract ${contractAddress}`);
          
          // Primary method: Try getExtensions() call
          const extensions = await client.readContract({
            address: contractAddress,
            abi: MANIFOLD_DETECTION_ABI,
            functionName: "getExtensions",
          });

          if (extensions && Array.isArray(extensions) && extensions.length > 0) {
            console.log(`[Manifold Detection] ✅ Found extensions via getExtensions(): ${extensions.length} extensions`);
            return extensions as Address[];
          }
        } catch (error) {
          console.log(`[Manifold Detection] ⚠️ Attempt ${attempt + 1} failed:`, error);
          
          // If not the last attempt, wait before retrying
          if (attempt < retries) {
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 100)); // exponential backoff
          }
        }
      }

      // Fallback method: Check if contract has known Manifold function signatures
      try {
        console.log(`[Manifold Detection] Trying fallback method: checking for Manifold signatures`);
        
        // Try to call a function that exists on Manifold extension contracts
        // This is a more indirect check but can work when getExtensions fails
        await client.readContract({
          address: contractAddress,
          abi: [{
            inputs: [],
            name: "supportsInterface",
            outputs: [{ name: "", type: "bool" }],
            stateMutability: "view", 
            type: "function"
          }],
          functionName: "supportsInterface",
          args: ["0x6467a6fc" as any], // IManifoldExtension interface ID
        });
        
        console.log(`[Manifold Detection] ✅ Fallback method: Contract supports Manifold interface`);
        // If this succeeds, it's likely a Manifold contract, but we don't have extension addresses
        // Return a placeholder to indicate Manifold detection
        return [PROVIDER_CONFIGS.manifold.extensionAddresses?.[0] || "0x26BBEA7803DcAc346D5F5f135b57Cf2c752A02bE" as Address];
      } catch {
        console.log(`[Manifold Detection] ❌ Fallback method failed`);
      }

      return null;
    };

    // Attempt Manifold detection
    const extensions = await detectManifold();
    
    // Check if it's a Manifold contract
    if (extensions && extensions.length > 0) {
      const knownManifoldExtension = extensions.find((ext) =>
        PROVIDER_CONFIGS.manifold.extensionAddresses?.includes(ext),
      );

      console.log(
        `[Provider Detection] ✅ Detected as Manifold (has extensions)`,
      );
      return {
        provider: "manifold",
        isERC1155: isERC1155 as boolean,
        isERC721: isERC721 as boolean,
        extensionAddress: knownManifoldExtension || extensions[0],
        hasManifoldExtension: true,
      };
    }

    // Check if it's an NFTs2Me contract by looking for unique functions
    try {
      // Try to call n2mVersion - this is unique to NFTs2Me contracts
      const version = await client.readContract({
        address: contractAddress,
        abi: [
          {
            inputs: [],
            name: "n2mVersion",
            outputs: [{ name: "", type: "uint256" }],
            stateMutability: "pure",
            type: "function",
          },
        ],
        functionName: "n2mVersion",
      });

      // If n2mVersion exists, it's an NFTs2Me contract
      if (version !== undefined) {
        console.log(
          `[Provider Detection] ✅ Detected as NFTs2Me (n2mVersion: ${version})`,
        );
        return {
          provider: "nfts2me",
          isERC1155: isERC1155 as boolean,
          isERC721: isERC721 as boolean,
        };
      }
    } catch {
      // Not an NFTs2Me contract, continue detection
    }

    // Enhanced Thirdweb detection - run after more specific provider checks
    const detectThirdweb = async (): Promise<boolean> => {
      console.log(`[Thirdweb Detection] Checking contract: ${contractAddress}`);
      try {
        // Thirdweb contracts have a unique claimCondition() function that returns (uint256, uint256)
        const claimConditionResult = await client.readContract({
          address: contractAddress,
          abi: [
            {
              inputs: [],
              name: "claimCondition",
              outputs: [
                { name: "currentStartId", type: "uint256" },
                { name: "count", type: "uint256" },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
          functionName: "claimCondition",
        });
        
        // Verify the result is a valid tuple with 2 uint256 values
        if (Array.isArray(claimConditionResult) && claimConditionResult.length === 2) {
          console.log(`[Thirdweb Detection] ✅ Found claimCondition: startId=${claimConditionResult[0]}, count=${claimConditionResult[1]}`);
          
          // Additional validation with sharedMetadata to reduce false positives
          try {
            await client.readContract({
              address: contractAddress,
              abi: [
                {
                  inputs: [],
                  name: "sharedMetadata",
                  outputs: [
                    { name: "name", type: "string" },
                    { name: "description", type: "string" },
                    { name: "imageURI", type: "string" },
                    { name: "animationURI", type: "string" },
                  ],
                  stateMutability: "view",
                  type: "function",
                },
              ],
              functionName: "sharedMetadata",
            });
            console.log(`[Thirdweb Detection] ✅ Confirmed with sharedMetadata`);
            return true;
          } catch {
            // sharedMetadata not found, but claimCondition is strong signal for thirdweb
            console.log(`[Thirdweb Detection] ⚠️ sharedMetadata not found, but claimCondition is sufficient`);
            return true;
          }
        }
      } catch (error) {
        console.log(`[Thirdweb Detection] ❌ claimCondition check failed:`, error);
      }
      
      return false;
    };

    // Run thirdweb detection
    const isThirdweb = await detectThirdweb();
    if (isThirdweb) {
      return {
        provider: "thirdweb",
        isERC1155: isERC1155 as boolean,
        isERC721: isERC721 as boolean,
      };
    }

    // TODO: Add detection for OpenSea, Zora, etc.
    // For now, return generic
    console.log(
      `[Provider Detection] Final result: Generic provider (no specific platform detected)`,
    );
    return {
      provider: "generic",
      isERC1155: isERC1155 as boolean,
      isERC721: isERC721 as boolean,
    };
  } catch (error) {
    console.error("Error detecting NFT provider:", error);
    // Default to generic provider
    return {
      provider: "generic",
      isERC1155: false,
      isERC721: false,
    };
  }
}

/**
 * Validates parameters based on detected provider
 */
export function validateParameters(
  params: MintParams,
  contractInfo: NFTContractInfo,
): {
  isValid: boolean;
  missingParams: string[];
  errors: string[];
} {
  const config = PROVIDER_CONFIGS[contractInfo.provider];
  const missingParams: string[] = [];
  const errors: string[] = [];

  // Check required params for the provider
  for (const param of config.requiredParams) {
    if (!params[param as keyof MintParams]) {
      missingParams.push(param);
    }
  }

  // Provider-specific validation
  if (contractInfo.provider === "manifold") {
    if (!params.instanceId && !params.tokenId) {
      errors.push("Manifold NFTs require either instanceId or tokenId. Check the claim page URL for (e.g., /instance/123456) use getClaimForToken to find a specific");
      missingParams.push("instanceId or tokenId");
    }
    
    // Validate instanceId format if provided
    if (params.instanceId) {
      const instanceIdNum = parseInt(params.instanceId);
      if (isNaN(instanceIdNum) || instanceIdNum < 0) {
        errors.push(`Invalid instanceId format: ${params.instanceId}. Must be a positive integer.`);
      }
    }

    if (
      contractInfo.claim?.merkleRoot &&
      contractInfo.claim.merkleRoot !==
        "0x0000000000000000000000000000000000000000000000000000000000000000"
    ) {
      errors.push(
        "This NFT requires a merkle proof for minting - not supported yet",
      );
    }
  }

  if (contractInfo.provider === "thirdweb") {
    if (
      contractInfo.claimCondition?.merkleRoot &&
      contractInfo.claimCondition.merkleRoot !==
        "0x0000000000000000000000000000000000000000000000000000000000000000"
    ) {
      errors.push(
        "This NFT requires a merkle proof for minting - not supported yet",
      );
    }

    if (contractInfo.claimCondition?.startTimestamp) {
      const now = Math.floor(Date.now() / 1000);
      if (now < contractInfo.claimCondition.startTimestamp) {
        errors.push("Claim has not started yet");
      }
    }
  }

  return {
    isValid: missingParams.length === 0 && errors.length === 0,
    missingParams,
    errors,
  };
}
