import React, { useState } from 'react';
import lightLogo from '@/assets/images/logo.svg';
import Image from 'next/image';
import galaChannels from '@/data/galachain-channels';
import { useChannelList } from '@/hooks/useCoin';
import { ChannelData } from '@/types';

export default function ExplorerHero() {
  const [searchValue, setSearchValue] = useState('');
  const channels = useChannelList();
  console.log('🚀 - ExplorerHero - channels:', channels);

  return (
    <div className="relative p-10 text-gray-800 bg-gray-200 rounded-lg dark:bg-light-dark dark:text-gray-200">
      <div className="max-w-4xl">
        <h1 className="mb-4 text-3xl font-bold uppercase">
          GalaChain Explorer
        </h1>
        <p className="mb-6">
          Explore blocks, transactions, and addresses on the GalaChain
        </p>
        <div className="flex flex-col items-center md:flex-row">
          <div className="relative w-full mb-4 md:w-auto md:mb-0 md:mr-4">
            <input
              type="text"
              placeholder="Search Token / Block / Tx / Address"
              className="py-2 pl-4 pr-10 border rounded-md dark:bg-light-dark"
              value=""
            />
            <button className="absolute text-lg transform -translate-y-1/2 right-2 top-1/2">
              🔍
            </button>
          </div>
          {channels && (
            <select className="w-full px-4 py-2 border rounded-md md:w-auto dark:bg-light-dark dark:text-gray-100">
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
