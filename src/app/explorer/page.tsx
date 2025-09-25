// import ClassicScreen from '@/components/screens/classic-screen';
import ExplorerDeactivationNotice from '@/components/explorer/ExplorerDeactivationNotice';

export default function IndexPageClassic() {
  // 🚨 EXPLORER DEACTIVATED - Show deactivation notice instead
  return <ExplorerDeactivationNotice feature="Explorer" redirectUrl="/" />;

  // Original explorer screen preserved for reactivation
  // return <ClassicScreen />;
}
