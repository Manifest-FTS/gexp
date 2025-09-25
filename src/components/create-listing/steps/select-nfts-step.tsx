/**
 * 🎯 Select NFTs Step
 * First step: Choose NFTs and listing type
 */

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import cn from 'classnames';
import { useNFTItems } from '@/lib/hooks/useMarketplace';
import { useGalachainAuth } from '@/lib/context/galachain-auth';
import ToggleBar from '@/components/ui/toggle-bar';
import InputLabel from '@/components/ui/input-label';
import { ListingFormData } from '../multi-step-listing';

interface SelectNFTsStepProps {
  selectedNFTs: string[];
  listingType: 'sell' | 'swap';
  onUpdate: (updates: Partial<ListingFormData>) => void;
}

export default function SelectNFTsStep({
  selectedNFTs,
  listingType,
  onUpdate,
}: SelectNFTsStepProps) {
  const { user } = useGalachainAuth();
  const [showSwapOption, setShowSwapOption] = useState(false);

  // Fetch user's NFTs - for now using mock data
  // TODO: Replace with actual user NFT fetching based on wallet address
  const mockUserNFTs = [
    {
      id: '1',
      name: 'My Gala Hero #123',
      image: 'https://picsum.photos/seed/nft1/300/300',
      collection: 'Gala Games Heroes',
      rarity: 'Legendary',
    },
    {
      id: '2',
      name: 'Dragon Strike #456',
      image: 'https://picsum.photos/seed/nft2/300/300',
      collection: 'Dragon Strike',
      rarity: 'Epic',
    },
    {
      id: '3',
      name: 'Champions Arena #789',
      image: 'https://picsum.photos/seed/nft3/300/300',
      collection: 'Champions Arena',
      rarity: 'Rare',
    },
  ];

  const toggleNFTSelection = (nftId: string) => {
    const newSelected = selectedNFTs.includes(nftId)
      ? selectedNFTs.filter((id) => id !== nftId)
      : [...selectedNFTs, nftId];

    onUpdate({ selectedNFTs: newSelected });
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case 'legendary':
        return 'text-yellow-500';
      case 'epic':
        return 'text-purple-500';
      case 'rare':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Listing Type Selection */}
      <div>
        <InputLabel
          title="Listing Type"
          subTitle="Choose how you want to list your NFTs"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <button
            onClick={() => onUpdate({ listingType: 'sell' })}
            className={cn(
              'p-4 border-2 rounded-lg text-left transition-all',
              listingType === 'sell'
                ? 'border-brand bg-brand/5'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300',
            )}
          >
            <div className="font-medium text-gray-900 dark:text-white mb-2">
              💰 Sell for Crypto
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Set a fixed price or create an auction
            </div>
          </button>

          <button
            onClick={() => onUpdate({ listingType: 'swap' })}
            className={cn(
              'p-4 border-2 rounded-lg text-left transition-all',
              listingType === 'swap'
                ? 'border-brand bg-brand/5'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300',
            )}
          >
            <div className="font-medium text-gray-900 dark:text-white mb-2">
              🔄 Swap for NFTs
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Trade your NFTs for other NFTs
            </div>
          </button>
        </div>
      </div>

      {/* NFT Selection */}
      <div>
        <InputLabel
          title="Select Your NFTs"
          subTitle={`Choose ${listingType === 'sell' ? 'NFTs to sell' : 'NFTs to trade'}. You can select multiple items.`}
        />

        {mockUserNFTs.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎭</div>
            <div className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No NFTs Found
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              You don&apos;t have any NFTs in your wallet to list.
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {mockUserNFTs.map((nft) => (
              <div
                key={nft.id}
                onClick={() => toggleNFTSelection(nft.id)}
                className={cn(
                  'relative cursor-pointer border-2 rounded-lg overflow-hidden transition-all hover:shadow-md',
                  selectedNFTs.includes(nft.id)
                    ? 'border-brand shadow-md'
                    : 'border-gray-200 dark:border-gray-700',
                )}
              >
                {/* Selection Indicator */}
                {selectedNFTs.includes(nft.id) && (
                  <div className="absolute top-2 right-2 z-10 w-6 h-6 bg-brand rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}

                {/* NFT Image */}
                <div className="aspect-square">
                  <Image
                    src={nft.image}
                    alt={nft.name}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* NFT Details */}
                <div className="p-3">
                  <div className="font-medium text-gray-900 dark:text-white mb-1">
                    {nft.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {nft.collection}
                  </div>
                  <div
                    className={cn(
                      'text-sm font-medium',
                      getRarityColor(nft.rarity),
                    )}
                  >
                    {nft.rarity}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedNFTs.length > 0 && (
          <div className="mt-4 p-3 bg-brand/5 rounded-lg">
            <div className="text-sm font-medium text-brand">
              {selectedNFTs.length} NFT{selectedNFTs.length > 1 ? 's' : ''}{' '}
              selected
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
