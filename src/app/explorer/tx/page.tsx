'use client';
import Table from '@/components/common/Table';
import Select from '@/components/search/select';
import { truncateMiddle } from '@/components/ui/truncate-middle';
import { useTransactionList } from '@/hooks/useCoin';
import { createOptionArray } from '@/utils';
import { format } from 'date-fns';
import { useState } from 'react';

const columns = [
  {
    Header: 'TxID',
    accessor: 'txId',
    Cell: ({ row }) => (
      <a
        href={`/explorer/tx/${row.original.txId}`}
        className="hover:text-blue-600 hover:underline"
      >
        {truncateMiddle(row.original.txId, 6, 4)}
      </a>
    ),
  },
  {
    Header: 'Channel',
    accessor: 'channel',
    Cell: ({ row }) => (
      <a href="#" className="hover:text-blue-600 hover:underline">
        {row.original.channelName}
      </a>
    ),
  },

  {
    Header: 'Sender',
    accessor: 'sender',
    Cell: ({ row }) => {
      const args = JSON.parse(
        row.original.rawData?.actions?.[0]?.args?.[1] || '{}',
      );
      return (
        <div>
          {args?.from
            ? truncateMiddle(args.from.replace('client|', ''), 6, 4, '...')
            : '--'}
        </div>
      );
    },
  },
  {
    Header: 'Receiver',
    accessor: 'receiver',
    Cell: ({ row }) => {
      const args = JSON.parse(
        row.original.rawData?.actions?.[0]?.args?.[1] || '{}',
      );
      return (
        <div>
          {args?.to
            ? truncateMiddle(args.to.replace('client|', ''), 6, 4, '...')
            : '--'}
        </div>
      );
    },
  },
  {
    Header: 'Created At',
    accessor: 'createAt',
    Cell: ({ row }) => (
      <div>{format(new Date(row.original.created), 'dd/mm/yyyy HH:MM:SS')}</div>
    ),
  },
];

export default function TransactionPage() {
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const { data, isLoading } = useTransactionList(pageSize, pageIndex, 0);

  return (
    <Table
      title="Transaction Explorer"
      isLoading={isLoading}
      pageIndex={pageIndex}
      nextPage={() => setPageIndex((e) => e + 1)}
      previousPage={() => setPageIndex((e) => e - 1)}
      config={{ data, columns }}
      header={
        <>
          <Select
            value={pageSize}
            className="min-w-[80px]"
            setValue={(e) => {
              setPageIndex(1);
              setPageSize(e as number);
            }}
            options={createOptionArray([10, 25, 50, 100])}
          />
        </>
      }
    />
  );
}
