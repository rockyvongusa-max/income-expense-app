'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Dashboard', icon: '📊' },
  { href: '/transactions', label: 'Transactions', icon: '💳' },
  { href: '/add', label: 'Add Transaction', icon: '➕' },
  { href: '/export', label: 'Export', icon: '📥' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-gray-50 border-r border-gray-200 flex flex-col shrink-0 fixed left-0 top-0 z-30">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-100">
        <span className="text-xl font-extrabold">💰</span>
        <span className="ml-2.5 text-lg font-extrabold text-indigo-600 tracking-tight">MoneyTrack</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-5 px-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all text-sm font-semibold ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 shadow-sm'
                      : 'text-gray-500 hover:bg-white hover:text-gray-700'
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-5 border-t border-gray-100">
        <p className="text-xs text-gray-400 font-medium text-center">v1app · 2026</p>
      </div>
    </aside>
  );
}
