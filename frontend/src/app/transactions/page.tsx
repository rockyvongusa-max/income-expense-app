'use client';

import { useEffect, useState } from 'react';
import { fetchTransactions, Transaction } from '@/lib/api';
import TransactionTable from '@/components/TransactionTable';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTransactions();
  }, [search, startDate, endDate]);

  const loadTransactions = async () => {
    setIsLoading(true);
    try {
      const data = await fetchTransactions({ search, startDate, endDate });
      setTransactions(data);
    } catch (error) {
      console.error('Failed to load transactions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-display">All Transactions</h1>

      {/* Filters */}
      <div className="bg-surface-elevated rounded-lg p-4 border border-gray-800 flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm text-gray-400 mb-2">Search</label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by category or description..."
            className="w-full px-4 py-2 bg-canvas-dark border border-gray-700 rounded-full text-sm placeholder-gray-500 focus:outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-4 py-2 bg-canvas-dark border border-gray-700 rounded-full text-sm focus:outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-4 py-2 bg-canvas-dark border border-gray-700 rounded-full text-sm focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="bg-surface-elevated rounded-lg p-8 border border-gray-800 text-center">
          <p className="text-gray-400">Loading transactions...</p>
        </div>
      ) : (
        <TransactionTable transactions={transactions} />
      )}
    </div>
  );
}
