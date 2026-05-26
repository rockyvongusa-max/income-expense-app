import './globals.css'
import type { Metadata } from 'next'
import Sidebar from '@/components/Sidebar'

export const metadata: Metadata = {
  title: 'Income & Expense Tracker',
  description: 'Track your income and expenses with ease',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <div className="flex-1 ml-60">
            {/* Top Navigation Bar */}
            <nav className="h-16 bg-surface-elevated border-b border-gray-800 flex items-center justify-between px-6 sticky top-0 z-10">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold font-display">Income Tracker</h1>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400">{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
              </div>
            </nav>

            {/* Page Content */}
            <main className="p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
