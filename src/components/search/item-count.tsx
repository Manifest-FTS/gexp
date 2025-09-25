/**
 * 📊 Item Count Component
 * Shows the total number of marketplace items
 */

'use client';

import { useNFTListings } from '@/lib/hooks/useMarketplace';

export default function ItemCount() {
  const { pagination, loading } = useNFTListings({ limit: 1 }); // Just fetch count

  if (loading) {
    return (
      <span className="text-xs font-medium text-gray-900 dark:text-white sm:text-sm">
        Loading...
      </span>
    );
  }

  const totalItems = pagination?.total || 0;

  return (
    <span className="text-xs font-medium text-gray-900 dark:text-white sm:text-sm">
      {totalItems.toLocaleString()} items
    </span>
  );
}
