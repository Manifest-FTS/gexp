'use client';

import Card from '@/components/common/Card';
import Chip from '@/components/common/Chip';
import Table from '@/components/common/Table';
import TitleValue from '@/components/common/TitleValue';
import Loader from '@/components/ui/loader';
import { truncateMiddle } from '@/components/ui/truncate-middle';
import { useBlockDetails } from '@/hooks/useCoin';
import { formatDistanceToNow } from 'date-fns';
import { useMemo } from 'react';

type Props = {
  params: { id: string };
  searchParams: { channel: string };
};

export const columns = [
  {
    Header: 'TXN Hash',
    accessor: 'TXNHash',
    Cell: ({ row }) => (
      <div className="">
        <div>
          <a
            href={`/explorer/tx/${row.original.id}`}
            className="text-blue-600 hover:underline"
          >
            {truncateMiddle(row.original.id, 6, 4)}
          </a>
        </div>
      </div>
    ),
  },
  {
    Header: 'Method',
    accessor: 'method',
    Cell: ({ row }) => <div>{row.original.method || '--'}</div>,
  },
  {
    Header: 'Block',
    accessor: 'block',
    Cell: ({ row }) => <div>{row.original.blockNumber}</div>,
  },
  {
    Header: 'Age',
    accessor: 'age',
    Cell: ({ row }) => (
      <div>{formatDistanceToNow(new Date(row.original.createdAt))}</div>
    ),
  },
  {
    Header: 'From',
    accessor: 'from',
    Cell: ({ row }) => <div>{truncateMiddle(row.original.from, 6, 4)}</div>,
  },
  {
    Header: 'To',
    accessor: 'to',
    Cell: ({ row }) => <div>{truncateMiddle(row.original.to, 6, 4)}</div>,
  },
  {
    Header: 'Owner',
    accessor: 'owner',
    Cell: ({ row }) => <div>{truncateMiddle(row.original.owner, 6, 4)}</div>,
  },
];

const scrollTo = (id: string) => {
  var element = document.getElementById(id);
  if (!element) return;

  var offset = element.getBoundingClientRect().top;

  window.scrollTo({
    top: offset - 110,
    behavior: 'smooth',
  });
};

export default function BlockDetailPage({ params, searchParams }: Props) {
  const blockNumber = params.id;
  const channel = searchParams.channel;
  const { data, isLoading } = useBlockDetails(blockNumber, channel);

  const transactions = useMemo(() => data?.transactions || [], [data]);

  return (
    <div>
      <div className="border-b pb-3 text-[20px]">
        <b>Block #{blockNumber}</b>
      </div>
      <div className="flex my-4 gap-2">
        {data.blockNumber && (
          <Chip onClick={() => scrollTo('overview')}>Overview</Chip>
        )}
        {!!transactions.length && (
          <Chip onClick={() => scrollTo('transaction')}>Transactions</Chip>
        )}
      </div>
      {!!Object.keys(data).length && (
        <div>
          <Card id="overview" title="Overview">
            <TitleValue title="Block Height :">{data.blockNumber}</TitleValue>
            <TitleValue title="Timestamp :">
              {formatDistanceToNow(new Date(data.createdAt))} (
              {new Date(data.createdAt).toISOString()})
            </TitleValue>
            <TitleValue title="Transactions :">
              {transactions.length} Transactions
            </TitleValue>
            <TitleValue title="Channel :">{data.channelName}</TitleValue>
          </Card>
          {!!transactions.length && (
            <Card id="transaction" title="Transactions">
              <p className="pb-2"> {transactions.length} transactions found</p>
              <Table config={{ columns, data: transactions }} />
            </Card>
          )}
        </div>
      )}
      {isLoading && (
        <div className="flex justify-center mt-3">
          <Loader />
        </div>
      )}
    </div>
  );
}
