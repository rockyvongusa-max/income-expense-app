const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export interface Transaction {
  id: number;
  type: 'INCOME' | 'EXPENSE';
  amount: number;
  category: string;
  description: string | null;
  date: string;
  attachmentUrl: string | null;
  createdAt: string;
}

export interface Summary {
  month: string;
  income: number;
  expense: number;
  balance: number;
}

export async function fetchTransactions(params?: {
  search?: string;
  startDate?: string;
  endDate?: string;
}): Promise<Transaction[]> {
  const searchParams = new URLSearchParams();
  if (params?.search) searchParams.set('search', params.search);
  if (params?.startDate) searchParams.set('startDate', params.startDate);
  if (params?.endDate) searchParams.set('endDate', params.endDate);

  const url = `${API_BASE}/api/transactions${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch transactions');
  return res.json();
}

export async function createTransaction(data: Omit<Transaction, 'id' | 'createdAt'>): Promise<Transaction> {
  const res = await fetch(`${API_BASE}/api/transactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.created) throw new Error('Failed to create transaction');
  return res.json();
}

export async function fetchSummary(): Promise<Summary[]> {
  const res = await fetch(`${API_BASE}/api/transactions/summary`);
  if (!res.ok) throw new Error('Failed to fetch summary');
  return res.json();
}

export async function uploadFile(file: File): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${API_BASE}/api/upload`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to upload file');
  return res.json();
}

export async function exportTransactions(year: number, month: number): Promise<Blob> {
  const res = await fetch(`${API_BASE}/api/export/${year}/${month}`);
  if (!res.ok) throw new Error('Failed to export transactions');
  return res.blob();
}
