import Button from '@/components/ui/button'; // Assuming this is the correct import path
import Scrollbar from '@/components/ui/scrollbar';
import {
  BlocksColumns,
  TransactionsColumns,
} from '@/data/static/explorer-data';
import {
  useBlockList,
  useChannelList,
  useTransactionList,
} from '@/hooks/useCoin';
import { Column, useTable } from 'react-table';
import Loader from '../ui/loader';
import Select from '../search/select';
import { useState } from 'react';

type HookResponse = {
  data: any;
  isLoading: boolean;
};
type TableProps = {
  title: string;
  url: string;
  columns: Column<{}>[];
  fetchHook: (limit: number, page: number, channel: number) => HookResponse;
};
const Table = ({ title, url, fetchHook, columns }: TableProps) => {
  const channels = useChannelList();
  const [channel, setChannel] = useState(0);
  const { data, isLoading } = fetchHook(15, 1, channel);

  const tableInstance = useTable({ columns, data });

  return (
    <div className="lg:w-1/2">
      <div className="bg-white rounded-lg shadow-card dark:bg-light-dark">
        <div className="px-4 pt-6 md:px-8">
          <div className="flex flex-col items-center justify-between pb-5 border-b border-gray-200 border-dashed dark:border-gray-700 md:flex-row">
            <h2 className="text-lg font-medium text-black uppercase dark:text-white md:text-2xl">
              {title}
            </h2>
            <Select
              value={channel}
              setValue={(e) => setChannel(e as number)}
              defaultLabel="All Channel"
              defaultValue={0}
              options={channels.map((item) => ({
                label: item.channelName,
                value: item.channelId,
              }))}
            />
          </div>
        </div>
        <div className="px-0.5">
          <Scrollbar
            style={{ width: '100%', height: '50vh', position: 'relative' }}
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
          <div className="pt-4 pb-6 text-center">
            <a href={url}>
              <Button size="large" shape="rounded" className="uppercase">
                View All {title}
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ExplorerTable() {
  return (
    <div className="flex flex-col w-full gap-4 lg:flex-row ">
      <Table
        title="Latest Blocks"
        url="/explorer/blocks"
        columns={BlocksColumns}
        fetchHook={useBlockList}
      />
      <Table
        title="Latest Transactions"
        url="/explorer/tx"
        columns={TransactionsColumns}
        fetchHook={useTransactionList}
      />
    </div>
  );
}
