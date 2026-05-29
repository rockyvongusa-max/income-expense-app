'use client';

import { Transaction } from '@/lib/api';

interface TransactionTableProps {
  transactions: Transaction[];
  showActions?: boolean;
}

export default function TransactionTable({ transactions, showActions = false }: TransactionTableProps) {
  if (transactions.length === 0) {
    return (
      <div className="card p-8 text-center">
        <p className="text-slate-400 text-sm font-medium">No transactions found</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="pb-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">Date</th>
            <th className="pb-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">Type</th>
            <th className="pb-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">Category</th>
            <th className="pb-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide hidden sm:table-cell">Description</th>
            <th className="pb-3 text-right text-xs font-semibold text-slate-400 uppercase tracking-wide">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {transactions.map((tx) => (
            <tr key={tx.id} className="group hover:bg-slate-50/70 transition-colors">
              <td className="py-3.5 pr-4 whitespace-nowrap text-sm text-slate-600 font-medium">
                {new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </td>
              <td className="py-3.5 pr-4 whitespace-nowrap">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    tx.type === 'INCOME'
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-red-50 text-red-700'
                  }`}
                >
                  {tx.type === 'INCOME' ? '↑ Income' : '↓ Expense'}
                </span>
              </td>
              <td className="py-3.5 pr-4 whitespace-nowrap text-sm text-slate-700 font-medium">{tx.category}</td>
              <td className="py-3.5 pr-4 whitespace-nowrap text-sm text-slate-500 max-w-[200px] truncate hidden sm:table-cell">
                {tx.description || <span className="text-slate-300 italic">—</span>}
              </td>
              <td className={`py-3.5 text-right text-sm font-bold whitespace-nowrap ${
                tx.type === 'INCOME' ? 'text-emerald-600' : 'text-red-600'
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
