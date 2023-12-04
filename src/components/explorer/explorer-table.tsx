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
} from '@/data/static/explorer-data'; // Import data and column definitions

export default function ExplorerTable() {
  // Initialize table instances using imported data and column definitions
  const blocksTableInstance = useTable({
    columns: BlocksColumns,
    data: LatestBlocksData,
  });
  const transactionsTableInstance = useTable({
    columns: TransactionsColumns,
    data: LatestTransactionsData,
  });

  // Render function for each table
  const renderTable = (tableInstance, title) => (
    <>
      <h2 className="text-lg font-medium uppercase">{title}</h2>
      <table {...tableInstance.getTableProps()} className="min-w-full">
        <thead>
          {tableInstance.headerGroups.map((headerGroup, headerIndex) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              key={`headerGroup-${headerIndex}`}
              className="bg-gray-100"
            >
              {headerGroup.headers.map((column, columnIndex) => (
                <th
                  {...column.getHeaderProps()}
                  key={`column-${columnIndex}`}
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
          {tableInstance.rows.map((row, rowIndex) => {
            tableInstance.prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                key={`row-${rowIndex}`}
                className="align-middle"
              >
                {row.cells.map((cell, cellIndex) => (
                  <td
                    {...cell.getCellProps()}
                    key={`cell-${cellIndex}`}
                    className="px-4 py-2 whitespace-nowrap"
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );

  return (
    <div className="flex w-full divide-x divide-gray-200">
      <Scrollbar className="w-1/2">
        {renderTable(blocksTableInstance, 'Latest Blocks')}
      </Scrollbar>
      <Scrollbar className="w-1/2">
        {renderTable(transactionsTableInstance, 'Latest Transactions')}
      </Scrollbar>
    </div>
  );
}
