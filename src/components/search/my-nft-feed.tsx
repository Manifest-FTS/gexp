import cn from 'classnames';
import { NFTList } from '@/data/static/nft-list';
import NFTGrid from '@/components/ui/my-nft-card';
import { useGridSwitcher } from '@/lib/hooks/use-grid-switcher';

export default function MyNFTFeeds({ className }: { className?: string }) {
  const { isGridCompact } = useGridSwitcher();
  return (
    <div
      className={cn(
        'grid gap-5 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6',
        isGridCompact
          ? '3xl:!grid-cols-5 4xl:!grid-cols-5'
          : '3xl:!grid-cols-5 4xl:!grid-cols-5',
        className,
      )}
    >
      {NFTList.map((nft) => (
        <NFTGrid
          key={nft.id}
          name={nft.name}
          image={nft.image}
          author={nft.author}
          authorImage={nft.authorImage}
          price={nft.price}
          collection={nft.collection}
        />
      ))}
    </div>
  );
}
