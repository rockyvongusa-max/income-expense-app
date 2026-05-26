'use client';

import { useState } from 'react';
import { exportTransactions } from '@/lib/api';

export default function ExportPage() {
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [isExporting, setIsExporting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleExport = async () => {
    setIsExporting(true);
    setMessage(null);
    try {
      const blob = await exportTransactions(year, month);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `transactions-${year}-${String(month).padStart(2, '0')}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setMessage({ type: 'success', text: 'Export downloaded successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to export transactions' });
      console.error(error);
    } finally {
      setIsExporting(false);
    }
  };

  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
  ];

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-2xl font-bold font-display">Export Transactions</h1>

      <div className="bg-surface-elevated rounded-lg p-6 border border-gray-800 space-y-6">
        <p className="text-gray-400">
          Download your transactions as an Excel file for a specific month.
        </p>

        {message && (
          <div
            className={`p-4 rounded-lg text-sm ${
              message.type === 'success' ? 'bg-income-green/20 text-income-green' : 'bg-expense-red/20 text-expense-red'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Month Picker */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Month</label>
            <select
              value={month}
              onChange={(e) => setMonth(parseInt(e.target.value))}
              className="w-full px-4 py-3 bg-canvas-dark border border-gray-700 rounded-lg focus:outline-none focus:border-primary"
            >
              {months.map((m) => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Year</label>
            <select
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
              className="w-full px-4 py-3 bg-canvas-dark border border-gray-700 rounded-lg focus:outline-none focus:border-primary"
            >
              {[2024, 2025, 2026].map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Download Button */}
        <button
          onClick={handleExport}
          disabled={isExporting}
          className="w-full py-3 bg-primary hover:bg-primary-600 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-full font-medium transition-colors flex items-center justify-center gap-2"
        >
          {isExporting ? (
            'Exporting...'
          ) : (
            <>
              📥 Download {months.find((m) => m.value === month)?.label} {year}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
