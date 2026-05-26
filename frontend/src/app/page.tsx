'use client';

import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import StatCard from '@/components/StatCard';
import TransactionTable from '@/components/TransactionTable';
import { fetchSummary, fetchTransactions, Transaction } from '@/lib/api';

export default function DashboardPage() {
  const [summary, setSummary] = useState<{ month: string; income: number; expense: number; balance: number }[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [totals, setTotals] = useState({ totalIncome: 0, totalExpense: 0, balance: 0 });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [summaryData, transactions] = await Promise.all([
        fetchSummary(),
        fetchTransactions(),
      ]);
      setSummary(summaryData);
      setRecentTransactions(transactions.slice(0, 5));

      const totalIncome = transactions
        .filter((t) => t.type === 'INCOME')
        .reduce((sum, t) => sum + t.amount, 0);
      const totalExpense = transactions
        .filter((t) => t.type === 'EXPENSE')
        .reduce((sum, t) => sum + t.amount, 0);

      setTotals({
        totalIncome,
        totalExpense,
        balance: totalIncome - totalExpense,
      });
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  return (
    <div className="space-y-8">
      {/* Balance Hero */}
      <div className="bg-surface-elevated rounded-lg p-8 border border-gray-800">
        <p className="text-sm text-gray-400 mb-2">Total Balance</p>
        <p className={`text-4xl font-bold font-display ${totals.balance >= 0 ? 'text-income-green' : 'text-expense-red'}`}>
          ${totals.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Income"
          value={`$${totals.totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
          subtitle="All time income"
          type="income"
        />
        <StatCard
          title="Total Expenses"
          value={`$${totals.totalExpense.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
          subtitle="All time expenses"
          type="expense"
        />
        <StatCard
          title="Net Balance"
          value={`$${totals.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
          subtitle="Income minus expenses"
          type={totals.balance >= 0 ? 'income' : 'expense'}
        />
      </div>

      {/* Monthly Chart */}
      <div className="bg-surface-elevated rounded-lg p-6 border border-gray-800">
        <h2 className="text-lg font-semibold mb-6">Income vs Expenses by Month</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={summary} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="month" stroke="#888" tick={{ fill: '#888' }} />
              <YAxis stroke="#888" tick={{ fill: '#888' }} tickFormatter={(value) => `$${value}`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#16181a', border: '1px solid #333', borderRadius: '8px' }}
                labelStyle={{ color: '#fff' }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
              />
              <Legend />
              <Bar dataKey="income" name="Income" fill="#00a87e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expense" name="Expense" fill="#e23b4a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
        <TransactionTable transactions={recentTransactions} />
      </div>
    </div>
  );
}
