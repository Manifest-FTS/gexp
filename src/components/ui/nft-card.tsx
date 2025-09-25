'use client';

import Image from '@/components/ui/image';
import AnchorLink from '@/components/ui/links/anchor-link';
import { Verified } from '@/components/icons/verified';
import Avatar from '@/components/ui/avatar';
import { StaticImageData } from 'next/image';
import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';
import routes from '@/config/routes';

type NFTGridProps = {
  author: string;
  authorImage: StaticImageData | string;
  image: StaticImageData | string;
  name: string;
  collection: string;
  price: string;
};

export default function NFTGrid({
  author,
  authorImage,
  image,
  name,
  collection,
  price,
}: NFTGridProps) {
  const { layout } = useLayout();

  return (
    <div className="relative overflow-hidden rounded-lg bg-white shadow-card transition-all duration-200 hover:shadow-large dark:bg-light-dark">
      <div className="p-4">
        <AnchorLink
          href={
            (layout === LAYOUT_OPTIONS.MODERN ? '' : `/${layout}`) +
            routes.profile
          }
          className="flex items-center text-sm font-medium text-gray-600 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
        >
          <Avatar
            image={authorImage}
            alt={name}
            size="sm"
            className="text-ellipsis ltr:mr-3 rtl:ml-3 dark:border-gray-500"
          />
          <span className="overflow-hidden text-ellipsis">@{author}</span>
        </AnchorLink>
      </div>
      <AnchorLink
        href={
          (layout === LAYOUT_OPTIONS.MODERN ? '' : `/${layout}`) +
          routes.nftDetails
        }
        className="relative block w-full"
      >
        <Image
          src={image}
          width={450}
          height={450}
          alt={name}
          className="w-full"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
      </AnchorLink>

      <div className="p-5">
        <AnchorLink
          href={
            (layout === LAYOUT_OPTIONS.MODERN ? '' : `/${layout}`) +
            routes.nftDetails
          }
          className="text-sm font-medium text-black dark:text-white"
        >
          {name}
        </AnchorLink>
        <div className="mt-1.5 flex">
          <AnchorLink
            href={
              (layout === LAYOUT_OPTIONS.MODERN ? '' : `/${layout}`) +
              routes.nftDetails
            }
            className="inline-flex items-center text-xs text-gray-600 dark:text-gray-400"
          >
            {collection}
            <Verified className="ltr:ml-1 rtl:mr-1" />
          </AnchorLink>
        </div>
        <div className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
          {price}
        </div>
      </div>
    </div>
  );
}
