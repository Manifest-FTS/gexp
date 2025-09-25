import cn from 'classnames';
import NFTGrid from '@/components/ui/nft-card';
import { useGridSwitcher } from '@/lib/hooks/use-grid-switcher';
import { useNFTListings } from '@/lib/hooks/useMarketplace';
import AuthorImage from '@/assets/images/author.jpg';

export default function Feeds({ className }: { className?: string }) {
  const { isGridCompact } = useGridSwitcher();
  const {
    data: listings,
    loading,
    error,
  } = useNFTListings({
    limit: 20,
    sort_by: 'created_at',
    order: 'desc',
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Loading NFTs...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400">
            Error loading NFTs: {error}
          </p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Make sure the backend server is running on port 8000
          </p>
        </div>
      </div>
    );
  }

  if (!listings || listings.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">
            No NFT listings found
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Check back later for new listings
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'grid gap-5 sm:grid-cols-2 md:grid-cols-5',
        isGridCompact
          ? '3xl:!grid-cols-5 4xl:!grid-cols-5'
          : '3xl:!grid-cols-5 4xl:!grid-cols-5',
        className,
      )}
    >
      {listings.map((listing) => {
        const nftItem = listing.nft_items;
        const collection = nftItem?.nft_collections;

        return (
          <NFTGrid
            key={listing.id}
            name={nftItem?.name || 'Unknown NFT'}
            image={
              nftItem?.image_url ||
              'https://picsum.photos/300/300?random=fallback'
            }
            author={
              nftItem?.owner_address
                ? `${nftItem.owner_address.slice(0, 6)}...${nftItem.owner_address.slice(-4)}`
                : 'Unknown'
            }
            authorImage={AuthorImage}
            price={`${listing.price} ${listing.currency}`}
            collection={collection?.name || 'Unknown Collection'}
          />
        );
      })}
    </div>
  );
}
