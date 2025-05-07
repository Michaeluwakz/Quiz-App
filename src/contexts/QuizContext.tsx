import React, { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react';
import { 
  QuizSettings, 
  QuizQuestion, 
  QuizAnswer, 
  QuizResult,
  QuizTopic 
} from '../types/quiz';
import { getQuestionsByTopic } from '../data/questions';

interface QuizContextType {
  // Quiz setup
  settings: QuizSettings | null;
  configureQuiz: (settings: QuizSettings) => Promise<void>;
  
  // Quiz state
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  isQuizStarted: boolean;
  isQuizFinished: boolean;
  isLoading: boolean;
  
  // Quiz actions
  startQuiz: () => void;
  goToNextQuestion: () => void;
  goToPreviousQuestion: () => boolean;
  submitAnswer: (questionId: string, selectedOption: number) => void;
  finishQuiz: () => void;
  resetQuiz: () => void;
  
  // Quiz data
  answers: QuizAnswer[];
  currentAnswer: QuizAnswer | undefined;
  result: QuizResult | null;
  
  // Timer related
  timeSpent: number;
  updateTimeSpent: (time: number) => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<QuizSettings | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [timeSpent, setTimeSpent] = useState(0);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const configureQuiz = useCallback(async (newSettings: QuizSettings) => {
    setIsLoading(true);
    try {
      setSettings(newSettings);
      const fetchedQuestions = await getQuestionsByTopic(newSettings.topic, newSettings.numQuestions);
      setQuestions(fetchedQuestions);
      
      const initialAnswers = Array(newSettings.numQuestions).fill(null).map((_, idx) => ({
        questionId: fetchedQuestions[idx].id,
        selectedOption: null,
        isCorrect: false,
        timeSpent: 0,
      }));
      
      setAnswers(initialAnswers);
      setIsQuizStarted(false);
      setIsQuizFinished(false);
      setCurrentQuestionIndex(0);
      setTimeSpent(0);
      setResult(null);
    } catch (error) {
      console.error('Failed to configure quiz:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const startQuiz = useCallback(() => {
    if (questions.length > 0) {
      setIsQuizStarted(true);
    }
  }, [questions]);

  const goToNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      return true;
    }
    return false;
  }, [currentQuestionIndex, questions.length]);

  const goToPreviousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      return true;
    }
    return false;
  }, [currentQuestionIndex]);

  const submitAnswer = useCallback((questionId: string, selectedOption: number) => {
    setAnswers(prevAnswers => {
      const newAnswers = [...prevAnswers];
      const questionIndex = questions.findIndex(q => q.id === questionId);
      
      if (questionIndex >= 0) {
        const question = questions[questionIndex];
        newAnswers[questionIndex] = {
          questionId,
          selectedOption,
          isCorrect: question.correctAnswer === selectedOption,
          timeSpent: 0, // Will be updated separately
        };
      }
      
      return newAnswers;
    });
  }, [questions]);

  const updateTimeSpent = useCallback((time: number) => {
    setTimeSpent(time);
    
    setAnswers(prevAnswers => {
      const newAnswers = [...prevAnswers];
      if (newAnswers[currentQuestionIndex]) {
        newAnswers[currentQuestionIndex] = {
          ...newAnswers[currentQuestionIndex],
          timeSpent: time,
        };
      }
      return newAnswers;
    });
  }, [currentQuestionIndex]);

  const finishQuiz = useCallback(() => {
    if (!settings) return;
    
    const totalScore = answers.filter(a => a.isCorrect).length;
    const totalTime = answers.reduce((total, answer) => total + answer.timeSpent, 0);
    
    const quizResult: QuizResult = {
      settings,
      answers,
      totalScore,
      totalTime,
      completedAt: new Date(),
    };
    
    setResult(quizResult);
    setIsQuizFinished(true);
  }, [settings, answers]);

  const resetQuiz = useCallback(() => {
    setSettings(null);
    setQuestions([]);
    setAnswers([]);
    setIsQuizStarted(false);
    setIsQuizFinished(false);
    setCurrentQuestionIndex(0);
    setTimeSpent(0);
    setResult(null);
  }, []);

  const currentAnswer = useMemo(() => {
    return answers[currentQuestionIndex];
  }, [answers, currentQuestionIndex]);

  const value = {
    settings,
    configureQuiz,
    questions,
    currentQuestionIndex,
    isQuizStarted,
    isQuizFinished,
    isLoading,
    startQuiz,
    goToNextQuestion,
    goToPreviousQuestion,
    submitAnswer,
    finishQuiz,
    resetQuiz,
    answers,
    currentAnswer,
    result,
    timeSpent,
    updateTimeSpent,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

export const useQuiz = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

export { QuizProvider, useQuiz }