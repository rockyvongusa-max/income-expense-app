'use client';

import { Transaction } from '@/lib/api';

interface TransactionTableProps {
  transactions: Transaction[];
  showActions?: boolean;
}

export default function TransactionTable({ transactions, showActions = false }: TransactionTableProps) {
  if (transactions.length === 0) {
    return (
      <div className="bg-surface-elevated rounded-lg p-8 border border-gray-800 text-center">
        <p className="text-gray-400">No transactions found</p>
      </div>
    );
  }

  return (
    <div className="bg-surface-elevated rounded-lg border border-gray-800 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-900">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Description</th>
            <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {transactions.map((tx) => (
            <tr key={tx.id} className="hover:bg-gray-900/50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    tx.type === 'INCOME'
                      ? 'bg-income-green/20 text-income-green'
                      : 'bg-expense-red/20 text-expense-red'
                  }`}
                >
                  {tx.type === 'INCOME' ? 'Income' : 'Expense'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">{tx.category}</td>
              <td className="px-6 py-4 text-sm text-gray-300 max-w-xs truncate">
                {tx.description || '-'}
              </td>
              <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold text-right ${
                tx.type === 'INCOME' ? 'text-income-green' : 'text-expense-red'
              }`}>
                {tx.type === 'INCOME' ? '+' : '-'}${tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
