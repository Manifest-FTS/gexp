import { useChannelList, useGlobalSearch } from '@/hooks/useCoin';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

export default function ExplorerHero() {
  const channels = useChannelList();
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const { searchData, isLoading } = useGlobalSearch(
    `block:${searchValue} OR TxId:${searchValue}`,
  );

  return (
    <div className="relative p-6 text-gray-800 bg-gray-200 rounded-lg dark:bg-light-dark dark:text-gray-200">
      <div className="flex flex-col items-center gap-4 xl:flex-row">
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
                  className="absolute z-10 mt-1 w-full bg-white dark:bg-light-dark  border dark:border-dark dark:divide-[#6b7280] divide-y rounded-md shadow-lg"
                >
                  {isLoading ? (
                    <div className="p-2">Loading...</div>
                  ) : searchData ? (
                    searchData.map((option: any, index: number) => (
                      <a href={`/explorer/block/${option.number}`}>
                        <div
                          key={index}
                          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-200/10  cursor-pointer"
                          onClick={() => console.log(option)}
                        >
                          Channel: {option.channel} Block: {option.number}
                        </div>
                      </a>
                    ))
                  ) : (
                    <div className="p-2">No data found!!</div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {channels && (
            <select className="w-full border rounded-md h-11 dark:bg-light-dark dark:text-gray-100">
              <option value="">All Channel</option>
              {channels.map((item) => (
                <option value={item.channelId}>{item.channelName}</option>
              ))}
            </select>
          )}
        </div>
      </div>
    </div>
  );
}
