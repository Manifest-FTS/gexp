'use client';
import React, { useEffect } from 'react';
// import CoinSlider from '@/components/ui/coin-card-two';
// import ExplorerHero from '@/components/ui/explorer-hero';
// import ExplorerTable from '@/components/explorer/explorer-table';
// import BlockPieChart from '@/components/ui/chats/block-per-channel';
// import NewBlockBarChart from '@/components/ui/chats/new-block';
import SearchContextProvider from '@/lib/context/GlobalSearchContext';

// 🚨 EXPLORER COMPONENTS DEACTIVATED - Now focusing on NFT Marketplace
// All explorer components are preserved and can be re-enabled when needed

export default function Home() {
  return (
    <SearchContextProvider>
      {/* 🎯 MARKETPLACE MODE - Explorer Deactivated */}
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            🚀 GEXP Marketplace
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Welcome to the Gala Experience! The premier NFT marketplace for
            Galachain assets.
          </p>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 max-w-xl mx-auto">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              📢 <strong>Explorer Temporarily Deactivated</strong>
              <br />
              We&apos;re focusing on building the best NFT marketplace
              experience. Explorer functionality will return soon!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border">
            <h3 className="text-lg font-semibold mb-2">🎨 Browse NFTs</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Discover amazing Galachain NFTs from games, music, and more
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border">
            <h3 className="text-lg font-semibold mb-2">💼 Create Listings</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              List your NFTs for sale with flexible pricing and bundle options
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border">
            <h3 className="text-lg font-semibold mb-2">⭐ GEXP Score</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Build your Gala Experience score through trading and reviews
            </p>
          </div>
        </div>
      </div>

      {/* DEACTIVATED EXPLORER COMPONENTS - Preserved for future use
      <div className="flex flex-wrap mb-4">
        <div className="w-full sm:mb-0  dark:[&_.swiper-scrollbar>_.swiper-scrollbar-drag]:bg-body/50">
          <ExplorerHero />
        </div>
      </div>
      <div>
        <div className="flex flex-wrap mb-4">
          <div className="w-full sm:mb-0  dark:[&_.swiper-scrollbar>_.swiper-scrollbar-drag]:bg-body/50">
            <CoinSlider />
          </div>
        </div>
        <div className="flex max-lg:flex-col gap-4 mb-4">
          <div className="flex-1 sm:mb-0 dark:[&_.swiper-scrollbar>_.swiper-scrollbar-drag]:bg-body/50">
            <NewBlockBarChart />
          </div>
          <div className="flex-1 sm:mb-0 dark:[&_.swiper-scrollbar>_.swiper-scrollbar-drag]:bg-body/50">
            <BlockPieChart />
          </div>
        </div>
      </div>

      <div className="my-4">
        <ExplorerTable />
      </div>
      */}
    </SearchContextProvider>
  );
}
