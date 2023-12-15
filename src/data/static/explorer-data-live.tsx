// src/components/explorer-data.tsx
import React, { useEffect, useState } from 'react';
import { fetchBlocks, fetchTransactions } from '@/apis/galaChainApi';
import ExplorerTable from '@/components/explorer/explorer-table';

const ExplorerData = () => {
  const [blocks, setBlocks] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blocksData = await fetchBlocks();
        setBlocks(blocksData);
        const transactionsData = await fetchTransactions();
        setTransactions(transactionsData);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <ExplorerTable blocks={blocks} transactions={transactions} />
    </div>
  );
};

export default ExplorerData;
