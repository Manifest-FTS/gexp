'use client';
import Loader from '@/components/ui/loader';
import Scrollbar from '@/components/ui/scrollbar';
import { TableOptions, usePagination, useTable } from 'react-table';
type Props = {
  config: {
    data: any[];
    columns: any[];
  };
  title: string;
  pageIndex: number;
  isLoading: boolean;
  header: any;
  nextPage: () => void;
  previousPage: () => void;
};

const PaginationTable = ({
  title,
  config,
  pageIndex,
  isLoading,
  header,
  nextPage,
  previousPage,
}: Props) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    pageOptions,
  } = useTable(config);
  return (
    <div className="bg-white rounded-lg shadow-card dark:bg-light-dark flex flex-col">
      <div className="px-4 pt-6 md:px-8 ">
        <div className="flex flex-col items-center justify-between pb-5 border-b border-gray-200 border-dashed dark:border-gray-700 md:flex-row">
          <h2 className="text-lg font-medium text-black uppercase dark:text-white md:text-2xl">
            {title}
          </h2>
          {header}
        </div>
      </div>
      <div className="px-0.5 flex-1">
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
            {...getTableProps()}
            className="w-full border-0 border-separate flex-1"
          >
            <thead className="text-sm text-gray-500 dark:text-gray-300">
              {headerGroups.map((headerGroup, idx) => (
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
              {...getTableBodyProps()}
              className="bg-white divide-y divide-gray-200 dark:bg-light-dark"
            >
              {rows.map((row, idx) => {
                prepareRow(row);
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
        <div className="flex justify-center gap-3 py-4  border-t border-gray-200 border-dashed dark:border-gray-700 items-center">
          <button
            disabled={pageIndex === 1}
            className="text-2xl py-2 px-4 bg-brand rounded-lg disabled:cursor-not-allowed text-white"
            onClick={() => previousPage()}
          >
            {'<'}
          </button>
          <span>
            Page
            <strong> {pageIndex}</strong>
          </span>
          <button
            className="text-2xl py-2 px-4 bg-brand rounded-lg text-white"
            onClick={() => nextPage()}
          >
            {'>'}
          </button>
        </div>
      </div>
    </div>
  );
};
export default PaginationTable;
