'use client';
import React, { useEffect } from 'react';
import CoinSlider from '@/components/ui/coin-card-two';
import ExplorerHero from '@/components/ui/explorer-hero';
import ExplorerTable from '@/components/explorer/explorer-table';
import BlockPieChart from '@/components/ui/chats/block-per-channel';
import NewBlockBarChart from '@/components/ui/chats/new-block';
import SearchContextProvider from '@/lib/context/GlobalSearchContext';

export default function Home() {
  return (
    <SearchContextProvider>
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
    </SearchContextProvider>
  );
}
