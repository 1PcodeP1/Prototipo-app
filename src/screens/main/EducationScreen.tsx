import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Card, Button, Chip, ProgressBar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
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

// Obtener valores responsive fuera del componente
const spacing = getSpacing;
const fontSizes = getFontSizes();
const componentSizes = getComponentSizes();
const gridColumns = getGridColumns();

const EducationScreen = () => {
  const navigation = useNavigation();
  const [completedItems, setCompletedItems] = useState<string[]>([]);

  const mockContent = [
    {
      id: '1',
      title: 'Fundamentos del Presupuesto Personal',
      description: 'Aprende los conceptos básicos para crear y mantener un presupuesto personal efectivo.',
      category: 'basics',
      estimatedReadTime: 15,
    },
    {
      id: '2', 
      title: 'Estrategias de Ahorro',
      description: 'Descubre técnicas para maximizar tus ahorros y alcanzar tus metas financieras.',
      category: 'savings',
      estimatedReadTime: 20,
    },
  ];

  const handleMarkAsCompleted = (contentId: string) => {
    if (!completedItems.includes(contentId)) {
      setCompletedItems(prev => [...prev, contentId]);
      Alert.alert('¡Completado!', 'Has completado este contenido educativo.');
    }
  };

  const getCompletionRate = () => {
    return (completedItems.length / mockContent.length) * 100;
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.headerContainer}>
          <Card style={styles.progressCard}>
            <Card.Content>
              <Text style={styles.progressTitle}>Tu Progreso Educativo</Text>
              <Text style={styles.progressText}>
                {Math.round(getCompletionRate())}% Completado
              </Text>
              <ProgressBar
                progress={getCompletionRate() / 100}
                color="#1976d2"
                style={styles.progressBar}
              />
            </Card.Content>
          </Card>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.sectionTitle}>Contenido Disponible</Text>
          {mockContent.map((item) => {
            const isCompleted = completedItems.includes(item.id);

            return (
              <Card key={item.id} style={styles.contentCard}>
                <Card.Content>
                  <View style={styles.contentHeader}>
                    <Text style={styles.contentTitle}>{item.title}</Text>
                    {isCompleted && <Text style={styles.completedIcon}>✅</Text>}
                  </View>
                  
                  <Text style={styles.contentDescription}>
                    {item.description}
                  </Text>

                  <Text style={styles.metaText}>
                    📚 {item.category} • ⏱️ {item.estimatedReadTime} min
                  </Text>

                  <View style={styles.contentActions}>
                    <Button
                      mode="contained"
                      onPress={() => Alert.alert('Contenido', `Abrir: ${item.title}`)}
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
          <Button
            mode="contained"
            onPress={() => navigation.goBack()}
            style={styles.navButton}
          >
            🏠 Volver al Dashboard
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: getResponsiveStyle({
    base: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
  }),
  scrollView: {
    flex: 1,
  },
  headerContainer: getResponsiveStyle({
    base: {
      padding: spacing.lg,
    },
    small: {
      padding: spacing.md,
    },
    tablet: {
      padding: spacing.xl,
      maxWidth: scaleWidth(600),
      alignSelf: 'center',
    },
  }),
  progressCard: getResponsiveStyle({
    base: {
      borderRadius: componentSizes.cardBorderRadius,
      elevation: 4,
    },
    tablet: {
      elevation: 6,
    },
  }),
  progressTitle: getResponsiveStyle({
    base: {
      fontSize: fontSizes.title,
      fontWeight: 'bold',
      marginBottom: spacing.md,
      color: '#1976d2',
    },
    tablet: {
      fontSize: fontSizes.headline,
      textAlign: 'center',
    },
  }),
  progressText: getResponsiveStyle({
    base: {
      fontSize: fontSizes.body,
      marginBottom: spacing.sm,
      fontWeight: '600',
      textAlign: 'center',
    },
    tablet: {
      fontSize: fontSizes.subheading,
    },
  }),
  progressBar: getResponsiveStyle({
    base: {
      width: '100%',
      height: componentSizes.progressBarHeight,
      borderRadius: componentSizes.cardBorderRadius / 2,
    },
  }),
  sectionTitle: getResponsiveStyle({
    base: {
      fontSize: fontSizes.title,
      fontWeight: 'bold',
      color: '#1976d2',
      marginBottom: spacing.md,
    },
    tablet: {
      fontSize: fontSizes.headline,
      textAlign: 'center',
    },
  }),
  contentContainer: getResponsiveStyle({
    base: {
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.lg,
    },
    small: {
      paddingHorizontal: spacing.md,
    },
    tablet: {
      paddingHorizontal: spacing.xl,
      maxWidth: scaleWidth(800),
      alignSelf: 'center',
    },
  }),
  contentCard: getResponsiveStyle({
    base: {
      marginBottom: spacing.md,
      borderRadius: componentSizes.cardBorderRadius,
    },
    tablet: {
      marginBottom: spacing.lg,
      elevation: 6,
    },
  }),
  contentHeader: getResponsiveStyle({
    base: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.sm,
    },
  }),
  contentTitle: getResponsiveStyle({
    base: {
      fontSize: fontSizes.subheading,
      fontWeight: '600',
      flex: 1,
    },
    tablet: {
      fontSize: fontSizes.title,
    },
  }),
  completedIcon: getResponsiveStyle({
    base: {
      fontSize: fontSizes.title,
      marginLeft: spacing.sm,
    },
    tablet: {
      fontSize: fontSizes.headline,
    },
  }),
  contentDescription: getResponsiveStyle({
    base: {
      fontSize: fontSizes.body,
      color: '#666',
      marginBottom: spacing.md,
      lineHeight: fontSizes.body * 1.4,
    },
    tablet: {
      fontSize: fontSizes.subheading,
      lineHeight: fontSizes.subheading * 1.4,
    },
  }),
  metaText: getResponsiveStyle({
    base: {
      fontSize: fontSizes.caption,
      color: '#999',
      marginBottom: spacing.md,
    },
    tablet: {
      fontSize: fontSizes.body,
    },
  }),
  contentActions: getResponsiveStyle({
    base: {
      flexDirection: screenData.isTablet ? 'row' : 'column',
      justifyContent: screenData.isTablet ? 'space-around' : 'center',
      gap: spacing.sm,
    },
    small: {
      flexDirection: 'column',
    },
  }),
  actionButton: getResponsiveStyle({
    base: {
      flex: screenData.isTablet ? 1 : 0,
      marginHorizontal: screenData.isTablet ? spacing.xs : 0,
      marginVertical: screenData.isTablet ? 0 : spacing.xs,
      minHeight: componentSizes.buttonHeight,
    },
  }),
  navigationContainer: getResponsiveStyle({
    base: {
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.xl,
    },
    small: {
      paddingHorizontal: spacing.md,
    },
    tablet: {
      paddingHorizontal: spacing.xl,
      maxWidth: scaleWidth(600),
      alignSelf: 'center',
    },
  }),
  navButton: getResponsiveStyle({
    base: {
      backgroundColor: '#1976d2',
      minHeight: componentSizes.buttonHeight,
    },
    tablet: {
      minHeight: componentSizes.buttonHeight * 1.2,
    },
  }),
});

export default EducationScreen;