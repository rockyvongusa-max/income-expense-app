'use client';

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  type?: 'default' | 'income' | 'expense';
  gradientClass?: string;
  icon?: string;
}

export default function StatCard({ title, value, subtitle, type = 'default', gradientClass = '', icon }: StatCardProps) {
  return (
    <div
      className={`card rounded-2xl p-6 flex flex-row items-center gap-5 shadow-md ${gradientClass}`}
      style={{ minHeight: 120 }}
    >
      <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-2xl shrink-0">
        {icon || (type === 'income' ? '↑' : type === 'expense' ? '↓' : '•')}
      </div>
      <div className="flex flex-col gap-0.5">
        <p className={`text-sm font-semibold ${gradientClass ? 'text-white/80' : 'text-slate-400'}`}>{title}</p>
        <p className={`text-2xl font-extrabold tracking-tight ${gradientClass ? 'text-white' : 'text-slate-800'}`}>{value}</p>
        {subtitle && (
          <p className={`text-xs font-medium ${gradientClass ? 'text-white/60' : 'text-slate-400'}`}>{subtitle}</p>
        )}
      </div>
    </div>
  );
}
