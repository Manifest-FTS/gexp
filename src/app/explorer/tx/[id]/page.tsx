'use client';

import WorkInProgressPage from '@/components/auth/work-in-progress';

type Props = {
  params: { id: string };
};
export default function TransactionDetailPage({ params }: Props) {
  return <WorkInProgressPage />;
}
