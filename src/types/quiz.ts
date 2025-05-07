export type QuizTopic = 'physics' | 'mathematics' | 'chemistry' | 'programming';

export type QuizTopicInfo = {
  id: QuizTopic;
  name: string;
  description: string;
  icon: string;
  color: string;
};

export type QuizMode = 'timed-question' | 'timed-quiz' | 'untimed';

export interface QuizSettings {
  topic: QuizTopic;
  numQuestions: number;
  mode: QuizMode;
  timePerQuestion?: number; // in seconds
  totalTime?: number; // in seconds
}

export interface QuizQuestion {
  id: string;
  topic: QuizTopic;
  question: string;
  options: string[];
  correctAnswer: number; // index of the correct answer
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuizAnswer {
  questionId: string;
  selectedOption: number | null;
  isCorrect: boolean;
  timeSpent: number; // in seconds
}

export interface QuizResult {
  settings: QuizSettings;
  answers: QuizAnswer[];
  totalScore: number;
  totalTime: number;
  completedAt: Date;
}