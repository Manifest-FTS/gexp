'use client';

import CoinSlider from '@/components/ui/coin-card-two';
import OverviewChart from '@/components/ui/chats/overview-chart';
import ComparisonChart from '@/components/ui/chats/retro-comparision-chart';
// import VolumeChart from '@/components/ui/chats/volume-chart';
import TopPools from '@/components/ui/top-pools';
import TransactionTable from '@/components/transaction/transaction-table';
import TopCurrencyTable from '@/components/top-currency/currency-table';
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
          <ExplorerHero />
        </div>
      </div>

      <div className="flex flex-wrap">
        <div className="mb-8 w-full sm:mb-0  dark:[&_.swiper-scrollbar>_.swiper-scrollbar-drag]:bg-body/50">
          <CoinSlider />
        </div>
      </div>

      <div className="my-8 sm:my-10">
        <ExplorerTable />
      </div>
    </>
  );
}
