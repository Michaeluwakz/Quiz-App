import { QuizQuestion } from '../types/quiz';
import { generateQuestions } from '../lib/openrouter';

// Fallback questions in case API fails
export const sampleQuestions: QuizQuestion[] = [
  // Physics questions
  {
    id: 'physics-1',
    topic: 'physics',
    question: 'What is the SI unit of force?',
    options: ['Newton', 'Joule', 'Watt', 'Pascal'],
    correctAnswer: 0,
    explanation: 'The Newton (N) is the SI unit of force. It is defined as the force needed to accelerate a mass of one kilogram at a rate of one meter per second squared.',
    difficulty: 'easy',
  },
  {
    id: 'physics-2',
    topic: 'physics',
    question: 'Which of the following is a vector quantity?',
    options: ['Mass', 'Temperature', 'Velocity', 'Time'],
    correctAnswer: 2,
    explanation: 'Velocity is a vector quantity because it has both magnitude (speed) and direction. Mass, temperature, and time are scalar quantities as they only have magnitude.',
    difficulty: 'easy',
  },
  {
    id: 'physics-3',
    topic: 'physics',
    question: 'According to Einstein\'s theory of relativity, what happens to time as an object approaches the speed of light?',
    options: ['Time speeds up', 'Time slows down', 'Time stops completely', 'Time becomes irrelevant'],
    correctAnswer: 1,
    explanation: 'According to Einstein\'s theory of relativity, time dilation occurs when an object moves at relativistic speeds. As an object approaches the speed of light, time appears to slow down for that object relative to a stationary observer.',
    difficulty: 'medium',
  },
  
  // Mathematics questions
  {
    id: 'mathematics-1',
    topic: 'mathematics',
    question: 'What is the derivative of ln(x)?',
    options: ['1/x', 'x', 'e^x', 'ln(x)'],
    correctAnswer: 0,
    explanation: 'The derivative of ln(x) is 1/x. This can be derived using the chain rule and the fact that the derivative of ln(x) with respect to x is 1/x.',
    difficulty: 'medium',
  },
  {
    id: 'mathematics-2',
    topic: 'mathematics',
    question: 'What is the value of π (pi) to two decimal places?',
    options: ['3.14', '3.16', '3.12', '3.18'],
    correctAnswer: 0,
    explanation: 'The value of π (pi) to two decimal places is 3.14. The more precise value is approximately 3.14159265359...',
    difficulty: 'easy',
  },
  {
    id: 'mathematics-3',
    topic: 'mathematics',
    question: 'If f(x) = x² and g(x) = 2x + 1, what is (f ∘ g)(x)?',
    options: ['2x² + x', '4x² + 4x + 1', '2x² + 2x + 1', '4x² + 1'],
    correctAnswer: 1,
    explanation: '(f ∘ g)(x) = f(g(x)) = f(2x + 1) = (2x + 1)² = 4x² + 4x + 1',
    difficulty: 'medium',
  },
  
  // Chemistry questions
  {
    id: 'chemistry-1',
    topic: 'chemistry',
    question: 'What is the pH of a neutral solution at 25°C?',
    options: ['0', '7', '14', '1'],
    correctAnswer: 1,
    explanation: 'A neutral solution has a pH of 7 at 25°C. Solutions with a pH less than 7 are acidic, while solutions with a pH greater than 7 are basic or alkaline.',
    difficulty: 'easy',
  },
  {
    id: 'chemistry-2',
    topic: 'chemistry',
    question: 'Which element has the highest electronegativity?',
    options: ['Oxygen', 'Nitrogen', 'Fluorine', 'Chlorine'],
    correctAnswer: 2,
    explanation: 'Fluorine has the highest electronegativity value (3.98 on the Pauling scale) of all elements. Electronegativity generally increases as you move right and up in the periodic table.',
    difficulty: 'medium',
  },
  {
    id: 'chemistry-3',
    topic: 'chemistry',
    question: 'What type of hybridization is present in the carbon atoms of benzene?',
    options: ['sp', 'sp²', 'sp³', 'sp³d'],
    correctAnswer: 1,
    explanation: 'The carbon atoms in benzene undergo sp² hybridization. This creates a planar hexagonal structure with delocalized π electrons above and below the plane of the ring.',
    difficulty: 'hard',
  },
  
  // Programming questions
  {
    id: 'programming-1',
    topic: 'programming',
    question: 'Which data structure operates on a Last In, First Out (LIFO) principle?',
    options: ['Queue', 'Stack', 'Linked List', 'Array'],
    correctAnswer: 1,
    explanation: 'A Stack operates on the Last In, First Out (LIFO) principle. The last element added to the stack is the first one to be removed.',
    difficulty: 'easy',
  },
  {
    id: 'programming-2',
    topic: 'programming',
    question: 'What is the time complexity of a binary search algorithm?',
    options: ['O(n)', 'O(n²)', 'O(log n)', 'O(n log n)'],
    correctAnswer: 2,
    explanation: 'The time complexity of binary search is O(log n). Binary search repeatedly divides the search interval in half, which results in a logarithmic time complexity.',
    difficulty: 'medium',
  },
  {
    id: 'programming-3',
    topic: 'programming',
    question: 'Which of the following is NOT a programming paradigm?',
    options: ['Object-oriented programming', 'Functional programming', 'Procedural programming', 'Sequential programming'],
    correctAnswer: 3,
    explanation: 'Sequential programming is not a recognized programming paradigm. The main programming paradigms include object-oriented, functional, procedural, and declarative programming.',
    difficulty: 'medium',
  },
];

export const getQuestionsByTopic = async (topic: string, count: number): Promise<QuizQuestion[]> => {
  try {
    const generatedQuestions = await generateQuestions(topic, count);
    return generatedQuestions;
  } catch (error) {
    console.error('Failed to generate questions, using fallback:', error);
    // Use sample questions as fallback
    const topicQuestions = sampleQuestions.filter(q => q.topic === topic);
    const shuffled = [...topicQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
};