"use client";

import { PROJECT_TITLE } from "~/lib/constants";
import { NFTMintFlow } from "~/components/nft-mint-flow";

export default function App() {
  return (
    <div className="w-[400px] mx-auto py-8 px-4 min-h-screen flex flex-col items-center justify-center">
      {/* TEMPLATE_CONTENT_START - Replace content below */}
      <GoddessWindsMintFlow />
      {/* TEMPLATE_CONTENT_END */}
    </div>
  );
}

function GoddessWindsMintFlow() {
  return (
    <div className="space-y-6 max-w-sm mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Goddess Winds
        </h1>
        <p className="text-sm text-muted-foreground">
          Mint your NFT with just two clicks
        </p>
      </div>

      <NFTMintFlow
        contractAddress="0x9a6a629ee4579f731ce8f27d3e6024b1ed572e59"
        tokenId="1"
        network="base"
        manifoldParams={{
          instanceId: "4283867376"
        }}
        buttonText="Mint NFT"
      />

      <div className="text-center">
        <a 
          href="https://app.manifold.xyz/c/goddess-winds"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
        >
          View Collection
          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
}
