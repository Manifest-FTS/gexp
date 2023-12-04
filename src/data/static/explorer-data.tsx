import React from 'react';

// Sample data for "Latest Blocks"
export const LatestBlocksData = [
  {
    blockId: '4012165',
    timestamp: '10 mins ago',
    executes: 3,
    txCount: 5,
  },
  // ... more blocks
];

// Sample data for "Latest Transactions"
export const LatestTransactionsData = [
  {
    txId: 'Tx123456',
    block: '4012165',
    timestamp: '5 mins ago', // Added timestamp for each transaction
    sender: 'Address1', // Split sender and receiver into two separate fields
    receiver: 'Address2',
  },
  {
    txId: 'Tx789012',
    block: '4012164',
    timestamp: '20 mins ago',
    sender: 'Address3',
    receiver: 'Address4',
  },
  // ... more transactions
];

// Column definitions for "Latest Blocks" table
export const BlocksColumns = [
  // ... your existing column definitions for blocks
];

// Column definitions for "Latest Transactions" table
export const TransactionsColumns = [
  {
    Header: 'TxID',
    accessor: 'txId',
    // Custom cell rendering for linked transaction hash URL and timestamp
    Cell: ({ row }) => (
      <div>
        <a
          href={`#/${row.original.txId}`}
          className="text-blue-600 hover:underline"
        >
          {row.original.txId}
        </a>
        <div className="text-xs text-gray-500">{row.original.timestamp}</div>
      </div>
    ),
  },
  // ... other columns, you'll add the updated Sender/Receiver column definition in your explorer-table.tsx
];

export default {
  LatestBlocksData,
  LatestTransactionsData,
  BlocksColumns,
  TransactionsColumns,
};
