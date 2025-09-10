import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Card, SegmentedButtons } from 'react-native-paper';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, typography, spacing, borderRadius } from '../../styles/theme';

const screenWidth = Dimensions.get('window').width;

interface ChartData {
  labels: string[];
  datasets: Array<{
    data: number[];
    color?: (opacity: number) => string;
    strokeWidth?: number;
  }>;
}

interface PieData {
  name: string;
  population: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
}

const StatisticsScreen = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Datos de gastos por categoría
  const categoryData: PieData[] = [
    {
      name: 'Alimentación',
      population: 35,
      color: colors.categories.food,
      legendFontColor: colors.text,
      legendFontSize: 12,
    },
    {
      name: 'Transporte',
      population: 20,
      color: colors.categories.transport,
      legendFontColor: colors.text,
      legendFontSize: 12,
    },
    {
      name: 'Entretenimiento',
      population: 15,
      color: colors.categories.entertainment,
      legendFontColor: colors.text,
      legendFontSize: 12,
    },
    {
      name: 'Salud',
      population: 10,
      color: colors.categories.health,
      legendFontColor: colors.text,
      legendFontSize: 12,
    },
    {
      name: 'Otros',
      population: 20,
      color: colors.categories.other,
      legendFontColor: colors.text,
      legendFontSize: 12,
    },
  ];

  // Datos de ingresos vs gastos
  const incomeExpenseData: ChartData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        data: [3000, 3200, 2800, 3500, 3000, 3300],
        color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: [1800, 2000, 2200, 1900, 2100, 1800],
        color: (opacity = 1) => `rgba(244, 67, 54, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  // Datos de ahorros mensuales
  const savingsData: ChartData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        data: [500, 800, 600, 1000, 700, 900],
        color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
        strokeWidth: 3,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: colors.surface,
    backgroundGradientFrom: colors.surface,
    backgroundGradientTo: colors.surface,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(26, 26, 46, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(102, 102, 102, ${opacity})`,
    style: {
      borderRadius: borderRadius.md,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: colors.primary,
    },
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString('es-ES', { minimumFractionDigits: 2 })}`;
  };

  const getTotalExpenses = () => {
    return categoryData.reduce((sum, item) => sum + item.population, 0);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Selector de período */}
        <View style={styles.periodSelector}>
          <SegmentedButtons
            value={selectedPeriod}
            onValueChange={setSelectedPeriod}
            buttons={[
              { value: 'week', label: 'Semana' },
              { value: 'month', label: 'Mes' },
              { value: 'year', label: 'Año' },
            ]}
            style={styles.segmentedButtons}
          />
        </View>

        {/* Resumen financiero */}
        <View style={styles.summaryContainer}>
          <Card style={styles.summaryCard}>
            <Card.Content>
              <Text style={styles.summaryTitle}>Resumen Financiero</Text>
              <View style={styles.summaryStats}>
                <View style={styles.statItem}>
                  <Icon name="trending-up" size={24} color={colors.success} />
                  <Text style={styles.statValue}>{formatCurrency(3200)}</Text>
                  <Text style={styles.statLabel}>Ingresos</Text>
                </View>
                <View style={styles.statItem}>
                  <Icon name="trending-down" size={24} color={colors.error} />
                  <Text style={styles.statValue}>{formatCurrency(1800)}</Text>
                  <Text style={styles.statLabel}>Gastos</Text>
                </View>
                <View style={styles.statItem}>
                  <Icon name="savings" size={24} color={colors.info} />
                  <Text style={styles.statValue}>{formatCurrency(1400)}</Text>
                  <Text style={styles.statLabel}>Ahorros</Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        </View>

        {/* Gráfico de ingresos vs gastos */}
        <View style={styles.chartContainer}>
          <Card style={styles.chartCard}>
            <Card.Content>
              <Text style={styles.chartTitle}>Ingresos vs Gastos</Text>
              <LineChart
                data={incomeExpenseData}
                width={screenWidth - 80}
                height={220}
                chartConfig={chartConfig}
                bezier
                style={styles.chart}
              />
              <View style={styles.legend}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, { backgroundColor: colors.success }]} />
                  <Text style={styles.legendText}>Ingresos</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, { backgroundColor: colors.error }]} />
                  <Text style={styles.legendText}>Gastos</Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        </View>

        {/* Gráfico de gastos por categoría */}
        <View style={styles.chartContainer}>
          <Card style={styles.chartCard}>
            <Card.Content>
              <Text style={styles.chartTitle}>Gastos por Categoría</Text>
              <PieChart
                data={categoryData}
                width={screenWidth - 80}
                height={220}
                chartConfig={chartConfig}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                center={[10, 0]}
                style={styles.chart}
              />
            </Card.Content>
          </Card>
        </View>

        {/* Gráfico de ahorros */}
        <View style={styles.chartContainer}>
          <Card style={styles.chartCard}>
            <Card.Content>
              <Text style={styles.chartTitle}>Evolución de Ahorros</Text>
              <LineChart
                data={savingsData}
                width={screenWidth - 80}
                height={220}
                chartConfig={chartConfig}
                bezier
                style={styles.chart}
              />
            </Card.Content>
          </Card>
        </View>

        {/* Análisis de tendencias */}
        <View style={styles.analysisContainer}>
          <Text style={styles.sectionTitle}>Análisis de Tendencias</Text>
          
          <Card style={styles.analysisCard}>
            <Card.Content>
              <View style={styles.analysisItem}>
                <Icon name="trending-up" size={24} color={colors.success} />
                <View style={styles.analysisContent}>
                  <Text style={styles.analysisTitle}>Tendencia Positiva</Text>
                  <Text style={styles.analysisDescription}>
                    Tus ahorros han aumentado un 15% este mes comparado con el anterior
                  </Text>
                </View>
              </View>
            </Card.Content>
          </Card>

          <Card style={styles.analysisCard}>
            <Card.Content>
              <View style={styles.analysisItem}>
                <Icon name="warning" size={24} color={colors.warning} />
                <View style={styles.analysisContent}>
                  <Text style={styles.analysisTitle}>Atención Requerida</Text>
                  <Text style={styles.analysisDescription}>
                    Has gastado un 20% más en entretenimiento este mes
                  </Text>
                </View>
              </View>
            </Card.Content>
          </Card>

          <Card style={styles.analysisCard}>
            <Card.Content>
              <View style={styles.analysisItem}>
                <Icon name="lightbulb" size={24} color={colors.info} />
                <View style={styles.analysisContent}>
                  <Text style={styles.analysisTitle}>Recomendación</Text>
                  <Text style={styles.analysisDescription}>
                    Considera reducir los gastos en alimentación para alcanzar tu meta de ahorro
                  </Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        </View>

        {/* Métricas clave */}
        <View style={styles.metricsContainer}>
          <Text style={styles.sectionTitle}>Métricas Clave</Text>
          <Card style={styles.metricsCard}>
            <Card.Content>
              <View style={styles.metricsGrid}>
                <View style={styles.metricItem}>
                  <Text style={styles.metricValue}>43%</Text>
                  <Text style={styles.metricLabel}>Tasa de ahorro</Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={styles.metricValue}>$1,200</Text>
                  <Text style={styles.metricLabel}>Ahorro promedio/mes</Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={styles.metricValue}>8.5</Text>
                  <Text style={styles.metricLabel}>Puntuación financiera</Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={styles.metricValue}>12</Text>
                  <Text style={styles.metricLabel}>Meses consecutivos</Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
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
  periodSelector: {
    padding: spacing.lg,
    paddingBottom: spacing.md,
  },
  segmentedButtons: {
    backgroundColor: colors.surface,
  },
  summaryContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
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
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    ...typography.h3,
    fontWeight: '600',
    marginTop: spacing.xs,
    marginBottom: spacing.xs,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  chartContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  chartCard: {
    borderRadius: borderRadius.lg,
    elevation: 4,
  },
  chartTitle: {
    ...typography.h3,
    marginBottom: spacing.md,
    color: colors.primary,
    textAlign: 'center',
  },
  chart: {
    marginVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.md,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.md,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: spacing.xs,
  },
  legendText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  analysisContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  analysisCard: {
    marginBottom: spacing.md,
    borderRadius: borderRadius.md,
  },
  analysisItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  analysisContent: {
    flex: 1,
    marginLeft: spacing.md,
  },
  analysisTitle: {
    ...typography.body,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  analysisDescription: {
    ...typography.caption,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  metricsContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  metricsCard: {
    borderRadius: borderRadius.lg,
    elevation: 4,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  metricItem: {
    alignItems: 'center',
    width: '45%',
    marginBottom: spacing.md,
  },
  metricValue: {
    ...typography.h2,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  metricLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default StatisticsScreen;
