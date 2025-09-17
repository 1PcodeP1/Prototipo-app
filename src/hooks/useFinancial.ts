import { useState, useEffect, useCallback } from 'react';
import { FinancialService, Transaction, FinancialSummary, BudgetCategory } from '../services/financial';

export const useFinancialData = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<FinancialSummary | null>(null);
  const [budgetCategories, setBudgetCategories] = useState<BudgetCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [transactionsData, summaryData, budgetData] = await Promise.all([
        FinancialService.getTransactions(),
        FinancialService.getFinancialSummary(),
        FinancialService.getBudgetCategories(),
      ]);
      
      setTransactions(transactionsData);
      setSummary(summaryData);
      setBudgetCategories(budgetData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading financial data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const addTransaction = useCallback(async (transaction: Omit<Transaction, 'id'>) => {
    try {
      const newTransaction = await FinancialService.addTransaction(transaction);
      setTransactions(prev => [newTransaction, ...prev]);
      
      // Actualizar resumen
      const newSummary = await FinancialService.getFinancialSummary();
      setSummary(newSummary);
      
      return newTransaction;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error adding transaction');
      throw err;
    }
  }, []);

  const deleteTransaction = useCallback(async (id: string) => {
    try {
      await FinancialService.deleteTransaction(id);
      setTransactions(prev => prev.filter(t => t.id !== id));
      
      // Actualizar resumen
      const newSummary = await FinancialService.getFinancialSummary();
      setSummary(newSummary);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting transaction');
      throw err;
    }
  }, []);

  const updateBudgetCategory = useCallback(async (category: BudgetCategory) => {
    try {
      const updatedCategory = await FinancialService.updateBudgetCategory(category);
      setBudgetCategories(prev => 
        prev.map(c => c.id === category.id ? updatedCategory : c)
      );
      return updatedCategory;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating budget category');
      throw err;
    }
  }, []);

  const refreshData = useCallback(() => {
    loadData();
  }, [loadData]);

  return {
    transactions,
    summary,
    budgetCategories,
    loading,
    error,
    addTransaction,
    deleteTransaction,
    updateBudgetCategory,
    refreshData,
  };
};

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTransactions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await FinancialService.getTransactions();
      setTransactions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading transactions');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  const addTransaction = useCallback(async (transaction: Omit<Transaction, 'id'>) => {
    try {
      const newTransaction = await FinancialService.addTransaction(transaction);
      setTransactions(prev => [newTransaction, ...prev]);
      return newTransaction;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error adding transaction');
      throw err;
    }
  }, []);

  const deleteTransaction = useCallback(async (id: string) => {
    try {
      await FinancialService.deleteTransaction(id);
      setTransactions(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting transaction');
      throw err;
    }
  }, []);

  const getRecentTransactions = useCallback((limit: number = 5) => {
    return transactions.slice(0, limit);
  }, [transactions]);

  const getTransactionsByCategory = useCallback((category: string) => {
    return transactions.filter(t => t.category === category);
  }, [transactions]);

  const getTransactionsByType = useCallback((type: 'income' | 'expense') => {
    return transactions.filter(t => t.type === type);
  }, [transactions]);

  return {
    transactions,
    loading,
    error,
    addTransaction,
    deleteTransaction,
    getRecentTransactions,
    getTransactionsByCategory,
    getTransactionsByType,
    refreshTransactions: loadTransactions,
  };
};

export const useBudget = () => {
  const [categories, setCategories] = useState<BudgetCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadBudgetCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await FinancialService.getBudgetCategories();
      setCategories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading budget categories');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBudgetCategories();
  }, [loadBudgetCategories]);

  const updateCategory = useCallback(async (category: BudgetCategory) => {
    try {
      const updatedCategory = await FinancialService.updateBudgetCategory(category);
      setCategories(prev => 
        prev.map(c => c.id === category.id ? updatedCategory : c)
      );
      return updatedCategory;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating category');
      throw err;
    }
  }, []);

  const getTotalBudget = useCallback(() => {
    return categories.reduce((sum, cat) => sum + cat.budget, 0);
  }, [categories]);

  const getTotalSpent = useCallback(() => {
    return categories.reduce((sum, cat) => sum + cat.spent, 0);
  }, [categories]);

  const getRemainingBudget = useCallback(() => {
    return getTotalBudget() - getTotalSpent();
  }, [getTotalBudget, getTotalSpent]);

  const getCategoriesOverBudget = useCallback(() => {
    return categories.filter(cat => cat.spent > cat.budget);
  }, [categories]);

  const getBudgetUtilization = useCallback(() => {
    const total = getTotalBudget();
    const spent = getTotalSpent();
    return total > 0 ? (spent / total) * 100 : 0;
  }, [getTotalBudget, getTotalSpent]);

  return {
    categories,
    loading,
    error,
    updateCategory,
    getTotalBudget,
    getTotalSpent,
    getRemainingBudget,
    getCategoriesOverBudget,
    getBudgetUtilization,
    refreshBudget: loadBudgetCategories,
  };
};

export const useFinancialSummary = () => {
  const [summary, setSummary] = useState<FinancialSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSummary = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await FinancialService.getFinancialSummary();
      setSummary(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading financial summary');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSummary();
  }, [loadSummary]);

  const getSavingsRate = useCallback(() => {
    if (!summary || summary.monthlyIncome === 0) return 0;
    return (summary.savings / summary.monthlyIncome) * 100;
  }, [summary]);

  const getExpenseRatio = useCallback(() => {
    if (!summary || summary.monthlyIncome === 0) return 0;
    return (summary.monthlyExpenses / summary.monthlyIncome) * 100;
  }, [summary]);

  const getNetWorthTrend = useCallback(() => {
    if (!summary) return 'neutral';
    const monthlyBalance = summary.monthlyIncome - summary.monthlyExpenses;
    if (monthlyBalance > 0) return 'positive';
    if (monthlyBalance < 0) return 'negative';
    return 'neutral';
  }, [summary]);

  return {
    summary,
    loading,
    error,
    getSavingsRate,
    getExpenseRatio,
    getNetWorthTrend,
    refreshSummary: loadSummary,
  };
};