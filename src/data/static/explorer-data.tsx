import { truncateMiddle } from '@/components/ui/truncate-middle';
import React from 'react';
import routes from '@/config/routes';

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
          href={routes.blockDetail(row.original.blockId)}
          className="text-blue-600 hover:underline"
        >
          {row.original.blockId}
        </a>
        <div className="text-xs text-gray-500">{row.original.timestamp}</div>
      </div>
    ),
  },
  {
    Header: 'Channel',
    accessor: 'channel',
    Cell: ({ row }) => (
      <div className="">
        <a href="#" className="text-blue-600 hover:underline">
          {row.original.channel}
        </a>
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
      <div className="">
        {value.map((execute, index) => (
          <a key={index} href="#" className="text-blue-600 hover:underline">
            {execute}
            {index < value.length - 1 ? ', ' : ''}
          </a>
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
          href={routes.transactionDetail(row.original.txId)}
          className="text-blue-600 hover:underline"
        >
          {truncateMiddle(row.original.txId, 6, 4)}
        </a>
        <div className="text-xs text-gray-500">{row.original.timestamp}</div>
      </div>
    ),
  },
  {
    Header: 'Channel',
    accessor: 'channel',
    Cell: ({ row }) => (
      <div className="">
        <a href="#" className="text-blue-600 hover:underline">
          {row.original.channel}
        </a>
        <div className="text-xs text-gray-500">{row.original.validation}</div>
      </div>
    ),
  },
  {
    Header: 'Sender/Receiver',
    Cell: ({ row }) => (
      <div>
        <div>
          <span className="text-xs text-gray-500">Sender:</span>{' '}
          {truncateMiddle(row.original.sender, 6, 4, '...')}
        </div>
        <div>
          <span className="text-xs text-gray-500">Receiver:</span>{' '}
          {truncateMiddle(row.original.receiver, 6, 4, '...')}
        </div>
      </div>
    ),
  },
  // Add more columns as needed
];

export default {
  LatestBlocksData,
  LatestTransactionsData,
  BlocksColumns,
  TransactionsColumns,
};
