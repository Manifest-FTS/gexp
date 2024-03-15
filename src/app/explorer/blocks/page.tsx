'use client';
import Table from '@/components/common/PaginationTable';
import Select from '@/components/search/select';
import { useBlockList } from '@/hooks/useCoin';
import { createOptionArray } from '@/utils';
import { format } from 'date-fns';
import { useState } from 'react';

const columns = [
  {
    Header: 'Block',
    accessor: 'blockId',
    Cell: ({ row }) => (
      <div className="">
        <a
          href={`/explorer/blocks/${row.original.blockNumber}?channel=${row.original.channelId}`}
          className="hover:text-blue-600 hover:underline"
        >
          {row.original.blockNumber}
        </a>
      </div>
    ),
  },
  {
    Header: 'Channel',
    accessor: 'channel',
    Cell: ({ row }) => <div> {row.original.channel.channelName}</div>,
  },
  {
    Header: 'Transactions',
    accessor: 'transactions',
    Cell: ({ row }) => <div>{row.original.txCount}</div>,
  },
  {
    Header: 'Executes',
    accessor: 'executes',
    Cell: ({ value }) => (
      <div className="flex">
        {!value.length && '--'}
        {value.map((execute, index) => (
          <div key={index}>
            {execute}
            {index < value.length - 1 ? ', ' : ''}
          </div>
        ))}
      </div>
    ),
  },
  {
    Header: 'Created At',
    accessor: 'createAt',
    Cell: ({ row }) => (
      <div>{format(new Date(row.original.created), 'dd/mm/yyyy HH:MM:SS')}</div>
    ),
  },
];

export default function BlockPage() {
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const { data, isLoading } = useBlockList(pageSize, pageIndex, 0);

  return (
    <Table
      title="Block Explorer"
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
