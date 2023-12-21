import TxTable from '@/components/explorer/tx-table';
import LivePricingSlider from '@/components/ui/live-pricing-slider';

export default function ExplorerTX() {
  return (
    <>
      <LivePricingSlider limits={4} />
      <TxTable />
    </>
  );
}
