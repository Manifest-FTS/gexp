import React from 'react';
import Image from '@/components/ui/image';
import AuthorImage from '@/assets/images/author.jpg';
import NFT1 from '@/assets/images/nft/nft-1.jpg';
import Avatar from '@/components/ui/avatar';

export default function PreviewContent() {
  return (
    <div className="w-full xs:w-96">
      <div className="relative flex flex-grow flex-col overflow-hidden rounded-lg bg-white shadow-card transition-all duration-200 hover:shadow-large dark:bg-light-dark">
        <div className="flex items-center p-4 text-sm font-medium text-gray-600 transition hover:text-gray-900 dark:text-gray-400">
          <Avatar
            size="sm"
            image={AuthorImage}
            alt="AtlanteanX"
            className="border-white bg-gray-300 ltr:mr-3 rtl:ml-3 dark:bg-gray-400"
          />
          @AtlanteanX
        </div>
        <div className="relative block w-full">
          <Image src={NFT1} width={467} alt="Veronika #75" />
        </div>
        <div className="p-5">
          <div className="text-sm font-medium text-black dark:text-white">
            Veronika #75
          </div>
          <div className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
            0.40 ETH
          </div>
        </div>
      </div>
    </div>
  );
}
