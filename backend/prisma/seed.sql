-- Seed data for Income & Expense Tracker
-- 10 sample transactions in current month (May 2026)

-- INCOME transactions
INSERT INTO transactions (type, amount, category, description, date, "createdAt") VALUES
('INCOME', 5500.00, 'Salary', 'Monthly salary from tech corp', '2026-05-01', '2026-05-01T09:00:00Z'),
('INCOME', 1200.00, 'Freelance', 'Website design project', '2026-05-15', '2026-05-15T14:30:00Z'),
('INCOME', 350.00, 'Investment', 'Stock dividend payout', '2026-05-20', '2026-05-20T10:00:00Z');

-- EXPENSE transactions
INSERT INTO transactions (type, amount, category, description, date, "createdAt") VALUES
('EXPENSE', 1200.00, 'Rent', 'Monthly rent payment', '2026-05-03', '2026-05-03T08:00:00Z'),
('EXPENSE', 85.50, 'Groceries', 'Weekly groceries at supermarket', '2026-05-07', '2026-05-07T17:45:00Z'),
('EXPENSE', 120.00, 'Utilities', 'Electricity bill', '2026-05-10', '2026-05-10T11:00:00Z'),
('EXPENSE', 45.00, 'Internet', 'Monthly internet subscription', '2026-05-12', '2026-05-12T09:30:00Z'),
('EXPENSE', 380.00, 'Transportation', 'Uber rides for the month', '2026-05-18', '2026-05-18T20:15:00Z'),
('EXPENSE', 299.00, 'Entertainment', 'Gaming console purchase', '2026-05-22', '2026-05-22T16:00:00Z'),
('EXPENSE', 55.00, 'Healthcare', 'Doctor visit co-pay', '2026-05-25', '2026-05-25T13:30:00Z');
