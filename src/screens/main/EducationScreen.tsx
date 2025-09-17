import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Card, Button, Chip, ProgressBar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

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
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  headerContainer: {
    padding: 16,
  },
  progressCard: {
    borderRadius: 12,
    elevation: 4,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1976d2',
  },
  progressText: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '600',
    textAlign: 'center',
  },
  progressBar: {
    width: '100%',
    height: 8,
    borderRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 12,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  contentCard: {
    marginBottom: 12,
    borderRadius: 8,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  completedIcon: {
    fontSize: 20,
    marginLeft: 8,
  },
  contentDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  metaText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 12,
  },
  contentActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  navigationContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  navButton: {
    backgroundColor: '#1976d2',
  },
});

export default EducationScreen;