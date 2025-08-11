"use client";

import { PROJECT_TITLE } from "~/lib/constants";
import { NFTMintFlow } from "~/components/nft-mint-flow";

export default function App() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-black relative overflow-hidden">
      {/* TEMPLATE_CONTENT_START - Replace content below */}
      <CyberpunkMintFlow />
      {/* TEMPLATE_CONTENT_END */}
    </div>
  );
}

function CyberpunkMintFlow() {
  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 py-8">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-purple-900/20 to-pink-900/20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] space-y-12">
        {/* Header section */}
        <div className="text-center space-y-6 max-w-2xl">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 p-1 mb-4">
            <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 9.739 9 11 5.16-1.261 9-5.45 9-11V7l-10-5z"/>
              </svg>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
            CYBERPUNK
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 font-mono tracking-wider">
            ENTER THE DIGITAL REALM
          </p>
          
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Main card */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-75"></div>
          <div className="relative bg-black/90 backdrop-blur-xl border border-cyan-500/50 rounded-3xl p-8 md:p-12 shadow-2xl min-w-[400px] max-w-lg">
            
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center p-6 bg-gray-900/50 rounded-2xl border border-gray-700/50">
                <div className="text-3xl font-bold text-cyan-400 font-mono mb-2">∞</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Supply</div>
              </div>
              
              <div className="text-center p-6 bg-gray-900/50 rounded-2xl border border-gray-700/50">
                <div className="text-3xl font-bold text-purple-400 font-mono mb-2">1</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Per Wallet</div>
              </div>
            </div>

            {/* Mint section */}
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-gray-300 mb-2">Ready to jack in?</p>
                <p className="text-xs text-gray-500 font-mono">One mint per wallet • No special attributes</p>
              </div>
              
              <NFTMintFlow
                contractAddress="0x181359eCCcD120aB3FF71267C6c171BdAaC02d17"
                tokenId="1"
                network="base"
                buttonText="JACK IN"
              />
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center space-y-2">
          <div className="text-xs text-gray-500 font-mono tracking-wider">
            CONTRACT: 0x1813...2d17
          </div>
          <div className="flex items-center justify-center space-x-2 text-xs text-gray-600">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="font-mono">NETWORK: BASE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
