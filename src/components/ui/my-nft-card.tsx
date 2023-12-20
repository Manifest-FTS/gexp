import Image from '@/components/ui/image';
import { Verified } from '@/components/icons/verified';
import { StaticImageData } from 'next/image';
import { useLayout } from '@/lib/hooks/use-layout';
import { useState } from 'react';

type NFTGridProps = {
  author: string;
  authorImage: StaticImageData;
  image: StaticImageData;
  name: string;
  collection: string;
  price: string;
  isSelected?: boolean;
};

export default function NFTGrid({
  image,
  name,
  collection,
  isSelected: initialSelected = false,
}: NFTGridProps) {
  const { layout } = useLayout();
  const [isSelected, setIsSelected] = useState(initialSelected);
  const handleClick = () => {
    setIsSelected(!isSelected);
    console.log('Card clicked');
  };

  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-white shadow-card transition-all duration-200 hover:shadow-large dark:bg-light-dark ${
        isSelected ? 'ring-2 ring-green-600 backdrop-blur-[2px]' : ''
      }`}
      onClick={handleClick}
    >
      <div className="relative block w-full">
        <Image src={image} width={450} height={450} alt="" className="w-full" />
        {isSelected && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 backdrop-blur-[2px]">
            <Verified className="text-green-600 h-8 w-8" />
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="text-sm font-medium text-black dark:text-white truncate">
          {name}
        </div>
        <div className="mt-1.5 flex">
          <div className="inline-flex items-center text-xs text-gray-600 dark:text-gray-400">
            {collection}
            <Verified className="ltr:ml-1 rtl:mr-1" />
          </div>
        </div>
      </div>
    </div>
  );
}
