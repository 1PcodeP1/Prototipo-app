import { useState, useEffect, useCallback } from 'react';
import { 
  EducationService, 
  EducationalContent, 
  UserProgress, 
  Quiz 
} from '../services/education';

export const useEducation = () => {
  const [content, setContent] = useState<EducationalContent[]>([]);
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [contentData, progressData] = await Promise.all([
        EducationService.getEducationalContent(),
        EducationService.getUserProgress(),
      ]);
      
      setContent(contentData);
      setProgress(progressData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading education data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const markAsCompleted = useCallback(async (contentId: string, timeSpent: number = 0) => {
    try {
      await EducationService.markContentAsCompleted(contentId, timeSpent);
      
      // Actualizar progreso local
      setProgress(prev => {
        const existingIndex = prev.findIndex(p => p.contentId === contentId);
        const newProgress: UserProgress = {
          contentId,
          completed: true,
          completedAt: new Date().toISOString(),
          timeSpent,
        };

        if (existingIndex !== -1) {
          const updated = [...prev];
          updated[existingIndex] = newProgress;
          return updated;
        } else {
          return [...prev, newProgress];
        }
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error marking content as completed');
      throw err;
    }
  }, []);

  const getContentById = useCallback((id: string) => {
    return content.find(c => c.id === id) || null;
  }, [content]);

  const getContentByCategory = useCallback((category: EducationalContent['category']) => {
    return content.filter(c => c.category === category);
  }, [content]);

  const getContentByDifficulty = useCallback((difficulty: EducationalContent['difficulty']) => {
    return content.filter(c => c.difficulty === difficulty);
  }, [content]);

  const isContentCompleted = useCallback((contentId: string) => {
    return progress.some(p => p.contentId === contentId && p.completed);
  }, [progress]);

  const getCompletionRate = useCallback(() => {
    if (content.length === 0) return 0;
    const completedCount = progress.filter(p => p.completed).length;
    return (completedCount / content.length) * 100;
  }, [content, progress]);

  const getCompletedContent = useCallback(() => {
    const completedIds = progress.filter(p => p.completed).map(p => p.contentId);
    return content.filter(c => completedIds.includes(c.id));
  }, [content, progress]);

  const getPendingContent = useCallback(() => {
    const completedIds = progress.filter(p => p.completed).map(p => p.contentId);
    return content.filter(c => !completedIds.includes(c.id));
  }, [content, progress]);

  const getTotalReadTime = useCallback(() => {
    return content.reduce((total, c) => total + c.estimatedReadTime, 0);
  }, [content]);

  const getCompletedReadTime = useCallback(() => {
    const completedIds = progress.filter(p => p.completed).map(p => p.contentId);
    return content
      .filter(c => completedIds.includes(c.id))
      .reduce((total, c) => total + c.estimatedReadTime, 0);
  }, [content, progress]);

  const getRecommendedContent = useCallback(() => {
    // Recomienda contenido basado en lo que ya se ha completado
    const completedIds = progress.filter(p => p.completed).map(p => p.contentId);
    const pending = content.filter(c => !completedIds.includes(c.id));
    
    // Priorizar por dificultad (empezar con básico)
    return pending.sort((a, b) => {
      const difficultyOrder = { 'beginner': 1, 'intermediate': 2, 'advanced': 3 };
      return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
    });
  }, [content, progress]);

  const refreshData = useCallback(() => {
    loadData();
  }, [loadData]);

  return {
    content,
    progress,
    loading,
    error,
    markAsCompleted,
    getContentById,
    getContentByCategory,
    getContentByDifficulty,
    isContentCompleted,
    getCompletionRate,
    getCompletedContent,
    getPendingContent,
    getTotalReadTime,
    getCompletedReadTime,
    getRecommendedContent,
    refreshData,
  };
};

export const useEducationContent = (contentId: string) => {
  const [content, setContent] = useState<EducationalContent | null>(null);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadContent = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [contentData, quizData] = await Promise.all([
        EducationService.getContentById(contentId),
        EducationService.getQuizForContent(contentId),
      ]);
      
      setContent(contentData);
      setQuiz(quizData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading content');
    } finally {
      setLoading(false);
    }
  }, [contentId]);

  useEffect(() => {
    if (contentId) {
      loadContent();
    }
  }, [contentId, loadContent]);

  const submitQuizResult = useCallback(async (score: number) => {
    if (!quiz) return;
    
    try {
      await EducationService.submitQuizResult(quiz.id, score);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error submitting quiz result');
      throw err;
    }
  }, [quiz]);

  return {
    content,
    quiz,
    loading,
    error,
    submitQuizResult,
  };
};

export const useEducationProgress = () => {
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [completionRate, setCompletionRate] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProgress = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [progressData, rate] = await Promise.all([
        EducationService.getUserProgress(),
        EducationService.getCompletionRate(),
      ]);
      
      setProgress(progressData);
      setCompletionRate(rate);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading progress');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  const getProgressForContent = useCallback((contentId: string) => {
    return progress.find(p => p.contentId === contentId);
  }, [progress]);

  const isCompleted = useCallback((contentId: string) => {
    const contentProgress = getProgressForContent(contentId);
    return contentProgress?.completed || false;
  }, [getProgressForContent]);

  const getCompletedCount = useCallback(() => {
    return progress.filter(p => p.completed).length;
  }, [progress]);

  const getTotalTimeSpent = useCallback(() => {
    return progress.reduce((total, p) => total + (p.timeSpent || 0), 0);
  }, [progress]);

  const getAverageTimePerContent = useCallback(() => {
    const completed = progress.filter(p => p.completed);
    if (completed.length === 0) return 0;
    
    const totalTime = completed.reduce((total, p) => total + (p.timeSpent || 0), 0);
    return totalTime / completed.length;
  }, [progress]);

  const getRecentlyCompleted = useCallback((limit: number = 5) => {
    return progress
      .filter(p => p.completed && p.completedAt)
      .sort((a, b) => new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime())
      .slice(0, limit);
  }, [progress]);

  return {
    progress,
    completionRate,
    loading,
    error,
    getProgressForContent,
    isCompleted,
    getCompletedCount,
    getTotalTimeSpent,
    getAverageTimePerContent,
    getRecentlyCompleted,
    refreshProgress: loadProgress,
  };
};