import React, { useState } from 'react';
import lightLogo from '@/assets/images/logo.svg';
import Image from 'next/image';
import galaChannels from '@/data/galachain-channels';

export default function ExplorerHero() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="relative bg-gray-200 dark:bg-light-dark text-gray-800 dark:text-gray-200 p-10 rounded-lg">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold uppercase mb-4">
          GalaChain Explorer
        </h1>
        <p className="mb-6">
          Explore blocks, transactions, and addresses on the GalaChain
        </p>
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-auto relative mb-4 md:mb-0 md:mr-4">
            <input
              type="text"
              placeholder="Search Token / Block / Tx / Address"
              className="pl-4 pr-10 py-2 border rounded-md dark:bg-light-dark"
              value=""
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-lg">
              🔍
            </button>
          </div>
          <select className="w-full md:w-auto border rounded-md py-2 px-4 dark:bg-light-dark dark:text-gray-100">
            <option value="0">All</option>
            <option value="1">Asset Channel</option>
            <option value="2">Battlestar Galactica Eternity</option>
            <option value="3">Champions Arena</option>
            <option value="4">Echoes of Empire</option>
            <option value="5">Spider Tanks</option>
          </select>
        </div>
      </div>
    </div>
  );
}
