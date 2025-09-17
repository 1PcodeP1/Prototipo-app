import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Card, Button, Chip, ProgressBar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { EducationStackScreenProps } from '../../types/navigation';
import { useEducation } from '../../hooks/useEducation';
import { colors, typography, spacing, borderRadius } from '../../styles/theme';

const EducationScreen = () => {
  const navigation = useNavigation<EducationStackScreenProps<'EducationMain'>['navigation']>();
  const { 
    content, 
    loading, 
    error, 
    markAsCompleted, 
    isContentCompleted, 
    getCompletionRate,
  } = useEducation();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { key: 'basics', label: 'Fundamentos', icon: '🎯' },
    { key: 'budgeting', label: 'Presupuesto', icon: '📊' },
    { key: 'savings', label: 'Ahorros', icon: '🏦' },
    { key: 'investing', label: 'Inversiones', icon: '📈' },
    { key: 'debt', label: 'Deudas', icon: '💳' },
    { key: 'advanced', label: 'Avanzado', icon: '🎓' },
  ];

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'Principiante';
      case 'intermediate': return 'Intermedio';
      case 'advanced': return 'Avanzado';
      default: return difficulty;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return colors.success;
      case 'intermediate': return colors.warning;
      case 'advanced': return colors.error;
      default: return colors.textSecondary;
    }
  };

  const handleMarkAsCompleted = async (contentId: string) => {
    try {
      await markAsCompleted(contentId, 10);
      Alert.alert('¡Completado!', 'Has completado este contenido educativo.');
    } catch (error) {
      Alert.alert('Error', 'No se pudo marcar como completado');
    }
  };

  const completionRate = getCompletionRate();
  const filteredContent = content.filter(item => {
    return !selectedCategory || item.category === selectedCategory;
  });

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text>Cargando contenido educativo...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <Button mode="contained" onPress={() => {}}>
          Reintentar
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.headerContainer}>
          <Card style={styles.progressCard}>
            <Card.Content>
              <Text style={styles.progressTitle}>Tu Progreso Educativo</Text>
              <View style={styles.progressInfo}>
                <Text style={styles.progressText}>
                  {Math.round(completionRate)}% Completado
                </Text>
                <ProgressBar
                  progress={completionRate / 100}
                  color={colors.primary}
                  style={styles.progressBar}
                />
              </View>
            </Card.Content>
          </Card>
        </View>

        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>Categorías</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoryScroll}
          >
            <Chip
              mode={selectedCategory === null ? 'flat' : 'outlined'}
              selected={selectedCategory === null}
              onPress={() => setSelectedCategory(null)}
              style={styles.categoryChip}
            >
              Todos
            </Chip>
            {categories.map((category) => (
              <Chip
                key={category.key}
                mode={selectedCategory === category.key ? 'flat' : 'outlined'}
                selected={selectedCategory === category.key}
                onPress={() => setSelectedCategory(category.key)}
                style={styles.categoryChip}
              >
                {category.icon} {category.label}
              </Chip>
            ))}
          </ScrollView>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.sectionTitle}>Contenido Educativo</Text>
          {filteredContent.map((item) => {
            const isCompleted = isContentCompleted(item.id);
            const difficultyColor = getDifficultyColor(item.difficulty);

            return (
              <Card key={item.id} style={styles.contentCard}>
                <Card.Content>
                  <View style={styles.contentHeader}>
                    <View style={styles.contentTitleRow}>
                      <Text style={styles.contentTitle}>{item.title}</Text>
                      {isCompleted && (
                        <Text style={styles.completedIcon}>✅</Text>
                      )}
                    </View>
                    <Chip
                      mode="outlined"
                      style={[styles.difficultyChip, { borderColor: difficultyColor }]}
                      textStyle={{ color: difficultyColor }}
                    >
                      {getDifficultyLabel(item.difficulty)}
                    </Chip>
                  </View>

                  <Text style={styles.contentDescription}>
                    {item.description}
                  </Text>

                  <View style={styles.contentMeta}>
                    <Text style={styles.metaText}>
                      📚 {item.category} • ⏱️ {item.estimatedReadTime} min
                    </Text>
                  </View>

                  <View style={styles.contentActions}>
                    <Button
                      mode="contained"
                      onPress={() => {
                        Alert.alert('Contenido', `Abrir: ${item.title}`);
                      }}
                      style={styles.actionButton}
                    >
                      {isCompleted ? 'Revisar' : 'Estudiar'}
                    </Button>
                    {!isCompleted && (
                      <Button
                        mode="outlined"
                        onPress={() => handleMarkAsCompleted(item.id)}
                        style={styles.actionButton}
                      >
                        Completar
                      </Button>
                    )}
                  </View>
                </Card.Content>
              </Card>
            );
          })}
        </View>

        <View style={styles.navigationContainer}>
          <Text style={styles.sectionTitle}>Navegación</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  errorText: {
    color: colors.error,
    marginBottom: spacing.md,
  },
  headerContainer: {
    padding: spacing.lg,
  },
  progressCard: {
    borderRadius: borderRadius.lg,
    elevation: 4,
  },
  progressTitle: {
    ...typography.h3,
    marginBottom: spacing.md,
    color: colors.primary,
  },
  progressInfo: {
    alignItems: 'center',
  },
  progressText: {
    ...typography.body,
    marginBottom: spacing.sm,
    fontWeight: '600',
  },
  progressBar: {
    width: '100%',
    height: 8,
    borderRadius: borderRadius.sm,
  },
  categoriesContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  categoryScroll: {
    flexDirection: 'row',
  },
  categoryChip: {
    marginRight: spacing.sm,
  },
  contentContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  contentCard: {
    marginBottom: spacing.md,
    borderRadius: borderRadius.md,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  contentTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  contentTitle: {
    ...typography.h3,
    fontWeight: '600',
    flex: 1,
  },
  completedIcon: {
    fontSize: 20,
    marginLeft: spacing.sm,
  },
  difficultyChip: {
    height: 28,
  },
  contentDescription: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  contentMeta: {
    marginBottom: spacing.md,
  },
  metaText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  contentActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },
  navigationContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  navButton: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },
});

export default EducationScreen;
