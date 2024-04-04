import { useChannelList, useGlobalSearch } from '@/hooks/useCoin';
import { calculateAgeInDays } from '@/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { truncateMiddle } from './truncate-middle';

export default function ExplorerHero() {
  const channels = useChannelList();
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const { searchData, isLoading } = useGlobalSearch(
    `blockNumber:${searchValue} OR txId:${searchValue} OR channelName:${searchValue} OR blockType:${searchValue} OR valid:${searchValue} OR executes:${searchValue} OR reads:${searchValue} OR writes:${searchValue}`,
  );

  return (
    <div className="relative p-4 md:p-6 text-gray-800 bg-gray-200 rounded-lg dark:bg-light-dark dark:text-gray-200">
      <div className="flex flex-col xl:items-center gap-4 xl:flex-row">
        <h1 className="text-3xl font-bold uppercase">GalaChain Explorer</h1>
        <div className="flex gap-2 max-md:flex-col">
          <div className="relative w-full border rounded-md border-[#6b7280]">
            <input
              type="text"
              placeholder="Search TxId / Block"
              className="w-full pt-2.5 pl-4 pr-12 border-0 rounded-md shadow-none  dark:bg-light-dark"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                if (!isOpen) {
                  setIsOpen(true);
                } else if (!e.target.value) {
                  setIsOpen(false);
                }
              }}
            />
            <button
              className="absolute text-md transform -translate-y-1/2 right-3 top-1/2"
              onClick={() => {
                setIsOpen((e) => {
                  if (e) {
                    setSearchValue('');
                  }
                  return !e;
                });
              }}
            >
              {isOpen ? '❌' : '🔍'}
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-10 mt-1 left-0 right-0 w-full xl:w-[50vw] p-2 bg-white dark:bg-light-dark  border dark:border-dark dark:divide-[#6b7280] divide-y divide-dashed rounded-md shadow-lg max-h-[50vh] overflow-auto"
                >
                  {isLoading ? (
                    <div className="p-2">Loading...</div>
                  ) : searchData ? (
                    searchData.map((option: any, index: number) => (
                      <div
                        key={index}
                        className="p-1 md:p-2 hover:bg-gray-200 dark:hover:bg-gray-200/10  cursor-pointer transition-all duration-150 flex items-center gap-4 rounded"
                        onClick={() => console.log(option)}
                      >
                        <div className="flex-[2] flex flex-col text-[11px] leading-4 xs:text-xs md:text-[14px] md:leading-5">
                          <span>
                            <b className="font-semibold">Channel</b>:{' '}
                            {option.channelName}
                          </span>
                          <span>
                            <b className="font-semibold">Block</b>:{' '}
                            <a
                              href={`/explorer/blocks/${option.blockNumber}?channel=${option.channelId}`}
                              className="text-blue-600 dark:text-blue-500 hover:underline"
                            >
                              #{option.blockNumber}
                            </a>
                          </span>
                          <span>
                            <b className="font-semibold">Transaction Id</b>:{' '}
                            <a
                              href={`/explorer/tx/${option.txId}`}
                              className="text-blue-600 dark:text-blue-500 hover:underline"
                            >
                              {truncateMiddle(option.txId, 6, 4)}
                            </a>
                          </span>
                        </div>
                        <div className="flex-1 max-sm:max-w-fit flex flex-col items-center gap-0.5 text-[11px] md:text-xs">
                          <span className="font-semibold">Config Block</span>
                          <span>
                            {calculateAgeInDays(option.created)} days ago
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-2">No data found!!</div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
