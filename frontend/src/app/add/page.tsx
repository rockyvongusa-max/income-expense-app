'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FileUpload from '@/components/FileUpload';
import { createTransaction } from '@/lib/api';

const categories = {
  INCOME: ['Salary', 'Freelance', 'Investment', 'Gift', 'Refund', 'Other'],
  EXPENSE: ['Rent', 'Groceries', 'Utilities', 'Internet', 'Transportation', 'Entertainment', 'Healthcare', 'Shopping', 'Other'],
};

export default function AddTransactionPage() {
  const router = useRouter();
  const [type, setType] = useState<'INCOME' | 'EXPENSE'>('EXPENSE');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [attachmentUrl, setAttachmentUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!amount || !category || !date) {
      setError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      await createTransaction({
        type,
        amount: parseFloat(amount),
        category,
        description,
        date,
        attachmentUrl: attachmentUrl || null,
      });
      router.push('/transactions');
    } catch (err) {
      setError('Failed to create transaction');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold font-display">Add Transaction</h1>

      <form onSubmit={handleSubmit} className="bg-surface-elevated rounded-lg p-6 border border-gray-800 space-y-6">
        {error && (
          <div className="p-4 bg-expense-red/20 text-expense-red rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Type Toggle */}
        <div>
          <label className="block text-sm text-gray-400 mb-3">Transaction Type</label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => { setType('INCOME'); setCategory(''); }}
              className={`flex-1 py-3 rounded-full font-medium transition-colors ${
                type === 'INCOME'
                  ? 'bg-income-green text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Income
            </button>
            <button
              type="button"
              onClick={() => { setType('EXPENSE'); setCategory(''); }}
              className={`flex-1 py-3 rounded-full font-medium transition-colors ${
                type === 'EXPENSE'
                  ? 'bg-expense-red text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Expense
            </button>
          </div>
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">Amount *</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
            <input
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              required
              className="w-full pl-8 pr-4 py-3 bg-canvas-dark border border-gray-700 rounded-lg text-lg focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">Category *</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full px-4 py-3 bg-canvas-dark border border-gray-700 rounded-lg focus:outline-none focus:border-primary"
          >
            <option value="">Select a category</option>
            {categories[type].map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional description..."
            rows={3}
            className="w-full px-4 py-3 bg-canvas-dark border border-gray-700 rounded-lg focus:outline-none focus:border-primary resize-none"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">Date *</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="px-4 py-3 bg-canvas-dark border border-gray-700 rounded-lg focus:outline-none focus:border-primary"
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">Attachment (Receipt)</label>
          {attachmentUrl ? (
            <div className="p-4 bg-canvas-dark border border-gray-700 rounded-lg">
              <p className="text-sm text-income-green">✓ File uploaded</p>
              <button
                type="button"
                onClick={() => setAttachmentUrl('')}
                className="text-xs text-gray-400 hover:text-white mt-2"
              >
                Remove
              </button>
            </div>
          ) : (
            <FileUpload onUploadComplete={setAttachmentUrl} />
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-primary hover:bg-primary-600 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-full font-medium transition-colors"
        >
          {isSubmitting ? 'Creating...' : 'Create Transaction'}
        </button>
      </form>
    </div>
  );
}
