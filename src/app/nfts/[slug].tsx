import ClassicNFTDetails from '@/components/nft/classic-nft-details';
import { nftData } from '@/data/static/single-nft';
import { useRouter } from 'next/router';

export default function NFTDetailsPageClassic() {
  const router = useRouter();
  const { slug } = router.query;
  return <ClassicNFTDetails product={nftData} />;
}
