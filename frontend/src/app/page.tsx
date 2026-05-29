'use client';

import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import StatCard from '@/components/StatCard';
import TransactionTable from '@/components/TransactionTable';
import { fetchSummary, fetchTransactions, Transaction } from '@/lib/api';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function DashboardPage() {
  const [summary, setSummary] = useState<{ month: string; income: number; expense: number; balance: number }[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [totals, setTotals] = useState({ totalIncome: 0, totalExpense: 0, balance: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [summaryData, transactions] = await Promise.all([
        fetchSummary(),
        fetchTransactions(),
      ]);
      setSummary(summaryData);
      setRecentTransactions(transactions.slice(0, 6));

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
    } finally {
      setLoading(false);
    }
  };

  const chartData = {
    labels: summary.map((s) => s.month),
    datasets: [
      {
        label: 'Income',
        data: summary.map((s) => s.income),
        backgroundColor: '#10b981',
        borderRadius: 8,
        barThickness: 40,
      },
      {
        label: 'Expense',
        data: summary.map((s) => s.expense),
        backgroundColor: '#ef4444',
        borderRadius: 8,
        barThickness: 40,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#ffffff',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        titleColor: '#1e293b',
        bodyColor: '#475569',
        padding: 12,
        cornerRadius: 12,
        callbacks: {
          label: (ctx: any) => ` $${ctx.raw.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#94a3b8', font: { size: 12 } },
        border: { display: false },
      },
      y: {
        grid: { color: '#f1f5f9' },
        ticks: {
          color: '#94a3b8',
          font: { size: 12 },
          callback: (value: any) => `$${value}`,
        },
        border: { display: false },
      },
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-400 text-sm font-medium">Loading your finances...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">

      {/* HERO BALANCE */}
      <div
        className="rounded-2xl p-8 flex items-center justify-between gap-6"
        style={{
          background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #7c3aed 100%)',
          minHeight: 160,
        }}
      >
        <div>
          <p className="text-indigo-200 text-sm font-semibold mb-2">Total Balance</p>
          <p className="text-5xl font-extrabold text-white tracking-tight">
            ${totals.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-indigo-200 text-xs font-medium mt-3 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block"></span>
            All time — updated just now
          </p>
        </div>
      </div>

      {/* 3 STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Income"
          value={`$${totals.totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
          subtitle="All time income"
          type="income"
          gradientClass="stat-income"
          icon="💰"
        />
        <StatCard
          title="Total Expenses"
          value={`$${totals.totalExpense.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
          subtitle="All time expenses"
          type="expense"
          gradientClass="stat-expense"
          icon="💸"
        />
        <StatCard
          title="Net Savings"
          value={`$${totals.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
          subtitle="Income minus expenses"
          type={totals.balance >= 0 ? 'income' : 'expense'}
          gradientClass="stat-balance"
          icon="🏦"
        />
      </div>

      {/* MONTHLY CHART */}
      <div className="card rounded-2xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-base font-bold text-slate-800">Income & Expenses</h2>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Monthly overview</p>
          </div>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
              <span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block"></span> Income
            </span>
            <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
              <span className="w-3 h-3 rounded-sm bg-red-500 inline-block"></span> Expense
            </span>
          </div>
        </div>
        <div style={{ height: '256px', position: 'relative' }}>
          {summary.length > 0 ? (
            <Bar data={chartData} options={chartOptions as any} />
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400 text-sm font-medium">
              No data yet — add your first transaction!
            </div>
          )}
        </div>
      </div>

      {/* RECENT TRANSACTIONS */}
      <div className="card rounded-2xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base font-bold text-slate-800">Recent Transactions</h2>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Your last {recentTransactions.length} activities</p>
          </div>
          <a
            href="/transactions"
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            View all →
          </a>
        </div>
        <TransactionTable transactions={recentTransactions} />
      </div>

    </div>
  );
}