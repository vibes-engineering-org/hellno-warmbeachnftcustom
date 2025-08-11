"use client";

import { PROJECT_TITLE } from "~/lib/constants";
import { NFTMintFlow } from "~/components/nft-mint-flow";

export default function App() {
  return (
    <div className="w-[400px] mx-auto py-8 px-4 min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* TEMPLATE_CONTENT_START - Replace content below */}
      <CyberpunkMintFlow />
      {/* TEMPLATE_CONTENT_END */}
    </div>
  );
}

function CyberpunkMintFlow() {
  return (
    <div className="space-y-8 max-w-sm mx-auto">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-xl rounded-3xl"></div>
        <div className="relative bg-black/80 backdrop-blur border border-cyan-500/30 rounded-2xl p-6 shadow-2xl">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 mb-2">
              <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 9.739 9 11 5.16-1.261 9-5.45 9-11V7l-10-5z"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Cyberpunk Collection
            </h1>
            <p className="text-sm text-gray-400">
              Enter the digital realm. One mint per wallet.
            </p>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg border border-gray-700">
              <span className="text-sm text-gray-300">Supply</span>
              <span className="text-sm text-cyan-400 font-mono">Unlimited</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg border border-gray-700">
              <span className="text-sm text-gray-300">Per Wallet</span>
              <span className="text-sm text-purple-400 font-mono">1</span>
            </div>
          </div>

          <div className="w-full mt-6">
            <NFTMintFlow
              contractAddress="0x181359eCCcD120aB3FF71267C6c171BdAaC02d17"
              tokenId="1"
              network="base"
              buttonText="JACK IN"
            />
          </div>
        </div>
      </div>

      <div className="text-center">
        <div className="text-xs text-gray-500 font-mono">
          Contract: 0x1813...2d17
        </div>
      </div>
    </div>
  );
}
