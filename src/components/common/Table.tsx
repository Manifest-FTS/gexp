'use client';
import Scrollbar from '@/components/ui/scrollbar';
import { useTable } from 'react-table';

type Props = {
  config: {
    data: any[];
    columns: any[];
  };
};

const Table = ({ config }: Props) => {
  const { getTableProps, headerGroups, getTableBodyProps, rows, prepareRow } =
    useTable(config);
  return (
    <div className="min-w-0 overflow-x-auto">
      <div className="bg-white rounded-lg dark:bg-light-dark flex flex-col">
        <div className="px-0.5 flex-1">
          <Scrollbar
            style={{ width: '100%', position: 'relative' }}
            autoHide="never"
          >
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
                    <tr
                      {...row.getRowProps()}
                      key={idx}
                      className="align-middle"
                    >
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
        </div>
      </div>
    </div>
  );
};
export default Table;
