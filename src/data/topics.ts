import { QuizTopicInfo } from '../types/quiz';

export const quizTopics: QuizTopicInfo[] = [
  {
    id: 'physics',
    name: 'Physics',
    description: 'Test your knowledge of mechanics, thermodynamics, electromagnetism, and quantum physics.',
    icon: 'atom',
    color: '#8B5CF6', // purple
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    description: 'Challenge yourself with algebra, calculus, geometry, and statistical problems.',
    icon: 'square-equal',
    color: '#EC4899', // pink
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    description: 'Explore organic chemistry, periodic table, chemical reactions, and molecular structures.',
    icon: 'flask-conical',
    color: '#10B981', // green
  },
  {
    id: 'programming',
    name: 'Programming',
    description: 'Solve problems related to algorithms, data structures, and programming languages.',
    icon: 'code',
    color: '#F97316', // orange
  },
];