import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Card, Button, Chip, ProgressBar } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, typography, spacing, borderRadius } from '../../styles/theme';

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  isCompleted: boolean;
  progress: number;
  color: string;
  icon: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  unlockedDate?: string;
  color: string;
}

const EducationScreen = () => {
  const [lessons] = useState<Lesson[]>([
    {
      id: '1',
      title: 'Introducción a las finanzas personales',
      description: 'Aprende los conceptos básicos para manejar tu dinero',
      duration: 15,
      difficulty: 'beginner',
      category: 'Básico',
      isCompleted: true,
      progress: 100,
      color: colors.success,
      icon: '🏫',
    },
    {
      id: '2',
      title: 'Cómo crear un presupuesto efectivo',
      description: 'Técnicas para planificar y controlar tus gastos',
      duration: 20,
      difficulty: 'beginner',
      category: 'Presupuesto',
      isCompleted: false,
      progress: 60,
      color: colors.info,
      icon: '💰',
    },
    {
      id: '3',
      title: 'Inversiones para principiantes',
      description: 'Conoce las opciones de inversión más seguras',
      duration: 25,
      difficulty: 'intermediate',
      category: 'Inversiones',
      isCompleted: false,
      progress: 0,
      color: colors.warning,
      icon: '📈',
    },
    {
      id: '4',
      title: 'Planificación de la jubilación',
      description: 'Estrategias para asegurar tu futuro financiero',
      duration: 30,
      difficulty: 'advanced',
      category: 'Jubilación',
      isCompleted: false,
      progress: 0,
      color: colors.accent,
      icon: '👴',
    },
  ]);

  const [achievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'Primer paso',
      description: 'Completa tu primera lección',
      icon: '🏆',
      isUnlocked: true,
      unlockedDate: '2024-01-10',
      color: colors.success,
    },
    {
      id: '2',
      title: 'Estudiante dedicado',
      description: 'Completa 5 lecciones',
      icon: '🏫',
      isUnlocked: false,
      color: colors.info,
    },
    {
      id: '3',
      title: 'Experto en presupuesto',
      description: 'Completa todas las lecciones de presupuesto',
      icon: '💰',
      isUnlocked: false,
      color: colors.warning,
    },
    {
      id: '4',
      title: 'Maestro financiero',
      description: 'Completa todas las lecciones',
      icon: '⭐',
      isUnlocked: false,
      color: colors.accent,
    },
  ]);

  const completedLessons = lessons.filter(lesson => lesson.isCompleted).length;
  const totalLessons = lessons.length;
  const overallProgress = (completedLessons / totalLessons) * 100;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return colors.success;
      case 'intermediate': return colors.warning;
      case 'advanced': return colors.error;
      default: return colors.textSecondary;
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'Principiante';
      case 'intermediate': return 'Intermedio';
      case 'advanced': return 'Avanzado';
      default: return difficulty;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Progreso general */}
        <View style={styles.progressContainer}>
          <Card style={styles.progressCard}>
            <Card.Content>
              <View style={styles.progressHeader}>
                <Text style={styles.progressTitle}>Mi Progreso</Text>
                <Text style={styles.progressPercentage}>
                  {Math.round(overallProgress)}%
                </Text>
              </View>
              <ProgressBar
                progress={overallProgress / 100}
                color={colors.primary}
                style={styles.progressBar}
              />
              <Text style={styles.progressText}>
                {completedLessons} de {totalLessons} lecciones completadas
              </Text>
            </Card.Content>
          </Card>
        </View>

        {/* Lecciones */}
        <View style={styles.lessonsContainer}>
          <Text style={styles.sectionTitle}>Lecciones Disponibles</Text>
          
          {lessons.map((lesson) => (
            <Card key={lesson.id} style={styles.lessonCard}>
              <Card.Content>
                <View style={styles.lessonHeader}>
                  <View style={styles.lessonInfo}>
                    <View style={[styles.lessonIcon, { backgroundColor: lesson.color + '20' }]}>
                      <Text style={{ fontSize: 24 }}>{lesson.icon}</Text>
                    </View>
                    <View style={styles.lessonDetails}>
                      <Text style={styles.lessonTitle}>{lesson.title}</Text>
                      <Text style={styles.lessonDescription}>{lesson.description}</Text>
                    </View>
                  </View>
                  {lesson.isCompleted && (
                    <Text style={{ fontSize: 24, color: colors.success }}>✅</Text>
                  )}
                </View>

                <View style={styles.lessonMeta}>
                  <Chip
                    mode="outlined"
                    style={[styles.difficultyChip, { borderColor: getDifficultyColor(lesson.difficulty) }]}
                    textStyle={{ color: getDifficultyColor(lesson.difficulty) }}
                  >
                    {getDifficultyText(lesson.difficulty)}
                  </Chip>
                  <Chip
                    mode="outlined"
                    style={styles.categoryChip}
                    textStyle={{ color: colors.textSecondary }}
                  >
                    {lesson.category}
                  </Chip>
                  <Text style={styles.durationText}>{lesson.duration} min</Text>
                </View>

                {!lesson.isCompleted && lesson.progress > 0 && (
                  <View style={styles.lessonProgress}>
                    <ProgressBar
                      progress={lesson.progress / 100}
                      color={lesson.color}
                      style={styles.lessonProgressBar}
                    />
                    <Text style={styles.lessonProgressText}>
                      {lesson.progress}% completado
                    </Text>
                  </View>
                )}

                <Button
                  mode={lesson.isCompleted ? "outlined" : "contained"}
                  onPress={() => {}}
                  style={styles.lessonButton}
                  icon={lesson.isCompleted ? "check" : "play-arrow"}
                >
                  {lesson.isCompleted ? 'Completada' : 'Comenzar'}
                </Button>
              </Card.Content>
            </Card>
          ))}
        </View>

        {/* Logros */}
        <View style={styles.achievementsContainer}>
          <Text style={styles.sectionTitle}>Logros</Text>
          
          {achievements.map((achievement) => (
            <Card 
              key={achievement.id} 
              style={[
                styles.achievementCard,
                achievement.isUnlocked && styles.unlockedAchievement
              ]}
            >
              <Card.Content>
                <View style={styles.achievementHeader}>
                  <View style={styles.achievementInfo}>
                    <View style={[
                      styles.achievementIcon,
                      { 
                        backgroundColor: achievement.isUnlocked 
                          ? achievement.color + '20' 
                          : colors.border 
                      }
                    ]}>
                      <Text 
                        style={{ 
                          fontSize: 24, 
                          opacity: achievement.isUnlocked ? 1 : 0.5 
                        }}
                      >
                        {achievement.icon}
                      </Text>
                    </View>
                    <View style={styles.achievementDetails}>
                      <Text style={[
                        styles.achievementTitle,
                        !achievement.isUnlocked && styles.lockedText
                      ]}>
                        {achievement.title}
                      </Text>
                      <Text style={[
                        styles.achievementDescription,
                        !achievement.isUnlocked && styles.lockedText
                      ]}>
                        {achievement.description}
                      </Text>
                      {achievement.isUnlocked && achievement.unlockedDate && (
                        <Text style={styles.unlockedDate}>
                          Desbloqueado el {achievement.unlockedDate}
                        </Text>
                      )}
                    </View>
                  </View>
                  {achievement.isUnlocked && (
                    <Text style={{ fontSize: 20, color: colors.warning }}>⭐</Text>
                  )}
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>

        {/* Estadísticas de aprendizaje */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Estadísticas</Text>
          <Card style={styles.statsCard}>
            <Card.Content>
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={{ fontSize: 24, color: colors.primary }}>🏫</Text>
                  <Text style={styles.statValue}>{completedLessons}</Text>
                  <Text style={styles.statLabel}>Lecciones</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={{ fontSize: 24, color: colors.info }}>⏰</Text>
                  <Text style={styles.statValue}>
                    {lessons.reduce((sum, lesson) => 
                      lesson.isCompleted ? sum + lesson.duration : sum, 0
                    )}
                  </Text>
                  <Text style={styles.statLabel}>Minutos</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={{ fontSize: 24, color: colors.warning }}>🏆</Text>
                  <Text style={styles.statValue}>
                    {achievements.filter(a => a.isUnlocked).length}
                  </Text>
                  <Text style={styles.statLabel}>Logros</Text>
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
  progressContainer: {
    padding: spacing.lg,
  },
  progressCard: {
    borderRadius: borderRadius.lg,
    elevation: 4,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  progressTitle: {
    ...typography.h3,
    color: colors.primary,
  },
  progressPercentage: {
    ...typography.h2,
    color: colors.primary,
    fontWeight: 'bold',
  },
  progressBar: {
    height: 8,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.sm,
  },
  progressText: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  lessonsContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  lessonCard: {
    marginBottom: spacing.md,
    borderRadius: borderRadius.md,
  },
  lessonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  lessonInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  lessonIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  lessonDetails: {
    flex: 1,
  },
  lessonTitle: {
    ...typography.body,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  lessonDescription: {
    ...typography.caption,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  lessonMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  difficultyChip: {
    height: 28,
    marginRight: spacing.sm,
  },
  categoryChip: {
    height: 28,
    marginRight: spacing.sm,
  },
  durationText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  lessonProgress: {
    marginBottom: spacing.sm,
  },
  lessonProgressBar: {
    height: 6,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.xs,
  },
  lessonProgressText: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  lessonButton: {
    borderRadius: borderRadius.md,
  },
  achievementsContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  achievementCard: {
    marginBottom: spacing.md,
    borderRadius: borderRadius.md,
    opacity: 0.6,
  },
  unlockedAchievement: {
    opacity: 1,
    elevation: 2,
  },
  achievementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  achievementInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  achievementDetails: {
    flex: 1,
  },
  achievementTitle: {
    ...typography.body,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  achievementDescription: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  unlockedDate: {
    ...typography.small,
    color: colors.success,
    fontStyle: 'italic',
  },
  lockedText: {
    color: colors.textSecondary,
  },
  statsContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  statsCard: {
    borderRadius: borderRadius.lg,
    elevation: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    ...typography.h2,
    fontWeight: 'bold',
    marginTop: spacing.xs,
    marginBottom: spacing.xs,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});

export default EducationScreen;
