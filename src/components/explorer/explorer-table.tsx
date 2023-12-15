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

export default function ExplorerTable() {
  const latestBlocks = React.useMemo(
    () => LatestBlocksData.slice(0, 10),
    [LatestBlocksData],
  );
  const latestTransactions = React.useMemo(
    () => LatestTransactionsData.slice(0, 9),
    [LatestTransactionsData],
  );

  const blocksTableInstance = useTable({
    columns: BlocksColumns,
    data: latestBlocks,
  });

  const transactionsTableInstance = useTable({
    columns: TransactionsColumns,
    data: latestTransactions,
  });

  const renderTable = (tableInstance, title) => (
    <div className="rounded-lg bg-white dark:bg-light-dark">
      <div className="px-4 pt-6 md:px-8 md:pt-8">
        <div className="flex flex-col items-center justify-between border-b border-dashed border-gray-200 pb-5 dark:border-gray-700 md:flex-row">
          <h2 className="text-lg font-medium uppercase text-black dark:text-white md:text-2xl">
            {title}
          </h2>
        </div>
      </div>
      <div className="px-0.5">
        <Scrollbar style={{ width: '100%' }} autoHide="never">
          <table
            {...tableInstance.getTableProps()}
            className="w-full border-separate border-0"
          >
            <thead className="text-sm text-gray-500 dark:text-gray-300">
              {tableInstance.headerGroups.map((headerGroup, idx) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={idx}>
                  {headerGroup.headers.map((column, idx) => (
                    <th
                      {...column.getHeaderProps()}
                      key={idx}
                      className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody
              {...tableInstance.getTableBodyProps()}
              className="bg-white divide-y divide-gray-200"
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
          <div className="text-center py-4">
            <Button size="large" shape="rounded" className="uppercase">
              View All {title}
            </Button>
          </div>
        </Scrollbar>
      </div>
    </div>
  );

  return (
    <div className="flex w-full flex-col divide-y divide-gray-200 md:flex-row md:divide-y-0 md:divide-x">
      <div className="min-w-0 overflow-x-auto md:w-1/2">
        <Scrollbar>
          {renderTable(blocksTableInstance, 'Latest Blocks')}
        </Scrollbar>
      </div>
      <div className="min-w-0 overflow-x-auto md:w-1/2">
        <Scrollbar>
          {renderTable(transactionsTableInstance, 'Latest Transactions')}
        </Scrollbar>
      </div>
    </div>
  );
}
