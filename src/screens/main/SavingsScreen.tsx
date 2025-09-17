import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Card, Button, ProgressBar, Chip, FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { SavingsStackScreenProps } from '../../types/navigation';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, typography, spacing, borderRadius } from '../../styles/theme';

interface SavingsGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  category: string;
  color: string;
  icon: string;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  reward: number;
  progress: number;
  maxProgress: number;
  isCompleted: boolean;
  color: string;
}

const SavingsScreen = () => {
  const navigation = useNavigation<SavingsStackScreenProps<'SavingsMain'>['navigation']>();
  const [goals] = useState<SavingsGoal[]>([
    {
      id: '1',
      title: 'Vacaciones de verano',
      targetAmount: 2000,
      currentAmount: 1200,
      targetDate: '2024-06-01',
      category: 'Viajes',
      color: colors.info,
      icon: '✈️',
    },
    {
      id: '2',
      title: 'Laptop nueva',
      targetAmount: 1500,
      currentAmount: 800,
      targetDate: '2024-04-15',
      category: 'Tecnología',
      color: colors.warning,
      icon: '💻',
    },
    {
      id: '3',
      title: 'Fondo de emergencia',
      targetAmount: 5000,
      currentAmount: 2500,
      targetDate: '2024-12-31',
      category: 'Emergencia',
      color: colors.success,
      icon: '🛡️',
    },
  ]);

  const [challenges] = useState<Challenge[]>([
    {
      id: '1',
      title: 'Ahorro semanal',
      description: 'Ahorra $50 esta semana',
      reward: 10,
      progress: 35,
      maxProgress: 50,
      isCompleted: false,
      color: colors.primary,
    },
    {
      id: '2',
      title: 'Desafío 30 días',
      description: 'No gastes en entretenimiento por 30 días',
      reward: 25,
      progress: 15,
      maxProgress: 30,
      isCompleted: false,
      color: colors.accent,
    },
    {
      id: '3',
      title: 'Meta mensual',
      description: 'Ahorra $500 este mes',
      reward: 50,
      progress: 500,
      maxProgress: 500,
      isCompleted: true,
      color: colors.success,
    },
  ]);

  const totalSavings = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString('es-ES', { minimumFractionDigits: 2 })}`;
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getDaysUntilTarget = (targetDate: string) => {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getTimeToGoal = (current: number, target: number, targetDate: string) => {
    const remaining = target - current;
    const daysLeft = getDaysUntilTarget(targetDate);
    const dailyAmount = remaining / Math.max(daysLeft, 1);
    return dailyAmount;
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Resumen de ahorros */}
        <View style={styles.summaryContainer}>
          <Card style={styles.summaryCard}>
            <Card.Content>
              <Text style={styles.summaryTitle}>Resumen de Ahorros</Text>
              <View style={styles.summaryStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Total Ahorrado</Text>
                  <Text style={styles.statValue}>{formatCurrency(totalSavings)}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Meta Total</Text>
                  <Text style={styles.statValue}>{formatCurrency(totalTarget)}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Progreso</Text>
                  <Text style={styles.statValue}>
                    {Math.round(getProgressPercentage(totalSavings, totalTarget))}%
                  </Text>
                </View>
              </View>
              <ProgressBar
                progress={getProgressPercentage(totalSavings, totalTarget) / 100}
                color={colors.primary}
                style={styles.overallProgress}
              />
            </Card.Content>
          </Card>
        </View>

        {/* Metas de ahorro */}
        <View style={styles.goalsContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Mis Metas</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Nueva meta</Text>
            </TouchableOpacity>
          </View>

          {goals.map((goal) => {
            const progress = getProgressPercentage(goal.currentAmount, goal.targetAmount);
            const daysLeft = getDaysUntilTarget(goal.targetDate);
            const dailyAmount = getTimeToGoal(goal.currentAmount, goal.targetAmount, goal.targetDate);

            return (
              <Card key={goal.id} style={styles.goalCard}>
                <Card.Content>
                  <View style={styles.goalHeader}>
                    <View style={styles.goalInfo}>
                      <View style={[styles.goalIcon, { backgroundColor: goal.color + '20' }]}>
                        <Text style={{ fontSize: 24 }}>{goal.icon}</Text>
                      </View>
                      <View style={styles.goalDetails}>
                        <Text style={styles.goalTitle}>{goal.title}</Text>
                        <Text style={styles.goalCategory}>{goal.category}</Text>
                      </View>
                    </View>
                    <Chip
                      mode="outlined"
                      style={[styles.categoryChip, { borderColor: goal.color }]}
                      textStyle={{ color: goal.color }}
                    >
                      {Math.round(progress)}%
                    </Chip>
                  </View>

                  <View style={styles.goalAmounts}>
                    <Text style={styles.goalAmount}>
                      {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}
                    </Text>
                    <Text style={styles.goalRemaining}>
                      Faltan {formatCurrency(goal.targetAmount - goal.currentAmount)}
                    </Text>
                  </View>

                  <ProgressBar
                    progress={progress / 100}
                    color={goal.color}
                    style={styles.goalProgress}
                  />

                  <View style={styles.goalFooter}>
                    <View style={styles.goalDate}>
                      <Text style={{ fontSize: 16, color: colors.textSecondary, marginRight: 4 }}>⏰</Text>
                      <Text style={styles.goalDateText}>
                        {daysLeft > 0 ? `${daysLeft} días restantes` : 'Meta alcanzada'}
                      </Text>
                    </View>
                    {daysLeft > 0 && (
                      <Text style={styles.dailyAmount}>
                        ${dailyAmount.toFixed(0)}/día
                      </Text>
                    )}
                  </View>
                </Card.Content>
              </Card>
            );
          })}
        </View>

        {/* Desafíos */}
        <View style={styles.challengesContainer}>
          <Text style={styles.sectionTitle}>Desafíos de Ahorro</Text>
          
          {challenges.map((challenge) => (
            <Card key={challenge.id} style={styles.challengeCard}>
              <Card.Content>
                <View style={styles.challengeHeader}>
                  <View style={styles.challengeInfo}>
                    <Text style={styles.challengeTitle}>{challenge.title}</Text>
                    <Text style={styles.challengeDescription}>{challenge.description}</Text>
                  </View>
                  <View style={styles.challengeReward}>
                    <Text style={{ fontSize: 20, color: colors.warning }}>⭐</Text>
                    <Text style={styles.rewardText}>+{challenge.reward}</Text>
                  </View>
                </View>

                <View style={styles.challengeProgress}>
                  <ProgressBar
                    progress={challenge.progress / challenge.maxProgress}
                    color={challenge.color}
                    style={styles.challengeProgressBar}
                  />
                  <Text style={styles.challengeProgressText}>
                    {challenge.progress} / {challenge.maxProgress}
                  </Text>
                </View>

                {challenge.isCompleted && (
                  <View style={styles.completedBadge}>
                    <Text style={{ fontSize: 20, color: colors.success }}>✅</Text>
                    <Text style={styles.completedText}>¡Completado!</Text>
                  </View>
                )}
              </Card.Content>
            </Card>
          ))}
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
              ➕ Agregar Ahorro
            </Button>
            <Button
              mode="outlined"
              onPress={() => {}}
              style={styles.actionButton}
            >
              🏁 Nueva Meta
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
              onPress={() => navigation.navigate('Presupuesto')}
              style={styles.navButton}
            >
              💰 Presupuesto
            </Button>
          </View>
        </View>
      </ScrollView>

      <FAB
        style={styles.fab}
        label="+"
        onPress={() => {
          // Navegar a agregar ahorro
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
    padding: spacing.lg,
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
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.md,
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
  overallProgress: {
    height: 8,
    borderRadius: borderRadius.sm,
  },
  goalsContainer: {
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
  goalCard: {
    marginBottom: spacing.md,
    borderRadius: borderRadius.md,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  goalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  goalIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  goalDetails: {
    flex: 1,
  },
  goalTitle: {
    ...typography.body,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  goalCategory: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  categoryChip: {
    height: 28,
  },
  goalAmounts: {
    marginBottom: spacing.sm,
  },
  goalAmount: {
    ...typography.h3,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  goalRemaining: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  goalProgress: {
    height: 8,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.sm,
  },
  goalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goalDate: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  goalDateText: {
    ...typography.caption,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  dailyAmount: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
  challengesContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  challengeCard: {
    marginBottom: spacing.md,
    borderRadius: borderRadius.md,
  },
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  challengeInfo: {
    flex: 1,
  },
  challengeTitle: {
    ...typography.body,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  challengeDescription: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  challengeReward: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rewardText: {
    ...typography.body,
    color: colors.warning,
    fontWeight: '600',
    marginLeft: spacing.xs,
  },
  challengeProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  challengeProgressBar: {
    flex: 1,
    height: 6,
    borderRadius: borderRadius.sm,
    marginRight: spacing.sm,
  },
  challengeProgressText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.success + '10',
    padding: spacing.sm,
    borderRadius: borderRadius.sm,
  },
  completedText: {
    ...typography.caption,
    color: colors.success,
    fontWeight: '600',
    marginLeft: spacing.xs,
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

export default SavingsScreen;
