/**
 * 👀 Review Step
 * Final review before publishing the listing
 */

'use client';

import { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/button';
import { useGalachainAuth } from '@/lib/context/galachain-auth';
import { ListingFormData } from '../multi-step-listing';
import { GalaIcon } from '@/components/icons/gala';

interface ReviewStepProps {
  formData: ListingFormData;
  onUpdate: (updates: Partial<ListingFormData>) => void;
}

export default function ReviewStep({ formData, onUpdate }: ReviewStepProps) {
  const { user, signMessage } = useGalachainAuth();
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);

  // Mock NFT data for display
  const selectedNFTsData = formData.selectedNFTs.map((id) => ({
    id,
    name: `NFT #${id}`,
    image: `https://picsum.photos/seed/nft${id}/200/200`,
    collection: 'Mock Collection',
  }));

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      // Publish listing to backend
      const jwt = localStorage.getItem('galachain_jwt') || '';
      const api = await import('@/lib/api/marketplace').then(
        (m) => m.marketplaceAPI,
      );
      await Promise.all(
        formData.selectedNFTs.map((nftId) =>
          api.createListing({
            nft_item_id: nftId,
            seller_address: user?.address || '',
            price: formData.price || 0,
            currency: formData.currency,
            listing_type: formData.listingType,
            description: formData.description,
            unlockable_content: formData.hasUnlockableContent
              ? formData.unlockableContent
              : undefined,
            jwt,
          }),
        ),
      );
      setPublishSuccess(true);
      console.log('✅ Listing published successfully!');
    } catch (error) {
      console.error('❌ Failed to publish listing:', error);
    } finally {
      setIsPublishing(false);
    }
  };

  if (publishSuccess) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-6">🎉</div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Listing Published Successfully!
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Your NFT{formData.selectedNFTs.length > 1 ? 's are' : ' is'} now live
          on the marketplace.
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={() => (window.location.href = '/')} variant="ghost">
            View Marketplace
          </Button>
          <Button onClick={() => (window.location.href = '/profile')}>
            View My Listings
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Review Your Listing
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Please review all details before publishing your listing.
        </p>
      </div>

      {/* Listing Summary */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        {/* Listing Type */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">
              {formData.listingType === 'sell' ? '💰' : '🔄'}
            </span>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              {formData.listingType === 'sell'
                ? 'Sell Listing'
                : 'Swap Listing'}
            </h4>
          </div>
        </div>

        {/* Selected NFTs */}
        <div className="mb-6">
          <h5 className="font-medium text-gray-900 dark:text-white mb-3">
            Selected NFTs ({formData.selectedNFTs.length})
          </h5>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {selectedNFTsData.map((nft) => (
              <div
                key={nft.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <Image
                  src={nft.image}
                  alt={nft.name}
                  width={200}
                  height={200}
                  className="w-full aspect-square object-cover"
                />
                <div className="p-2">
                  <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {nft.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {nft.collection}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Info */}
        {formData.listingType === 'sell' && (
          <div className="mb-6">
            <h5 className="font-medium text-gray-900 dark:text-white mb-3">
              Pricing
            </h5>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  {formData.priceType === 'fixed' ? 'Fixed Price' : 'Auction'}
                </span>
                <div className="flex items-center gap-2">
                  <GalaIcon className="w-5 h-5" />
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {formData.price} {formData.currency}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Description */}
        {formData.description && (
          <div className="mb-6">
            <h5 className="font-medium text-gray-900 dark:text-white mb-3">
              Description
            </h5>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <p className="text-gray-700 dark:text-gray-300">
                {formData.description}
              </p>
            </div>
          </div>
        )}

        {/* Unlockable Content */}
        {formData.hasUnlockableContent && formData.unlockableContent && (
          <div className="mb-6">
            <h5 className="font-medium text-gray-900 dark:text-white mb-3">
              Unlockable Content
            </h5>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-yellow-500">🔓</span>
                <div>
                  <div className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-1">
                    Special content included
                  </div>
                  <div className="text-sm text-yellow-700 dark:text-yellow-300">
                    Buyers will receive exclusive content after purchase
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Fee Summary */}
        <div className="border-t pt-4 dark:border-gray-700">
          <h5 className="font-medium text-gray-900 dark:text-white mb-3">
            Fee Summary
          </h5>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Listing Fee
              </span>
              <span className="font-medium text-green-600 dark:text-green-400">
                FREE
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Platform Fee
              </span>
              <span className="font-medium text-green-600 dark:text-green-400">
                FREE
              </span>
            </div>
            {formData.listingType === 'sell' && (
              <div className="flex justify-between font-medium pt-2 border-t dark:border-gray-600">
                <span className="text-gray-900 dark:text-white">
                  You&apos;ll Receive
                </span>
                <span className="text-gray-900 dark:text-white">
                  {formData.price} {formData.currency}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Terms and Publish */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="text-sm text-blue-800 dark:text-blue-200 mb-4">
          By publishing this listing, you agree to:
        </div>
        <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
          <li>• Transfer ownership of the NFT(s) upon successful sale</li>
          <li>• Allow the marketplace to facilitate the transaction</li>
          <li>• Provide any unlockable content as promised</li>
          <li>• Comply with platform terms and conditions</li>
        </ul>
      </div>

      {/* Publish Button */}
      <div className="text-center">
        <Button
          size="large"
          onClick={handlePublish}
          disabled={isPublishing}
          className="px-12"
        >
          {isPublishing ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
              Publishing...
            </div>
          ) : (
            'Publish Listing'
          )}
        </Button>
      </div>
    </div>
  );
}
