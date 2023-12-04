'use client';

import CoinSlider from '@/components/ui/coin-card-two';
import OverviewChart from '@/components/ui/chats/overview-chart';
import ComparisonChart from '@/components/ui/chats/retro-comparision-chart';
// import VolumeChart from '@/components/ui/chats/volume-chart';
import TopPools from '@/components/ui/top-pools';
import TransactionTable from '@/components/transaction/transaction-table';
import TopCurrencyTable from '@/components/top-currency/currency-table';
import { coinSlideData } from '@/data/static/coin-slide-data';
import TransactCoin from '@/components/ui/transact-coin';
import Avatar from '@/components/ui/avatar';
import TopupButton from '@/components/ui/topup-button';
//images
import AuthorImage from '@/assets/images/author.jpg';
import ExplorerHero from '../ui/explorer-hero';
import ExplorerTable from '../explorer/explorer-table';

export default function ClassicScreen() {
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
          <CoinSlider coins={coinSlideData} />
        </div>
      </div>

      <div className="my-8 sm:my-10">
        <ExplorerTable />
      </div>

      <div className="my-8 sm:my-10">
        <TopCurrencyTable />
      </div>

      <div className="flex flex-wrap">
        <div className="w-full lg:w-[calc(100%-288px)] ltr:lg:pr-6 rtl:lg:pl-6 2xl:w-[calc(100%-320px)] 3xl:w-[calc(100%-358px)]">
          <TransactionTable />
        </div>
        <div className="order-first mb-8 grid w-full grid-cols-1 gap-6 sm:mb-10 sm:grid-cols-2 lg:order-1 lg:mb-0 lg:flex lg:w-72 lg:flex-col 2xl:w-80 3xl:w-[358px]">
          <OverviewChart />
          <TopPools />
        </div>
      </div>
    </>
  );
}
