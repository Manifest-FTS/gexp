'use client';

import WorkInProgressPage from '@/components/auth/work-in-progress';

type Props = {
  params: { id: string };
};
export default function BlockDetailPage({ params }: Props) {
  return <WorkInProgressPage />;
}
