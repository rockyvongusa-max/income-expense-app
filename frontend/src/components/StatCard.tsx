'use client';

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  type?: 'default' | 'income' | 'expense';
}

export default function StatCard({ title, value, subtitle, type = 'default' }: StatCardProps) {
  const colorClass = type === 'income' ? 'text-income-green' : type === 'expense' ? 'text-expense-red' : 'text-white';

  return (
    <div className="bg-surface-elevated rounded-lg p-6 border border-gray-800">
      <p className="text-sm text-gray-400 mb-2">{title}</p>
      <p className={`text-2xl font-bold font-display ${colorClass}`}>{value}</p>
      {subtitle && <p className="text-xs text-gray-500 mt-2">{subtitle}</p>}
    </div>
  );
}
