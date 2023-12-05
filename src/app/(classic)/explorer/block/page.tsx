import React from 'react';
import {
  useTable,
  useResizeColumns,
  useFlexLayout,
  useSortBy,
  usePagination,
} from 'react-table';
import Scrollbar from '@/components/ui/scrollbar';
import { ChevronDown } from '@/components/icons/chevron-down';
import { LongArrowLeft } from '@/components/icons/long-arrow-left';
import { LongArrowRight } from '@/components/icons/long-arrow-right';
import { LatestBlocksData, BlocksColumns } from '@/data/static/explorer-data'; // Import blocks data and columns

function ExplorerBlocks() {
  // If you want to fetch all blocks data and paginate on client side
  const allBlocks = React.useMemo(() => LatestBlocksData, [LatestBlocksData]);

  const {
    getTableProps,
    getTableBodyProps,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    headerGroups,
    page,
    nextPage,
    previousPage,
    prepareRow,
  } = useTable(
    {
      columns: BlocksColumns, // your columns definition
      data: allBlocks, // your blocks data
      initialState: { pageSize: 50 }, // adjust the page size
    },
    useSortBy,
    useResizeColumns,
    useFlexLayout,
    usePagination,
  );

  const { pageIndex } = state;

  return (
    <div className="relative z-20 mt-11 flex flex-col overflow-hidden rounded-lg shadow-card">
      <div className="w-full transform transition duration-300 ease-in">
        <div className="-mx-0.5 shadow-card dark:[&_.os-scrollbar_.os-scrollbar-track_.os-scrollbar-handle:before]:!bg-white/50">
          <div className="rounded-tl-lg rounded-tr-lg bg-white pt-6 dark:bg-light-dark md:px-6 md:pt-8">
            <div className="flex items-center justify-between gap-4 border-b border-dashed border-gray-200 pb-5 dark:border-gray-700">
              <h2 className="shrink-0 pl-[10px] text-lg font-medium uppercase text-black dark:text-white sm:text-xl md:pl-0 2xl:text-xl 3xl:text-2xl">
                Blocks
              </h2>
            </div>
          </div>
          <Scrollbar style={{ width: '100%' }} autoHide="never">
            <table
              {...getTableProps()}
              className="-mt-[2px] w-full border-separate border-0"
            >
              <thead className="block bg-white px-[10px] text-sm text-gray-500 dark:bg-light-dark dark:text-gray-300 md:!px-6">
                {headerGroups.map((headerGroup, idx) => (
                  <tr
                    {...headerGroup.getHeaderGroupProps()}
                    key={idx}
                    className="border-b border-dashed border-gray-200 dark:border-gray-700"
                  >
                    {headerGroup.headers.map((column, idx) => (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps(),
                        )}
                        key={idx}
                        className="group px-3 py-5 font-normal"
                      >
                        <div className="flex items-center">
                          {column.render('Header')}
                          <span className="ltr:ml-1 rtl:mr-1">
                            {column.isSorted ? (
                              column.isSortedDesc ? (
                                <ChevronDown />
                              ) : (
                                <ChevronDown className="rotate-180" />
                              )
                            ) : (
                              <ChevronDown className="rotate-180 opacity-0 transition group-hover:opacity-50" />
                            )}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody
                {...getTableBodyProps()}
                className="bg-white text-xs font-medium text-gray-900 dark:bg-light-dark dark:text-white"
              >
                {page.map((row, idx) => {
                  prepareRow(row);
                  return (
                    <tr
                      {...row.getRowProps()}
                      key={idx}
                      className="h-[50px] max-h-[50px] cursor-pointer rounded uppercase transition-all hover:bg-[#F3F4F6] dark:bg-light-dark hover:dark:bg-gray-700"
                    >
                      {row.cells.map((cell, idx) => (
                        <td
                          {...cell.getCellProps()}
                          key={idx}
                          className="flex h-[50px] items-center px-3 tracking-[1px]"
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
        </div>
        <div className="-mt-[2px] flex items-center justify-center rounded-bl-lg rounded-br-lg bg-white px-5 py-4 text-sm shadow-card dark:bg-light-dark lg:py-6">
          <div className="flex items-center gap-5">
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              title="Previous"
              shape="circle"
              variant="transparent"
              size="small"
              className="text-gray-700 disabled:text-gray-400 dark:text-white disabled:dark:text-gray-400"
            >
              <LongArrowLeft className="h-auto w-4 rtl:rotate-180" />
            </button>
            <div>
              Page{' '}
              <strong className="font-semibold">
                {pageIndex + 1} of {pageOptions.length}
              </strong>
            </div>
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              title="Next"
              shape="circle"
              variant="transparent"
              size="small"
              className="text-gray-700 disabled:text-gray-400 dark:text-white disabled:dark:text-gray-400"
            >
              <LongArrowRight className="h-auto w-4 rtl:rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExplorerBlocks;
