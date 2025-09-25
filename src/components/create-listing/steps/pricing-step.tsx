/**
 * 💰 Pricing Step
 * Configure pricing for sell listings
 */

'use client';

import { useState } from 'react';
import cn from 'classnames';
import InputLabel from '@/components/ui/input-label';
import Input from '@/components/ui/forms/input';
import { ListingFormData } from '../multi-step-listing';
import { GalaIcon } from '@/components/icons/gala';

interface PricingStepProps {
  formData: ListingFormData;
  onUpdate: (updates: Partial<ListingFormData>) => void;
}

const PRICE_TYPES = [
  {
    id: 'fixed',
    title: 'Fixed Price',
    description: 'Set a fixed price for immediate purchase',
    icon: '💰',
  },
  {
    id: 'auction',
    title: 'Auction (Coming Soon)',
    description: 'Let buyers bid on your NFTs',
    icon: '⚡',
    disabled: true,
  },
];

const CURRENCIES = [
  {
    id: 'GALA',
    name: 'GALA',
    icon: <GalaIcon className="w-5 h-5" />,
    symbol: 'GALA',
  },
];

export default function PricingStep({ formData, onUpdate }: PricingStepProps) {
  if (formData.listingType === 'swap') {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Swap Configuration
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You&apos;re creating a swap listing. Specify what types of NFTs
            you&apos;re looking for in exchange.
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 text-center">
          <div className="text-4xl mb-4">🔄</div>
          <div className="text-lg font-medium text-blue-800 dark:text-blue-200 mb-2">
            Swap Listings
          </div>
          <div className="text-blue-700 dark:text-blue-300">
            Swap functionality will allow users to trade NFTs directly. The
            matching system will connect traders based on their preferences.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Set Your Price
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Configure how you want to sell your NFTs.
        </p>
      </div>

      {/* Price Type Selection */}
      <div>
        <InputLabel
          title="Sale Type"
          subTitle="Choose how buyers can purchase your NFTs"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {PRICE_TYPES.map((type) => (
            <button
              key={type.id}
              onClick={() =>
                !type.disabled && onUpdate({ priceType: type.id as any })
              }
              disabled={type.disabled}
              className={cn(
                'p-4 border-2 rounded-lg text-left transition-all',
                type.disabled
                  ? 'opacity-50 cursor-not-allowed border-gray-200 dark:border-gray-700'
                  : formData.priceType === type.id
                    ? 'border-brand bg-brand/5'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300',
              )}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{type.icon}</span>
                <div className="font-medium text-gray-900 dark:text-white">
                  {type.title}
                </div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {type.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Fixed Price Configuration */}
      {formData.priceType === 'fixed' && (
        <div className="space-y-4">
          {/* Currency Selection */}
          <div>
            <InputLabel title="Currency" />
            <div className="grid grid-cols-1 gap-2 mt-2">
              {CURRENCIES.map((currency) => (
                <button
                  key={currency.id}
                  onClick={() => onUpdate({ currency: currency.id as any })}
                  className={cn(
                    'flex items-center gap-3 p-3 border-2 rounded-lg text-left transition-all',
                    formData.currency === currency.id
                      ? 'border-brand bg-brand/5'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300',
                  )}
                >
                  {currency.icon}
                  <span className="font-medium text-gray-900 dark:text-white">
                    {currency.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Input */}
          <div>
            <InputLabel
              title="Price"
              important
              subTitle={`Set your price in ${formData.currency}`}
            />
            <div className="relative">
              <Input
                type="number"
                step="0.01"
                min="0"
                value={formData.price || ''}
                onChange={(e) =>
                  onUpdate({ price: parseFloat(e.target.value) || undefined })
                }
                placeholder="0.00"
                className="pr-16"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <GalaIcon className="w-4 h-4" />
                <span className="text-sm font-medium">{formData.currency}</span>
              </div>
            </div>

            {formData.price && (
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                💡 Buyers will pay exactly {formData.price} {formData.currency}{' '}
                for your NFT{formData.selectedNFTs.length > 1 ? 's' : ''}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Fee Breakdown */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
        <div className="font-medium text-gray-900 dark:text-white mb-3">
          Fee Breakdown
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">
              Listing Fee
            </span>
            <span className="font-medium text-green-600 dark:text-green-400">
              FREE (Testing)
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">
              Platform Fee
            </span>
            <span className="font-medium text-green-600 dark:text-green-400">
              FREE (Testing)
            </span>
          </div>
          <div className="border-t pt-2 dark:border-gray-700">
            <div className="flex justify-between font-medium">
              <span className="text-gray-900 dark:text-white">
                You&apos;ll Receive
              </span>
              <span className="text-gray-900 dark:text-white">
                {formData.price || 0} {formData.currency}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
