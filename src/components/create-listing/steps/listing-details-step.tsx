/**
 * 📝 Listing Details Step
 * Configure description and unlockable content
 */

'use client';

import InputLabel from '@/components/ui/input-label';
import Textarea from '@/components/ui/forms/textarea';
import ToggleBar from '@/components/ui/toggle-bar';
import { Unlocked } from '@/components/icons/unlocked';
import { ListingFormData } from '../multi-step-listing';

interface ListingDetailsStepProps {
  formData: ListingFormData;
  onUpdate: (updates: Partial<ListingFormData>) => void;
}

export default function ListingDetailsStep({
  formData,
  onUpdate,
}: ListingDetailsStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Add Details to Your Listing
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Provide additional information to help buyers understand your{' '}
          {formData.listingType === 'sell' ? 'NFTs' : 'trade offer'}.
        </p>
      </div>

      {/* Description */}
      <div>
        <InputLabel
          title="Description (Optional)"
          subTitle="Tell potential buyers about your NFTs. What makes them special? Share the story behind them."
        />
        <Textarea
          value={formData.description || ''}
          onChange={(e) => onUpdate({ description: e.target.value })}
          placeholder={
            formData.listingType === 'sell'
              ? "Describe your NFTs, their utility, rarity, or why they're valuable..."
              : "Describe what you're offering and what you're looking for in a trade..."
          }
          rows={4}
        />
      </div>

      {/* Unlockable Content */}
      <div>
        <ToggleBar
          title="Unlockable Content"
          subTitle="Include special content that only the buyer can access after purchase."
          icon={<Unlocked />}
          checked={formData.hasUnlockableContent}
          onChange={() =>
            onUpdate({ hasUnlockableContent: !formData.hasUnlockableContent })
          }
        >
          {formData.hasUnlockableContent && (
            <div className="mt-4">
              <Textarea
                value={formData.unlockableContent || ''}
                onChange={(e) =>
                  onUpdate({ unlockableContent: e.target.value })
                }
                placeholder="Enter unlockable content (access codes, exclusive links, special messages, etc.)"
                rows={3}
              />
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                💡 This content will only be visible to the buyer after they
                complete the purchase.
              </div>
            </div>
          )}
        </ToggleBar>
      </div>

      {/* Fees Information */}
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="text-green-500 text-xl">🎉</div>
          <div>
            <div className="font-medium text-green-800 dark:text-green-200 mb-1">
              Zero Fees During Testing
            </div>
            <div className="text-sm text-green-700 dark:text-green-300">
              All listing and transaction fees are set to $0 for testing
              purposes. You can create and trade listings without any charges.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
