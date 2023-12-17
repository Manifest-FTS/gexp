// Import necessary components and hooks
import CryptocurrencySinglePrice from '@/components/cryptocurrency-pricing-table/cryptocurrency-single-price';
import React, { useState } from 'react';
import CoinInfo from '@/components/cryptocurrency-pricing-table/coin-info';
import { CoinConverter } from '@/components/ui/transact-coin';
import CoinTabs from '@/components/cryptocurrency-pricing-table/coin-tabs';
import TopCoin from '@/components/cryptocurrency-pricing-table/top-coin';
import InfoDrawer from '@/components/cryptocurrency-pricing-table/info-drawer';

// Define the main component
function CoinSinglePrice() {
  // State to manage the open/close state of the drawer
  const [isOpen, setIsOpen] = useState(false);

  // Render the component
  return (
    <>
      <div className="flex flex-wrap gap-6 lg:flex-nowrap">
        <div className="w-full lg:w-2/3">
          <CryptocurrencySinglePrice isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
        <div className="w-full rounded-lg bg-white py-8 shadow-card dark:bg-light-dark xl:max-w-[358px]">
          <h2 className="px-8 text-base font-medium uppercase text-gray-700 dark:text-gray-200">
            Info
          </h2>
          <CoinInfo />
          <div>
            <span className="block border-t border-dashed border-t-gray-200 dark:border-t-gray-700" />
            <CoinConverter />
          </div>
          <div className="px-8 pb-10">
            <h2 className="text-base font-medium uppercase text-gray-700 dark:text-gray-200">
              Top Coins
            </h2>
            <TopCoin />
          </div>
        </div>
      </div>

      <div className="mt-10">
        <CoinTabs />
      </div>
    </>
  );
}

// Export the component as the default export
export default CoinSinglePrice;
