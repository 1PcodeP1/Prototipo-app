import { ApiService } from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface EducationalContent {
  id: string;
  title: string;
  description: string;
  content: string;
  category: 'basics' | 'budgeting' | 'savings' | 'investing' | 'debt' | 'advanced';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedReadTime: number; // en minutos
  icon: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Quiz {
  id: string;
  contentId: string;
  title: string;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface UserProgress {
  contentId: string;
  completed: boolean;
  completedAt?: string;
  quizScore?: number;
  timeSpent: number; // en minutos
}

export class EducationService {
  private static readonly STORAGE_KEYS = {
    EDUCATIONAL_CONTENT: 'educational_content',
    USER_PROGRESS: 'user_progress',
    COMPLETED_QUIZZES: 'completed_quizzes',
  };

  // === CONTENIDO EDUCATIVO ===
  static async getEducationalContent(): Promise<EducationalContent[]> {
    try {
      // return await ApiService.get<EducationalContent[]>('/education/content');
      
      const stored = await AsyncStorage.getItem(this.STORAGE_KEYS.EDUCATIONAL_CONTENT);
      if (stored) {
        return JSON.parse(stored);
      }

      const defaultContent: EducationalContent[] = [
        {
          id: '1',
          title: 'Fundamentos de las Finanzas Personales',
          description: 'Aprende los conceptos básicos para manejar tu dinero de manera inteligente.',
          content: `
# Fundamentos de las Finanzas Personales

## ¿Qué son las finanzas personales?

Las finanzas personales son la gestión de tu dinero, incluyendo ingresos, gastos, ahorros e inversiones. Es la base para alcanzar estabilidad financiera y cumplir tus metas.

## Conceptos Clave:

### 1. Ingresos
Todo el dinero que recibes, ya sea por trabajo, inversiones, o otras fuentes.

### 2. Gastos
Todo el dinero que sales de tu bolsillo para cubrir necesidades y deseos.

### 3. Presupuesto
Un plan que te ayuda a controlar tus ingresos y gastos.

### 4. Ahorros
Dinero que guardas para metas futuras o emergencias.

### 5. Inversiones
Dinero que pones a trabajar para generar más dinero en el futuro.

## Regla del 50/30/20
- **50%** para necesidades (vivienda, comida, transporte)
- **30%** para deseos (entretenimiento, hobbies)
- **20%** para ahorros e inversiones

## Primeros Pasos:
1. Calcula tus ingresos totales
2. Lista todos tus gastos
3. Identifica dónde puedes ahorrar
4. Crea un fondo de emergencia
5. Establece metas financieras claras

¡Recuerda: La disciplina y constancia son clave para el éxito financiero!
          `,
          category: 'basics',
          difficulty: 'beginner',
          estimatedReadTime: 8,
          icon: '💰',
          tags: ['fundamentos', 'presupuesto', 'ahorro'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Cómo Crear un Presupuesto Efectivo',
          description: 'Domina el arte de planificar tus gastos y maximizar tus ahorros.',
          content: `
# Cómo Crear un Presupuesto Efectivo

## ¿Por qué necesitas un presupuesto?

Un presupuesto te da control sobre tu dinero y te ayuda a:
- Evitar gastos innecesarios
- Alcanzar tus metas financieras
- Reducir el estrés financiero
- Prepararte para emergencias

## Pasos para crear tu presupuesto:

### 1. Calcula tus ingresos netos
Suma todos tus ingresos después de impuestos.

### 2. Lista tus gastos fijos
- Renta/hipoteca
- Servicios públicos
- Seguros
- Pagos de deudas mínimos

### 3. Identifica gastos variables
- Comida
- Transporte
- Entretenimiento
- Ropa

### 4. Asigna dinero para ahorros
Trata el ahorro como un gasto fijo.

### 5. Ajusta según sea necesario
Si gastas más de lo que ganas, busca áreas donde reducir.

## Métodos de presupuesto:

### Método 50/30/20
- 50% necesidades
- 30% deseos
- 20% ahorros/deudas

### Presupuesto base cero
Cada peso tiene un propósito específico.

### Método de sobres
Usa efectivo en sobres para cada categoría.

## Consejos para mantener tu presupuesto:
- Revísalo semanalmente
- Usa apps para seguimiento
- Sé realista con tus metas
- Permite algo de flexibilidad
- Celebra tus logros

¡Un buen presupuesto es tu mejor herramienta financiera!
          `,
          category: 'budgeting',
          difficulty: 'beginner',
          estimatedReadTime: 12,
          icon: '📊',
          tags: ['presupuesto', 'planificación', 'control'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '3',
          title: 'Estrategias de Ahorro Inteligente',
          description: 'Descubre técnicas probadas para ahorrar más dinero sin sacrificar tu calidad de vida.',
          content: `
# Estrategias de Ahorro Inteligente

## ¿Por qué ahorrar?

Ahorrar te proporciona:
- Seguridad financiera
- Libertad para tomar decisiones
- Capacidad de aprovechar oportunidades
- Tranquilidad mental

## Estrategias de Ahorro:

### 1. Pago Automático
Configura transferencias automáticas a tu cuenta de ahorros.

### 2. Regla de las 24 horas
Espera 24 horas antes de comprar algo no esencial.

### 3. Método de la moneda
Guarda todas las monedas al final del día.

### 4. Desafío de las 52 semanas
Ahorra $1 la primera semana, $2 la segunda, y así sucesivamente.

### 5. Reducción de gastos hormiga
Identifica pequeños gastos diarios que suman mucho.

## Tipos de Ahorros:

### Fondo de Emergencia
- 3-6 meses de gastos básicos
- Fácil acceso
- Cuenta separada

### Ahorros para Metas
- Vacaciones
- Auto nuevo
- Educación
- Casa

### Ahorros para Retiro
- Pensión
- Inversiones a largo plazo

## Consejos para Ahorrar Más:

### En Casa:
- Reduce servicios innecesarios
- Cocina en casa más seguido
- Usa electrodomésticos eficientes

### En Compras:
- Compara precios
- Usa cupones y descuentos
- Compra en temporada baja

### En Transporte:
- Usa transporte público
- Comparte viajes
- Mantén tu vehículo

### En Entretenimiento:
- Busca actividades gratuitas
- Aprovecha promociones
- Suscripciones compartidas

## Errores Comunes:
- No automatizar el ahorro
- Tener metas poco realistas
- No separar tipos de ahorro
- Tocar los ahorros frecuentemente

¡Recuerda: Ahorrar es un hábito que se construye día a día!
          `,
          category: 'savings',
          difficulty: 'intermediate',
          estimatedReadTime: 10,
          icon: '🏦',
          tags: ['ahorro', 'estrategias', 'metas'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '4',
          title: 'Introducción a las Inversiones',
          description: 'Comienza tu viaje de inversión con conocimientos sólidos y estrategias probadas.',
          content: `
# Introducción a las Inversiones

## ¿Qué es invertir?

Invertir es poner tu dinero a trabajar para generar más dinero a través del tiempo, aprovechando el poder del interés compuesto.

## Conceptos Básicos:

### Riesgo vs Rendimiento
- Mayor riesgo = mayor rendimiento potencial
- Menor riesgo = menor rendimiento esperado

### Diversificación
No pongas todos los huevos en una canasta.

### Horizonte de Tiempo
- Corto plazo: menos de 2 años
- Mediano plazo: 2-10 años
- Largo plazo: más de 10 años

## Tipos de Inversiones:

### Renta Fija
- Cetes
- Bonos gubernamentales
- Pagarés bancarios
- **Riesgo:** Bajo | **Rendimiento:** Moderado

### Renta Variable
- Acciones individuales
- Fondos de inversión
- ETFs
- **Riesgo:** Alto | **Rendimiento:** Alto potencial

### Bienes Raíces
- Compra directa de propiedades
- REITs (fideicomisos inmobiliarios)
- **Riesgo:** Moderado | **Rendimiento:** Moderado-Alto

### Materias Primas
- Oro
- Plata
- Petróleo
- **Riesgo:** Alto | **Rendimiento:** Variable

## Principios de Inversión Exitosa:

### 1. Empieza Temprano
El tiempo es tu mejor aliado gracias al interés compuesto.

### 2. Invierte Regularmente
Promediar costos reduce el riesgo.

### 3. Diversifica
Reparte tu dinero entre diferentes tipos de activos.

### 4. Mantén la Calma
No te dejes llevar por emociones del mercado.

### 5. Edúcate Constantemente
Conocimiento = mejores decisiones.

## Estrategias para Principiantes:

### Dollar Cost Averaging
Invierte la misma cantidad regularmente, sin importar el precio.

### Fondos Indexados
Siguen un índice del mercado, ofrecen diversificación automática.

### Regla del 1%
Nunca arriesgues más del 1% de tu capital en una sola inversión especulativa.

## Errores Comunes:
- Invertir dinero que necesitas pronto
- No diversificar
- Intentar timing del mercado
- Dejarse llevar por emociones
- No tener plan de inversión

## Antes de Invertir:
1. Ten un fondo de emergencia
2. Paga deudas de alto interés
3. Define tus objetivos
4. Conoce tu tolerancia al riesgo
5. Edúcate sobre las opciones

¡Recuerda: La mejor inversión es en tu educación financiera!
          `,
          category: 'investing',
          difficulty: 'intermediate',
          estimatedReadTime: 15,
          icon: '📈',
          tags: ['inversiones', 'riesgo', 'diversificación', 'rentabilidad'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '5',
          title: 'Manejo Inteligente de Deudas',
          description: 'Aprende estrategias efectivas para salir de deudas y mantener un historial crediticio saludable.',
          content: `
# Manejo Inteligente de Deudas

## ¿Qué son las deudas?

Las deudas son dinero que debes a otros. Pueden ser herramientas útiles o cargas financieras, dependiendo de cómo las manejes.

## Tipos de Deudas:

### Deuda Buena
Inversiones que pueden aumentar tu patrimonio:
- Hipoteca de vivienda
- Préstamos educativos
- Créditos para negocios

### Deuda Mala
Gastos que pierden valor:
- Tarjetas de crédito (consumo)
- Préstamos para autos de lujo
- Préstamos para vacaciones

## Estrategias para Pagar Deudas:

### Método Bola de Nieve
1. Lista deudas de menor a mayor saldo
2. Paga mínimos en todas
3. Pone dinero extra en la más pequeña
4. Repite con la siguiente

**Ventaja:** Motivación psicológica

### Método Avalancha
1. Lista deudas de mayor a menor tasa de interés
2. Paga mínimos en todas
3. Pone dinero extra en la de mayor interés
4. Repite con la siguiente

**Ventaja:** Ahorro en intereses

### Consolidación de Deudas
Combina múltiples deudas en una sola con mejor tasa.

## Cómo Evitar Deudas Problemáticas:

### Con Tarjetas de Crédito:
- Paga el total cada mes
- No uses más del 30% del límite
- Evita cash advance
- Lee los términos y condiciones

### Principios Generales:
- No pidas prestado para gastos corrientes
- Compara tasas de interés
- Lee toda la letra pequeña
- Ten un plan de pago antes de endeudarte

## Mejorando tu Historial Crediticio:

### Factores que Afectan tu Score:
- Historial de pagos (35%)
- Utilización de crédito (30%)
- Longitud del historial (15%)
- Nuevas cuentas (10%)
- Mix de créditos (10%)

### Consejos para Mejorar:
- Paga siempre a tiempo
- Mantén balances bajos
- No cierres cuentas antiguas
- Revisa tu reporte crediticio regularmente

## Negociación con Acreedores:

### Si tienes Problemas para Pagar:
1. Contacta al acreedor inmediatamente
2. Explica tu situación honestamente
3. Propón un plan de pago realista
4. Consigue todo por escrito

### Opciones de Negociación:
- Reducción de tasa de interés
- Plan de pagos modificado
- Quita parcial del saldo
- Programa de alivio temporal

## Señales de Alerta:
- Solo pagas mínimos
- Usas una tarjeta para pagar otra
- Tu deuda total excede 40% de tus ingresos
- Pierdes el sueño por las deudas

## Plan de Acción para Deudas:
1. Lista todas tus deudas
2. Calcula el total
3. Elige una estrategia de pago
4. Crea un presupuesto estricto
5. Busca ingresos adicionales si es necesario
6. Evita nuevas deudas

¡Recuerda: Salir de deudas requiere disciplina, pero es completamente posible!
          `,
          category: 'debt',
          difficulty: 'intermediate',
          estimatedReadTime: 13,
          icon: '💳',
          tags: ['deudas', 'crédito', 'estrategias', 'historial'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];

      await this.saveEducationalContent(defaultContent);
      return defaultContent;
    } catch (error) {
      console.error('Error getting educational content:', error);
      return [];
    }
  }

  static async getContentById(id: string): Promise<EducationalContent | null> {
    try {
      const content = await this.getEducationalContent();
      return content.find(c => c.id === id) || null;
    } catch (error) {
      console.error('Error getting content by id:', error);
      return null;
    }
  }

  static async getContentByCategory(category: EducationalContent['category']): Promise<EducationalContent[]> {
    try {
      const content = await this.getEducationalContent();
      return content.filter(c => c.category === category);
    } catch (error) {
      console.error('Error getting content by category:', error);
      return [];
    }
  }

  private static async saveEducationalContent(content: EducationalContent[]): Promise<void> {
    await AsyncStorage.setItem(this.STORAGE_KEYS.EDUCATIONAL_CONTENT, JSON.stringify(content));
  }

  // === PROGRESO DEL USUARIO ===
  static async getUserProgress(): Promise<UserProgress[]> {
    try {
      const stored = await AsyncStorage.getItem(this.STORAGE_KEYS.USER_PROGRESS);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error getting user progress:', error);
      return [];
    }
  }

  static async markContentAsCompleted(contentId: string, timeSpent: number = 0): Promise<void> {
    try {
      const progress = await this.getUserProgress();
      const existingIndex = progress.findIndex(p => p.contentId === contentId);
      
      const newProgress: UserProgress = {
        contentId,
        completed: true,
        completedAt: new Date().toISOString(),
        timeSpent,
      };

      if (existingIndex !== -1) {
        progress[existingIndex] = newProgress;
      } else {
        progress.push(newProgress);
      }

      await AsyncStorage.setItem(this.STORAGE_KEYS.USER_PROGRESS, JSON.stringify(progress));
    } catch (error) {
      console.error('Error marking content as completed:', error);
    }
  }

  static async getCompletionRate(): Promise<number> {
    try {
      const content = await this.getEducationalContent();
      const progress = await this.getUserProgress();
      
      if (content.length === 0) return 0;
      
      const completedCount = progress.filter(p => p.completed).length;
      return (completedCount / content.length) * 100;
    } catch (error) {
      console.error('Error getting completion rate:', error);
      return 0;
    }
  }

  // === QUIZZES ===
  static async getQuizForContent(contentId: string): Promise<Quiz | null> {
    try {
      // Aquí podrías tener quizzes específicos para cada contenido
      // Por ahora retornamos un quiz genérico
      const quiz: Quiz = {
        id: `quiz_${contentId}`,
        contentId,
        title: 'Evaluación de Conocimientos',
        questions: [
          {
            id: '1',
            question: '¿Cuál es la regla básica del 50/30/20 en finanzas personales?',
            options: [
              '50% gastos, 30% ahorros, 20% inversiones',
              '50% necesidades, 30% deseos, 20% ahorros/inversiones',
              '50% ingresos, 30% gastos, 20% deudas',
              '50% inversiones, 30% gastos, 20% ahorros'
            ],
            correctAnswer: 1,
            explanation: 'La regla 50/30/20 sugiere destinar 50% de los ingresos a necesidades, 30% a deseos y 20% a ahorros e inversiones.'
          },
          {
            id: '2',
            question: '¿Qué es más importante al crear un presupuesto?',
            options: [
              'Tener el software más caro',
              'Ser realista con tus ingresos y gastos',
              'Copiar el presupuesto de otra persona',
              'Solo enfocarse en los gastos grandes'
            ],
            correctAnswer: 1,
            explanation: 'Un presupuesto efectivo debe basarse en números reales de tus ingresos y gastos para ser útil y sostenible.'
          }
        ]
      };

      return quiz;
    } catch (error) {
      console.error('Error getting quiz:', error);
      return null;
    }
  }

  static async submitQuizResult(quizId: string, score: number): Promise<void> {
    try {
      const results = await AsyncStorage.getItem(this.STORAGE_KEYS.COMPLETED_QUIZZES);
      const completedQuizzes = results ? JSON.parse(results) : {};
      
      completedQuizzes[quizId] = {
        score,
        completedAt: new Date().toISOString(),
      };

      await AsyncStorage.setItem(this.STORAGE_KEYS.COMPLETED_QUIZZES, JSON.stringify(completedQuizzes));
    } catch (error) {
      console.error('Error submitting quiz result:', error);
    }
  }
}