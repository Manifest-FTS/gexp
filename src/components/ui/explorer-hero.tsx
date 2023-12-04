import React, { useState } from 'react';
import lightLogo from '@/assets/images/logo.svg';
import Image from 'next/image';
import galaChannels from '@/data/galachain-channels';

export default function ExplorerHero() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="relative bg-gray-200 text-gray-800 p-10 rounded-lg">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold uppercase mb-4">
          GalaChain Explorer
        </h1>
        <p className="mb-6">
          Explore blocks, transactions, and addresses on the GalaChain
        </p>
        <div className="flex items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Token / Block / Tx / Address"
              className="pl-4 pr-10 py-2 border rounded-md"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-lg">
              🔍
            </button>
          </div>
          <select className="ml-4 border rounded-md py-2 px-4">
            {galaChannels.map((channel, index) => (
              <option value={index} key={index}>
                {channel.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
