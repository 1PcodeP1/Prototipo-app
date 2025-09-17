import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Card, Button, Chip, FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { BudgetStackScreenProps } from '../../types/navigation';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, typography, spacing, borderRadius } from '../../styles/theme';
import { 
  screenData, 
  getSpacing, 
  getFontSizes, 
  getComponentSizes,
  getGridColumns,
  getResponsiveStyle,
  scaleWidth,
  scaleHeight 
} from '../../utils/responsive';

// Obtener valores responsive
const responsiveSpacing = getSpacing;
const responsiveFontSizes = getFontSizes();
const responsiveComponentSizes = getComponentSizes();

interface BudgetCategory {
  id: string;
  name: string;
  budget: number;
  spent: number;
  color: string;
  icon: string;
}

const BudgetScreen = () => {
  const navigation = useNavigation<BudgetStackScreenProps<'BudgetMain'>['navigation']>();
  const [categories] = useState<BudgetCategory[]>([
    {
      id: '1',
      name: 'Alimentación',
      budget: 500,
      spent: 320,
      color: colors.categories.food,
      icon: '🍽️',
    },
    {
      id: '2',
      name: 'Transporte',
      budget: 200,
      spent: 150,
      color: colors.categories.transport,
      icon: '🚗',
    },
    {
      id: '3',
      name: 'Entretenimiento',
      budget: 300,
      spent: 180,
      color: colors.categories.entertainment,
      icon: '🎬',
    },
    {
      id: '4',
      name: 'Salud',
      budget: 150,
      spent: 75,
      color: colors.categories.health,
      icon: '🏥',
    },
    {
      id: '5',
      name: 'Educación',
      budget: 200,
      spent: 200,
      color: colors.categories.education,
      icon: '🏫',
    },
    {
      id: '6',
      name: 'Compras',
      budget: 400,
      spent: 450,
      color: colors.categories.shopping,
      icon: '🛍️',
    },
  ]);

  const totalBudget = categories.reduce((sum, cat) => sum + cat.budget, 0);
  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);
  const remaining = totalBudget - totalSpent;

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString('es-ES', { minimumFractionDigits: 2 })}`;
  };

  const getProgressPercentage = (spent: number, budget: number) => {
    return Math.min((spent / budget) * 100, 100);
  };

  const getStatusColor = (spent: number, budget: number) => {
    const percentage = (spent / budget) * 100;
    if (percentage >= 100) return colors.error;
    if (percentage >= 80) return colors.warning;
    return colors.success;
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Resumen del presupuesto */}
        <View style={styles.summaryContainer}>
          <Card style={styles.summaryCard}>
            <Card.Content>
              <Text style={styles.summaryTitle}>Resumen del Presupuesto</Text>
              <View style={styles.summaryStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Presupuesto Total</Text>
                  <Text style={styles.statValue}>{formatCurrency(totalBudget)}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Gastado</Text>
                  <Text style={[styles.statValue, { color: colors.error }]}>
                    {formatCurrency(totalSpent)}
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Restante</Text>
                  <Text style={[styles.statValue, { 
                    color: remaining >= 0 ? colors.success : colors.error 
                  }]}>
                    {formatCurrency(remaining)}
                  </Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        </View>

        {/* Categorías */}
        <View style={styles.categoriesContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categorías</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Editar</Text>
            </TouchableOpacity>
          </View>

          {categories.map((category) => {
            const percentage = getProgressPercentage(category.spent, category.budget);
            const statusColor = getStatusColor(category.spent, category.budget);
            const isOverBudget = category.spent > category.budget;

            return (
              <Card key={category.id} style={styles.categoryCard}>
                <Card.Content>
                  <View style={styles.categoryHeader}>
                    <View style={styles.categoryInfo}>
                      <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
                        <Text style={{ fontSize: 24 }}>{category.icon}</Text>
                      </View>
                      <View style={styles.categoryDetails}>
                        <Text style={styles.categoryName}>{category.name}</Text>
                        <Text style={styles.categoryAmount}>
                          {formatCurrency(category.spent)} / {formatCurrency(category.budget)}
                        </Text>
                      </View>
                    </View>
                    <Chip
                      mode="outlined"
                      style={[styles.statusChip, { borderColor: statusColor }]}
                      textStyle={{ color: statusColor }}
                    >
                      {isOverBudget ? 'Excedido' : `${Math.round(percentage)}%`}
                    </Chip>
                  </View>

                  {/* Barra de progreso */}
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <View
                        style={[
                          styles.progressFill,
                          {
                            width: `${Math.min(percentage, 100)}%`,
                            backgroundColor: statusColor,
                          },
                        ]}
                      />
                    </View>
                  </View>

                  {isOverBudget && (
                    <View style={styles.overBudgetWarning}>
                      <Text style={{ fontSize: 16, color: colors.error }}>⚠️</Text>
                      <Text style={styles.overBudgetText}>
                        Has excedido el presupuesto en {formatCurrency(category.spent - category.budget)}
                      </Text>
                    </View>
                  )}
                </Card.Content>
              </Card>
            );
          })}
        </View>

        {/* Acciones rápidas */}
        <View style={styles.actionsContainer}>
          <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
          <View style={styles.actionButtons}>
            <Button
              mode="outlined"
              onPress={() => {}}
              style={styles.actionButton}
            >
              ➕ Agregar Gasto
            </Button>
            <Button
              mode="outlined"
              onPress={() => {}}
              style={styles.actionButton}
            >
              ✏️ Editar Presupuesto
            </Button>
          </View>
          <View style={styles.navigationButtons}>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('Dashboard')}
              style={[styles.navButton, { backgroundColor: colors.primary }]}
            >
              🏠 Dashboard
            </Button>
            <Button
              mode="outlined"
              onPress={() => navigation.navigate('Estadísticas')}
              style={styles.navButton}
            >
              📊 Estadísticas
            </Button>
          </View>
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
  summaryContainer: {
    padding: responsiveSpacing.lg,
  },
  summaryCard: {
    borderRadius: responsiveComponentSizes.cardBorderRadius,
    elevation: 4,
  },
  summaryTitle: {
    ...typography.h3,
    marginBottom: spacing.md,
    color: colors.primary,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  statValue: {
    ...typography.h3,
    fontWeight: '600',
  },
  categoriesContainer: {
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
  categoryCard: {
    marginBottom: spacing.md,
    borderRadius: borderRadius.md,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  categoryDetails: {
    flex: 1,
  },
  categoryName: {
    ...typography.body,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  categoryAmount: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  statusChip: {
    height: responsiveComponentSizes.buttonHeight * 0.7,
    minWidth: scaleWidth(80),
    justifyContent: 'center',
    paddingHorizontal: responsiveSpacing.sm,
  },
  progressContainer: {
    marginTop: responsiveSpacing.sm,
  },
  progressBar: {
    height: responsiveComponentSizes.progressBarHeight * 1.2,
    backgroundColor: colors.border,
    borderRadius: responsiveComponentSizes.cardBorderRadius,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: responsiveComponentSizes.cardBorderRadius,
  },
  overBudgetWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
    padding: spacing.sm,
    backgroundColor: colors.error + '10',
    borderRadius: borderRadius.sm,
  },
  overBudgetText: {
    ...typography.caption,
    color: colors.error,
    marginLeft: spacing.xs,
    flex: 1,
  },
  actionsContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: spacing.md,
  },
  navButton: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },
  fab: {
    position: 'absolute',
    margin: spacing.lg,
    right: 0,
    bottom: 0,
    backgroundColor: colors.primary,
  },
});

export default BudgetScreen;
