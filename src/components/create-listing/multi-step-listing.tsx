/**
 * 📝 Multi-Step Listing Creation
 * Better UX flow for creating NFT listings
 */

'use client';

import { useState, useEffect } from 'react';
import cn from 'classnames';
import Button from '@/components/ui/button';
import { useGalachainAuth } from '@/lib/context/galachain-auth';
import GalachainConnectButton from '@/components/auth/galachain-connect';

// Step Components
import SelectNFTsStep from './steps/select-nfts-step';
import ListingDetailsStep from './steps/listing-details-step';
import PricingStep from './steps/pricing-step';
import ReviewStep from './steps/review-step';

export interface ListingFormData {
  // NFT Selection
  selectedNFTs: string[];
  listingType: 'sell' | 'swap';

  // Pricing
  priceType: 'fixed' | 'auction' | 'swap';
  price?: number;
  currency: 'GALA' | 'ETH';

  // Details
  title?: string;
  description?: string;
  unlockableContent?: string;
  hasUnlockableContent: boolean;

  // Fees (set to $0 for testing)
  listingFee: number;
  platformFee: number;
}

const STEPS = [
  { id: 1, title: 'Select NFTs', description: 'Choose NFTs to list' },
  { id: 2, title: 'Listing Type', description: 'Sell or swap your NFTs' },
  { id: 3, title: 'Set Price', description: 'Configure pricing' },
  { id: 4, title: 'Review', description: 'Confirm and publish' },
];

export default function MultiStepCreateListing() {
  const { isAuthenticated } = useGalachainAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ListingFormData>({
    selectedNFTs: [],
    listingType: 'sell',
    priceType: 'fixed',
    currency: 'GALA',
    hasUnlockableContent: false,
    listingFee: 0, // $0 for testing
    platformFee: 0, // $0 for testing
  });

  // Redirect to authentication if not logged in
  if (!isAuthenticated) {
    return (
      <div className="mx-auto max-w-lg text-center py-20">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Connect Your Wallet
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            You need to connect your Galachain wallet to create listings and
            manage your NFTs.
          </p>
          <GalachainConnectButton size="large" />
        </div>
      </div>
    );
  }

  const updateFormData = (updates: Partial<ListingFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const canProceed = (step: number): boolean => {
    switch (step) {
      case 1:
        return formData.selectedNFTs.length > 0;
      case 2:
        return !!formData.listingType;
      case 3:
        if (formData.priceType === 'fixed') {
          return !!formData.price && formData.price > 0;
        }
        return true;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (currentStep < STEPS.length && canProceed(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <SelectNFTsStep
            selectedNFTs={formData.selectedNFTs}
            listingType={formData.listingType}
            onUpdate={updateFormData}
          />
        );
      case 2:
        return (
          <ListingDetailsStep formData={formData} onUpdate={updateFormData} />
        );
      case 3:
        return <PricingStep formData={formData} onUpdate={updateFormData} />;
      case 4:
        return <ReviewStep formData={formData} onUpdate={updateFormData} />;
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl sm:pt-0 lg:px-8 xl:px-10 2xl:px-0">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Create New Listing
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          List your NFTs for sale or trade with zero fees during testing
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={cn(
                  'flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium',
                  currentStep >= step.id
                    ? 'bg-brand text-white'
                    : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
                )}
              >
                {step.id}
              </div>
              <div className="ml-3">
                <div
                  className={cn(
                    'text-sm font-medium',
                    currentStep >= step.id
                      ? 'text-brand'
                      : 'text-gray-600 dark:text-gray-400',
                  )}
                >
                  {step.title}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-500">
                  {step.description}
                </div>
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-0.5 mx-8',
                    currentStep > step.id
                      ? 'bg-brand'
                      : 'bg-gray-200 dark:bg-gray-700',
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8">
        {renderStep()}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="ghost"
          onClick={prevStep}
          disabled={currentStep === 1}
          className={currentStep === 1 ? 'invisible' : ''}
        >
          Previous
        </Button>

        <div className="flex gap-4">
          {currentStep < STEPS.length ? (
            <Button onClick={nextStep} disabled={!canProceed(currentStep)}>
              Next Step
            </Button>
          ) : (
            <Button
              onClick={() => {
                // TODO: Submit listing
                console.log('📝 Submitting listing:', formData);
              }}
              disabled={!canProceed(currentStep)}
            >
              Publish Listing
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
