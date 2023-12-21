'use client';

import React from 'react';
import { useBreakpoint } from '@/lib/hooks/use-breakpoint';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import CryptocurrencyAccordionTable from '@/components/cryptocurrency-pricing-table/cryptocurrency-accordion-table';
import CryptocurrencyDrawerTable from '@/components/cryptocurrency-pricing-table/cryptocurrency-drawer-table';
import { ExplorerTxData } from '@/data/static/explorer-tx-data';
import { truncateMiddle } from '../ui/truncate-middle';

const COLUMNS = [
  {
    Header: 'TxId',
    accessor: 'TxId',
    // @ts-ignore
    Cell: ({ row }) => (
      <div className="">
        <a href="#" className="text-blue-600 hover:underline">
          {truncateMiddle(row.original.TxId, 6, 4)}
        </a>
        <div className="text-xs text-gray-500">{row.original.Timestamp}</div>
      </div>
    ),
    minWidth: 150,
    maxWidth: 150,
  },
  {
    Header: 'Block #',
    accessor: 'Block',
    // @ts-ignore
    Cell: ({ row }) => (
      <div className="">
        <a href="#" className="text-blue-600 hover:underline">
          {row.original.Block}
        </a>
        <div className="text-xs text-gray-500">{row.original.Validation}</div>
      </div>
    ),
    minWidth: 150,
    maxWidth: 150,
  },
  {
    Header: 'Channel',
    accessor: 'Channel',
    // @ts-ignore
    Cell: ({ cell: { value } }) => <div>{value}</div>,
    minWidth: 150,
    maxWidth: 150,
  },
  {
    Header: 'Block Type',
    accessor: 'BlockType',
    // @ts-ignore
    Cell: ({ cell: { value } }) => <div>{value}</div>,
    minWidth: 300,
    maxWidth: 300,
  },
  {
    Header: 'Summary',
    accessor: 'Summary',
    // @ts-ignore
    Cell: ({ cell: { value } }) => <div>{value}</div>,
    minWidth: 300,
    maxWidth: 300,
  },
];

export default function TxTable() {
  const data = React.useMemo(() => ExplorerTxData, []);
  const columns = React.useMemo(() => COLUMNS, []);

  const isMounted = useIsMounted();
  const breakpoint = useBreakpoint();

  return isMounted &&
    ['xs', 'sm', 'md', 'lg', 'xl'].indexOf(breakpoint) !== -1 ? (
    <CryptocurrencyDrawerTable columns={columns} data={data} />
  ) : (
    <CryptocurrencyAccordionTable columns={columns} data={data} />
  );
}
