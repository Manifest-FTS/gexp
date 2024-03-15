import { truncateMiddle } from '@/components/ui/truncate-middle';
import React from 'react';
import routes from '@/config/routes';
import { formatDistanceToNow } from 'date-fns';
// Sample data for "Latest Blocks"
export const LatestBlocksData = [
  {
    blockId: '4012165',
    timestamp: '10 mins ago',
    channel: 'eternal-paradox',
    txCount: 2,
    executes: ['LockTokens', 'BurnAndMint'],
  },
  {
    blockId: '4012165',
    timestamp: '10 mins ago',
    channel: 'eternal-paradox',
    txCount: 2,
    executes: ['LockTokens', 'BurnAndMint'],
  },
  {
    blockId: '4012165',
    timestamp: '10 mins ago',
    channel: 'eternal-paradox',
    txCount: 2,
    executes: ['LockTokens', 'BurnAndMint'],
  },
  {
    blockId: '4012165',
    timestamp: '10 mins ago',
    channel: 'eternal-paradox',
    txCount: 2,
    executes: ['LockTokens', 'BurnAndMint'],
  },
  {
    blockId: '4012165',
    timestamp: '10 mins ago',
    channel: 'eternal-paradox',
    txCount: 2,
    executes: ['LockTokens', 'BurnAndMint'],
  },
  {
    blockId: '4012165',
    timestamp: '10 mins ago',
    channel: 'eternal-paradox',
    txCount: 2,
    executes: ['LockTokens', 'BurnAndMint'],
  },
  {
    blockId: '4012165',
    timestamp: '10 mins ago',
    channel: 'eternal-paradox',
    txCount: 2,
    executes: ['LockTokens', 'BurnAndMint'],
  },
  {
    blockId: '4012165',
    timestamp: '10 mins ago',
    channel: 'eternal-paradox',
    txCount: 2,
    executes: ['LockTokens', 'BurnAndMint'],
  },
  {
    blockId: '4012165',
    timestamp: '10 mins ago',
    channel: 'eternal-paradox',
    txCount: 2,
    executes: ['LockTokens', 'BurnAndMint'],
  },
  {
    blockId: '4012165',
    timestamp: '10 mins ago',
    channel: 'eternal-paradox',
    txCount: 2,
    executes: ['LockTokens', 'BurnAndMint'],
  },
  // Add more blocks data as needed
];

// Sample data for "Latest Transactions"
export const LatestTransactionsData = [
  {
    txId: '4b3e2d26a7a461f6b29d4c68992b699be7c40b080f8df3165bdc07dc6b497e1d',
    timestamp: '5 mins ago',
    channel: 'eternal-paradox',
    validation: 'Validation: Valid',
    sender: 'client...abcd',
    receiver: 'client...efgh',
  },
  {
    txId: '4b3e2d26a7a461f6b29d4c68992b699be7c40b080f8df3165bdc07dc6b497e1d',
    timestamp: '5 mins ago',
    channel: 'eternal-paradox',
    validation: 'Validation: Valid',
    sender: 'client...abcd',
    receiver: 'client...efgh',
  },
  {
    txId: '4b3e2d26a7a461f6b29d4c68992b699be7c40b080f8df3165bdc07dc6b497e1d',
    timestamp: '5 mins ago',
    channel: 'eternal-paradox',
    validation: 'Validation: Valid',
    sender: 'client...abcd',
    receiver: 'client...efgh',
  },
  {
    txId: '4b3e2d26a7a461f6b29d4c68992b699be7c40b080f8df3165bdc07dc6b497e1d',
    timestamp: '5 mins ago',
    channel: 'eternal-paradox',
    validation: 'Validation: Valid',
    sender: 'client...abcd',
    receiver: 'client...efgh',
  },
  {
    txId: '4b3e2d26a7a461f6b29d4c68992b699be7c40b080f8df3165bdc07dc6b497e1d',
    timestamp: '5 mins ago',
    channel: 'eternal-paradox',
    validation: 'Validation: Valid',
    sender: 'client...abcd',
    receiver: 'client...efgh',
  },
  {
    txId: '4b3e2d26a7a461f6b29d4c68992b699be7c40b080f8df3165bdc07dc6b497e1d',
    timestamp: '5 mins ago',
    channel: 'eternal-paradox',
    validation: 'Validation: Valid',
    sender: 'client...abcd',
    receiver: 'client...efgh',
  },
  {
    txId: '4b3e2d26a7a461f6b29d4c68992b699be7c40b080f8df3165bdc07dc6b497e1d',
    timestamp: '5 mins ago',
    channel: 'eternal-paradox',
    validation: 'Validation: Valid',
    sender: 'client...abcd',
    receiver: 'client...efgh',
  },
  {
    txId: '4b3e2d26a7a461f6b29d4c68992b699be7c40b080f8df3165bdc07dc6b497e1d',
    timestamp: '5 mins ago',
    channel: 'eternal-paradox',
    validation: 'Validation: Valid',
    sender: 'client...abcd',
    receiver: 'client...efgh',
  },
  {
    txId: '4b3e2d26a7a461f6b29d4c68992b699be7c40b080f8df3165bdc07dc6b497e1d',
    timestamp: '5 mins ago',
    channel: 'eternal-paradox',
    validation: 'Validation: Valid',
    sender: 'client...abcd',
    receiver: 'client...efgh',
  },
  {
    txId: '4b3e2d26a7a461f6b29d4c68992b699be7c40b080f8df3165bdc07dc6b497e1d',
    timestamp: '5 mins ago',
    channel: 'eternal-paradox',
    validation: 'Validation: Valid',
    sender: 'client...abcd',
    receiver: 'client...efgh',
  },
  // Add more transactions data as needed
];

// Column definitions for "Latest Blocks" table
export const BlocksColumns = [
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
        <div className="text-xs text-gray-500">
          {formatDistanceToNow(new Date(row.original.created), {
            unit: 'minute',
          })}
        </div>
      </div>
    ),
  },
  {
    Header: 'Channel',
    accessor: 'channel',
    Cell: ({ row }) => (
      <div className="">
        <div>{row.original.channel.channelName}</div>
        <div className="text-xs text-gray-500">
          Transactions: {row.original.txCount}
        </div>
      </div>
    ),
  },
  {
    Header: 'Executes',
    accessor: 'executes',
    Cell: ({ value }) => (
      <div className="flex">
        {!value.length && '--'}
        {value.map((execute, index) => (
          <div>
            {execute}
            {index < value.length - 1 ? ', ' : ''}
          </div>
        ))}
      </div>
    ),
  },
  // Add more columns as needed
];

// Column definitions for "Latest Transactions" table
export const TransactionsColumns = [
  {
    Header: 'TxID',
    accessor: 'txId',
    Cell: ({ row }) => (
      <div>
        <a
          href={`/explorer/tx/${row.original.txId}`}
          className="hover:text-blue-600 hover:underline"
        >
          {truncateMiddle(row.original.txId, 6, 4)}
        </a>
        <div className="text-xs text-gray-500">
          {' '}
          {formatDistanceToNow(new Date(row.original.created), {
            unit: 'minute',
          })}
        </div>
      </div>
    ),
  },
  {
    Header: 'Channel',
    accessor: 'channel',
    Cell: ({ row }) => (
      <div className="">
        <div>{row.original.channelName}</div>
        <div className="text-xs text-gray-500">
          Validation : {row.original.valid}
        </div>
      </div>
    ),
  },
  {
    Header: 'Sender/Receiver',
    Cell: ({ row }) => {
      const args = JSON.parse(
        row.original.rawData?.actions?.[0]?.args?.[1] || '{}',
      );
      return (
        <div>
          <div>
            <span className="text-xs text-gray-500">Sender:</span>{' '}
            {args?.from
              ? truncateMiddle(args.from.replace('client|', ''), 6, 4, '...')
              : '--'}
          </div>
          <div>
            <span className="text-xs text-gray-500">Receiver:</span>{' '}
            {args?.to
              ? truncateMiddle(args.to.replace('client|', ''), 6, 4, '...')
              : '--'}
          </div>
        </div>
      );
    },
  },
  // Add more columns as needed
];

export default {
  LatestBlocksData,
  LatestTransactionsData,
  BlocksColumns,
  TransactionsColumns,
};
