import React from 'react';
import {
  useTable,
  useResizeColumns,
  useFlexLayout,
  useSortBy,
  usePagination,
} from 'react-table';
import Scrollbar from '@/components/ui/scrollbar';
import {
  LatestBlocksData,
  LatestTransactionsData,
  BlocksColumns,
  TransactionsColumns,
} from '@/data/static/explorer-data';
import Button from '@/components/ui/button'; // Assuming this is the correct import path
import { useBlockList, useTransactionList } from '@/hooks/useCoin';
import Loader from '../ui/loader';

export default function ExplorerTable() {
  const { latestBlocks, loadingBlocks } = useBlockList(15, 1);
  const { latestTransaction, loadingTransactions } = useTransactionList(15, 1);

  const blocksTableInstance = useTable({
    columns: BlocksColumns,
    data: latestBlocks,
  });

  const transactionsTableInstance = useTable({
    columns: TransactionsColumns,
    data: latestTransaction,
  });

  const renderTable = (isLoading, tableInstance, title, url) => (
    <div className="bg-white rounded-lg dark:bg-light-dark">
      <div className="px-4 pt-6 md:px-8 md:pt-8">
        <div className="flex flex-col items-center justify-between pb-5 border-b border-gray-200 border-dashed dark:border-gray-700 md:flex-row">
          <h2 className="text-lg font-medium text-black uppercase dark:text-white md:text-2xl">
            {title}
          </h2>
        </div>
      </div>
      <div className="px-0.5">
        <Scrollbar
          style={{ width: '100%', minHeight: '35vh', position: 'relative' }}
          autoHide="never"
        >
          {isLoading && (
            <div className="absolute top-[50%] left-[45%]">
              <Loader />
            </div>
          )}
          <table
            {...tableInstance.getTableProps()}
            className="w-full border-0 border-separate"
          >
            <thead className="text-sm text-gray-500 dark:text-gray-300">
              {tableInstance.headerGroups.map((headerGroup, idx) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={idx}>
                  {headerGroup.headers.map((column, idx) => (
                    <th
                      {...column.getHeaderProps()}
                      key={idx}
                      className="px-4 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody
              {...tableInstance.getTableBodyProps()}
              className="bg-white divide-y divide-gray-200 dark:bg-light-dark"
            >
              {tableInstance.rows.map((row, idx) => {
                tableInstance.prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={idx} className="align-middle">
                    {row.cells.map((cell, idx) => (
                      <td
                        {...cell.getCellProps()}
                        key={idx}
                        className="px-4 py-2 text-left whitespace-nowrap"
                      >
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Scrollbar>
        <div className="py-4 text-center">
          <a href={url}>
            <Button size="large" shape="rounded" className="uppercase">
              View All {title}
            </Button>
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col w-full divide-y divide-gray-200 md:flex-row md:divide-y-0 md:divide-x">
      <div className="min-w-0 overflow-x-auto md:w-1/2">
        <Scrollbar>
          {renderTable(
            loadingBlocks,
            blocksTableInstance,
            'Latest Blocks',
            '/explorer/blocks',
          )}
        </Scrollbar>
      </div>
      <div className="min-w-0 overflow-x-auto md:w-1/2">
        <Scrollbar>
          {renderTable(
            loadingTransactions,
            transactionsTableInstance,
            'Latest Transactions',
            '/explorer/tx',
          )}
        </Scrollbar>
      </div>
    </div>
  );
}
