'use client';
import React from 'react';
import CoinSlider from '@/components/ui/coin-card-two';
import { coinSlideData } from '@/data/static/coin-slide-data';
import ExplorerHero from '@/components/ui/explorer-hero';
import ExplorerTable from '@/components/explorer/explorer-table';
import LivePricingSlider from '@/components/ui/live-pricing-slider';

export default function Home() {
  return (
    <>
      <div className="flex flex-wrap mb-8">
        <div className="mb-8 w-full sm:mb-0  dark:[&_.swiper-scrollbar>_.swiper-scrollbar-drag]:bg-body/50">
          {/* <CoinSlider coins={coinSlideData} /> */}
          <ExplorerHero />
        </div>
      </div>

      <div className="flex flex-wrap">
        <div className="mb-8 w-full sm:mb-0  dark:[&_.swiper-scrollbar>_.swiper-scrollbar-drag]:bg-body/50">
          {/* <CoinSlider coins={coinSlideData} /> */}
          <LivePricingSlider limits={4} />
        </div>
      </div>

      <div className="my-8 sm:my-10">
        <ExplorerTable />
      </div>
    </>
  );
}
