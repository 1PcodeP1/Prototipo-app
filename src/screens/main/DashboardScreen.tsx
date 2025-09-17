import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { Card, FAB, Chip } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import type { DashboardStackScreenProps } from '../../types/navigation';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, typography, spacing, borderRadius } from '../../styles/theme';
import { 
  getSpacing, 
  getFontSizes, 
  getComponentSizes,
  scaleWidth,
  scaleHeight 
} from '../../utils/responsive';

// Obtener valores responsive
const responsiveSpacing = getSpacing;
const responsiveFontSizes = getFontSizes();
const responsiveComponentSizes = getComponentSizes();

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
}

interface FinancialData {
  balance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savings: number;
  recentTransactions: Transaction[];
}

const DashboardScreen = () => {
  const navigation = useNavigation<DashboardStackScreenProps<'DashboardMain'>['navigation']>();
  const [refreshing, setRefreshing] = useState(false);
  const [financialData, setFinancialData] = useState<FinancialData>({
    balance: 2500.00,
    monthlyIncome: 3000.00,
    monthlyExpenses: 1800.00,
    savings: 1200.00,
    recentTransactions: [
      {
        id: '1',
        type: 'expense',
        amount: 25.50,
        category: 'Alimentación',
        description: 'Almuerzo en restaurante',
        date: '2024-01-15',
      },
      {
        id: '2',
        type: 'income',
        amount: 3000.00,
        category: 'Salario',
        description: 'Salario mensual',
        date: '2024-01-01',
      },
      {
        id: '3',
        type: 'expense',
        amount: 120.00,
        category: 'Transporte',
        description: 'Gasolina',
        date: '2024-01-14',
      },
    ],
  });

  const onRefresh = async () => {
    setRefreshing(true);
    // Simular carga de datos
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const getCategoryColor = (category: string) => {
    const categoryColors: { [key: string]: string } = {
      'Alimentación': colors.categories.food,
      'Transporte': colors.categories.transport,
      'Entretenimiento': colors.categories.entertainment,
      'Salud': colors.categories.health,
      'Educación': colors.categories.education,
      'Compras': colors.categories.shopping,
      'Salario': colors.success,
      'Otros': colors.categories.other,
    };
    return categoryColors[category] || colors.categories.other;
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString('es-ES', { minimumFractionDigits: 2 })}`;
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header con saldo */}
        <LinearGradient
          colors={[colors.gradient.start, colors.gradient.end]}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <Text style={styles.greeting}>¡Hola! 👋</Text>
            <Text style={styles.balanceLabel}>Saldo actual</Text>
            <Text style={styles.balanceAmount}>
              {formatCurrency(financialData.balance)}
            </Text>
          </View>
        </LinearGradient>

        {/* Resumen financiero */}
        <View style={styles.summaryContainer}>
          <Card style={styles.summaryCard}>
            <Card.Content>
              <Text style={styles.summaryTitle}>Resumen del mes</Text>
              <View style={styles.summaryRow}>
                <View style={styles.summaryItem}>
                  <Text style={{ fontSize: 24, color: colors.success }}>📈</Text>
                  <Text style={styles.summaryLabel}>Ingresos</Text>
                  <Text style={[styles.summaryAmount, { color: colors.success }]}>
                    {formatCurrency(financialData.monthlyIncome)}
                  </Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={{ fontSize: 24, color: colors.error }}>📉</Text>
                  <Text style={styles.summaryLabel}>Gastos</Text>
                  <Text style={[styles.summaryAmount, { color: colors.error }]}>
                    {formatCurrency(financialData.monthlyExpenses)}
                  </Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={{ fontSize: 24, color: colors.info }}>💰</Text>
                  <Text style={styles.summaryLabel}>Ahorros</Text>
                  <Text style={[styles.summaryAmount, { color: colors.info }]}>
                    {formatCurrency(financialData.savings)}
                  </Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        </View>

        {/* Accesos rápidos */}
        <View style={styles.quickAccessContainer}>
          <Text style={styles.sectionTitle}>Accesos rápidos</Text>
          <View style={styles.quickAccessGrid}>
            <TouchableOpacity 
              style={styles.quickAccessButton}
              onPress={() => navigation.navigate('Presupuesto')}
            >
              <View style={[styles.quickAccessIcon, { backgroundColor: colors.categories.shopping }]}>
                <Text style={styles.quickAccessIconText}>💰</Text>
              </View>
              <Text style={styles.quickAccessText}>Presupuesto</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickAccessButton}
              onPress={() => navigation.navigate('Ahorros')}
            >
              <View style={[styles.quickAccessIcon, { backgroundColor: colors.categories.transport }]}>
                <Text style={styles.quickAccessIconText}>🏦</Text>
              </View>
              <Text style={styles.quickAccessText}>Ahorros</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickAccessButton}
              onPress={() => navigation.navigate('Estadísticas')}
            >
              <View style={[styles.quickAccessIcon, { backgroundColor: colors.categories.health }]}>
                <Text style={styles.quickAccessIconText}>📊</Text>
              </View>
              <Text style={styles.quickAccessText}>Estadísticas</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickAccessButton}
              onPress={() => navigation.navigate('Educación')}
            >
              <View style={[styles.quickAccessIcon, { backgroundColor: colors.categories.education }]}>
                <Text style={styles.quickAccessIconText}>📚</Text>
              </View>
              <Text style={styles.quickAccessText}>Educación</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Transacciones recientes */}
        <View style={styles.transactionsContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Transacciones recientes</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Ver todas</Text>
            </TouchableOpacity>
          </View>

          {financialData.recentTransactions.map((transaction) => (
            <Card key={transaction.id} style={styles.transactionCard}>
              <Card.Content>
                <View style={styles.transactionRow}>
                  <View style={styles.transactionInfo}>
                    <View style={styles.transactionHeader}>
                      <Text style={styles.transactionDescription}>
                        {transaction.description}
                      </Text>
                      <Text
                        style={[
                          styles.transactionAmount,
                          {
                            color: transaction.type === 'income' ? colors.success : colors.error,
                          },
                        ]}
                      >
                        {transaction.type === 'income' ? '+' : '-'}
                        {formatCurrency(transaction.amount)}
                      </Text>
                    </View>
                    <View style={styles.transactionDetails}>
                      <Chip
                        mode="outlined"
                        style={[
                          styles.categoryChip,
                          { borderColor: getCategoryColor(transaction.category) },
                        ]}
                        textStyle={{ color: getCategoryColor(transaction.category) }}
                      >
                        {transaction.category}
                      </Chip>
                      <Text style={styles.transactionDate}>{transaction.date}</Text>
                    </View>
                  </View>
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>

        {/* Recomendaciones */}
        <View style={styles.recommendationsContainer}>
          <Text style={styles.sectionTitle}>Recomendaciones</Text>
          <Card style={styles.recommendationCard}>
            <Card.Content>
              <View style={styles.recommendationHeader}>
                <Text style={{ fontSize: 24, color: colors.warning }}>💡</Text>
                <Text style={styles.recommendationTitle}>Consejo del día</Text>
              </View>
              <Text style={styles.recommendationText}>
                Has gastado un 20% menos en entretenimiento este mes. ¡Excelente trabajo! 
                Considera aumentar tu meta de ahorro.
              </Text>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>

      <FAB
        style={styles.fab}
        label="+"
        onPress={() => {
          // Navegar a agregar transacción
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: spacing.lg,
    paddingTop: spacing.xxl,
  },
  headerContent: {
    alignItems: 'center',
  },
  greeting: {
    ...typography.h3,
    color: colors.surface,
    marginBottom: spacing.sm,
  },
  balanceLabel: {
    ...typography.body,
    color: colors.surface,
    opacity: 0.9,
    marginBottom: spacing.xs,
  },
  balanceAmount: {
    ...typography.h1,
    color: colors.surface,
    fontWeight: 'bold',
  },
  summaryContainer: {
    padding: spacing.lg,
    paddingTop: spacing.md,
  },
  summaryCard: {
    borderRadius: borderRadius.lg,
    elevation: 4,
  },
  summaryTitle: {
    ...typography.h3,
    marginBottom: spacing.md,
    color: colors.primary,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    ...typography.caption,
    marginTop: spacing.xs,
    marginBottom: spacing.xs,
  },
  summaryAmount: {
    ...typography.body,
    fontWeight: '600',
  },
  transactionsContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.primary,
  },
  seeAllText: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '600',
  },
  transactionCard: {
    marginBottom: spacing.sm,
    borderRadius: borderRadius.md,
  },
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionInfo: {
    flex: 1,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  transactionDescription: {
    ...typography.body,
    flex: 1,
  },
  transactionAmount: {
    ...typography.body,
    fontWeight: '600',
  },
  transactionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryChip: {
    height: 28,
  },
  transactionDate: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  recommendationsContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  recommendationCard: {
    borderRadius: borderRadius.lg,
    backgroundColor: colors.warning + '10',
  },
  recommendationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  recommendationTitle: {
    ...typography.h3,
    marginLeft: spacing.sm,
    color: colors.warning,
  },
  recommendationText: {
    ...typography.body,
    color: colors.text,
    lineHeight: 22,
  },
  fab: {
    position: 'absolute',
    margin: spacing.lg,
    right: 0,
    bottom: 0,
    backgroundColor: colors.primary,
  },
  // Estilos para accesos rápidos
  quickAccessContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  quickAccessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickAccessButton: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  quickAccessIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  quickAccessIconText: {
    fontSize: 24,
  },
  quickAccessText: {
    ...typography.body,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default DashboardScreen;
