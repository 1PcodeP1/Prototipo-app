import { ApiService } from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
  userId?: string;
}

export interface FinancialSummary {
  balance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savings: number;
  totalTransactions: number;
}

export interface BudgetCategory {
  id: string;
  name: string;
  budget: number;
  spent: number;
  color: string;
  icon: string;
  userId?: string;
}

export class FinancialService {
  private static readonly STORAGE_KEYS = {
    TRANSACTIONS: 'financial_transactions',
    BUDGET_CATEGORIES: 'budget_categories',
    FINANCIAL_SUMMARY: 'financial_summary',
  };

  // === TRANSACCIONES ===
  static async getTransactions(): Promise<Transaction[]> {
    try {
      // Intentar obtener desde API primero
      // return await ApiService.get<Transaction[]>('/transactions');
      
      // Fallback a datos locales
      const stored = await AsyncStorage.getItem(this.STORAGE_KEYS.TRANSACTIONS);
      if (stored) {
        return JSON.parse(stored);
      }

      // Datos por defecto si no hay nada
      const defaultTransactions: Transaction[] = [
        {
          id: '1',
          type: 'expense',
          amount: 25.50,
          category: 'Alimentación',
          description: 'Almuerzo en restaurante',
          date: new Date().toISOString().split('T')[0],
        },
        {
          id: '2',
          type: 'income',
          amount: 3000.00,
          category: 'Salario',
          description: 'Salario mensual',
          date: new Date().toISOString().split('T')[0],
        },
        {
          id: '3',
          type: 'expense',
          amount: 120.00,
          category: 'Transporte',
          description: 'Gasolina',
          date: new Date().toISOString().split('T')[0],
        },
      ];

      await this.saveTransactions(defaultTransactions);
      return defaultTransactions;
    } catch (error) {
      console.error('Error getting transactions:', error);
      return [];
    }
  }

  static async addTransaction(transaction: Omit<Transaction, 'id'>): Promise<Transaction> {
    try {
      const newTransaction: Transaction = {
        ...transaction,
        id: Date.now().toString(),
        date: transaction.date || new Date().toISOString().split('T')[0],
      };

      // Intentar enviar a API
      // const result = await ApiService.post<Transaction>('/transactions', newTransaction);
      
      // Guardar localmente
      const transactions = await this.getTransactions();
      transactions.unshift(newTransaction);
      await this.saveTransactions(transactions);
      
      // Actualizar resumen financiero
      await this.updateFinancialSummary();
      
      return newTransaction;
    } catch (error) {
      console.error('Error adding transaction:', error);
      throw error;
    }
  }

  static async deleteTransaction(id: string): Promise<void> {
    try {
      // await ApiService.delete(`/transactions/${id}`);
      
      const transactions = await this.getTransactions();
      const filtered = transactions.filter(t => t.id !== id);
      await this.saveTransactions(filtered);
      await this.updateFinancialSummary();
    } catch (error) {
      console.error('Error deleting transaction:', error);
      throw error;
    }
  }

  private static async saveTransactions(transactions: Transaction[]): Promise<void> {
    await AsyncStorage.setItem(this.STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  }

  // === PRESUPUESTO ===
  static async getBudgetCategories(): Promise<BudgetCategory[]> {
    try {
      // return await ApiService.get<BudgetCategory[]>('/budget-categories');
      
      const stored = await AsyncStorage.getItem(this.STORAGE_KEYS.BUDGET_CATEGORIES);
      if (stored) {
        return JSON.parse(stored);
      }

      const defaultCategories: BudgetCategory[] = [
        {
          id: '1',
          name: 'Alimentación',
          budget: 500,
          spent: 320,
          color: '#FF6B6B',
          icon: '🍽️',
        },
        {
          id: '2',
          name: 'Transporte',
          budget: 200,
          spent: 150,
          color: '#4ECDC4',
          icon: '🚗',
        },
        {
          id: '3',
          name: 'Entretenimiento',
          budget: 300,
          spent: 180,
          color: '#45B7D1',
          icon: '🎬',
        },
        {
          id: '4',
          name: 'Salud',
          budget: 150,
          spent: 75,
          color: '#96CEB4',
          icon: '🏥',
        },
        {
          id: '5',
          name: 'Educación',
          budget: 200,
          spent: 200,
          color: '#FECA57',
          icon: '🏫',
        },
        {
          id: '6',
          name: 'Compras',
          budget: 400,
          spent: 450,
          color: '#FF9FF3',
          icon: '🛍️',
        },
      ];

      await this.saveBudgetCategories(defaultCategories);
      return defaultCategories;
    } catch (error) {
      console.error('Error getting budget categories:', error);
      return [];
    }
  }

  static async updateBudgetCategory(category: BudgetCategory): Promise<BudgetCategory> {
    try {
      // const result = await ApiService.put<BudgetCategory>(`/budget-categories/${category.id}`, category);
      
      const categories = await this.getBudgetCategories();
      const index = categories.findIndex(c => c.id === category.id);
      if (index !== -1) {
        categories[index] = category;
        await this.saveBudgetCategories(categories);
      }
      
      return category;
    } catch (error) {
      console.error('Error updating budget category:', error);
      throw error;
    }
  }

  private static async saveBudgetCategories(categories: BudgetCategory[]): Promise<void> {
    await AsyncStorage.setItem(this.STORAGE_KEYS.BUDGET_CATEGORIES, JSON.stringify(categories));
  }

  // === RESUMEN FINANCIERO ===
  static async getFinancialSummary(): Promise<FinancialSummary> {
    try {
      // return await ApiService.get<FinancialSummary>('/financial-summary');
      
      const transactions = await this.getTransactions();
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      
      const monthlyTransactions = transactions.filter(t => {
        const transactionDate = new Date(t.date);
        return transactionDate.getMonth() === currentMonth && 
               transactionDate.getFullYear() === currentYear;
      });

      const monthlyIncome = monthlyTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
      
      const monthlyExpenses = monthlyTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
      
      const totalExpenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      const summary: FinancialSummary = {
        balance: totalIncome - totalExpenses,
        monthlyIncome,
        monthlyExpenses,
        savings: Math.max(0, monthlyIncome - monthlyExpenses),
        totalTransactions: transactions.length,
      };

      await AsyncStorage.setItem(this.STORAGE_KEYS.FINANCIAL_SUMMARY, JSON.stringify(summary));
      return summary;
    } catch (error) {
      console.error('Error getting financial summary:', error);
      return {
        balance: 0,
        monthlyIncome: 0,
        monthlyExpenses: 0,
        savings: 0,
        totalTransactions: 0,
      };
    }
  }

  private static async updateFinancialSummary(): Promise<void> {
    await this.getFinancialSummary(); // Esto recalcula y guarda automáticamente
  }

  // === ESTADÍSTICAS ===
  static async getMonthlyStats(): Promise<{ month: string; income: number; expenses: number; }[]> {
    try {
      const transactions = await this.getTransactions();
      const stats: Record<string, { income: number; expenses: number; }> = {};
      
      transactions.forEach(transaction => {
        const date = new Date(transaction.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        
        if (!stats[monthKey]) {
          stats[monthKey] = { income: 0, expenses: 0 };
        }
        
        if (transaction.type === 'income') {
          stats[monthKey].income += transaction.amount;
        } else {
          stats[monthKey].expenses += transaction.amount;
        }
      });

      return Object.entries(stats)
        .map(([month, data]) => ({ month, ...data }))
        .sort((a, b) => a.month.localeCompare(b.month))
        .slice(-12); // Últimos 12 meses
    } catch (error) {
      console.error('Error getting monthly stats:', error);
      return [];
    }
  }

  static async getCategoryExpenses(): Promise<{ category: string; amount: number; percentage: number; }[]> {
    try {
      const transactions = await this.getTransactions();
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      
      const monthlyExpenses = transactions.filter(t => {
        const transactionDate = new Date(t.date);
        return t.type === 'expense' && 
               transactionDate.getMonth() === currentMonth && 
               transactionDate.getFullYear() === currentYear;
      });

      const categoryTotals: Record<string, number> = {};
      let totalExpenses = 0;

      monthlyExpenses.forEach(transaction => {
        categoryTotals[transaction.category] = (categoryTotals[transaction.category] || 0) + transaction.amount;
        totalExpenses += transaction.amount;
      });

      return Object.entries(categoryTotals)
        .map(([category, amount]) => ({
          category,
          amount,
          percentage: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0,
        }))
        .sort((a, b) => b.amount - a.amount);
    } catch (error) {
      console.error('Error getting category expenses:', error);
      return [];
    }
  }
}