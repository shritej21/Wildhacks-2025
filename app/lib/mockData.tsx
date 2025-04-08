import { Expense, Insight } from './types';

export const mockExpenses: Expense[] = [
  {
    id: 'exp1',
    amount: '45.99',
    category: 'food',
    date: new Date(Date.now() - 3600000).toISOString(),
    description: 'Grocery shopping at Whole Foods'
  },
  {
    id: 'exp2',
    amount: '25.50',
    category: 'transportation',
    date: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    description: 'Uber ride to airport'
  },
  {
    id: 'exp3',
    amount: '1200',
    category: 'housing',
    date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    description: 'Monthly rent payment'
  },
  {
    id: 'exp4',
    amount: '60.75',
    category: 'healthcare',
    date: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    description: 'Prescription medication'
  },
  {
    id: 'exp5',
    amount: '35.99',
    category: 'entertainment',
    date: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
    description: 'Movie tickets and snacks'
  },
  {
    id: 'exp6',
    amount: '120.50',
    category: 'shopping',
    date: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
    description: 'New clothes from H&M'
  },
  {
    id: 'exp7',
    amount: '299.99',
    category: 'education',
    date: new Date(Date.now() - 518400000).toISOString(), // 6 days ago
    description: 'Online course subscription'
  }
];

// Mock insights (simulating Gemini API responses)
export const mockInsights: Insight[] = [
  {
    id: 'insight1',
    title: 'Spending Pattern Detected',
    description: 'Your highest spending category this month is Housing at 60% of your total budget. This is typical for most urban residents.',
    type: 'insight'
  },
  {
    id: 'insight2',
    title: 'High Food Expenses',
    description: 'Your food expenses are about 20% higher than the average for your income bracket. Consider meal planning to reduce costs.',
    type: 'warning'
  },
  {
    id: 'insight3',
    title: 'Savings Opportunity',
    description: 'Based on your transportation spending, switching to public transit could save you approximately $120/month.',
    type: 'improvement'
  },
  {
    id: 'insight4',
    title: 'Monthly Trend',
    description: 'Your spending has decreased by 12% compared to last month. Great job on improving your financial discipline!',
    type: 'trend'
  }
];

export async function generateAiInsights(expenses: Expense[]): Promise<Insight[]> {
  
  await new Promise(resolve => setTimeout(resolve, 2000));

  const totalSpent = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
  
  const newInsight: Insight = {
    id: `insight-${Date.now()}`,
    title: 'New Spending Analysis',
    description: `Based on your recent expenses totaling $${totalSpent.toFixed(2)}, I recommend creating an emergency fund of at least $${(totalSpent * 3).toFixed(2)} to cover 3 months of expenses.`,
    type: 'insight'
  };
  
  return [newInsight, ...mockInsights];
}

