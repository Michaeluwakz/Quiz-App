import React from 'react';
import { QuizProvider, useQuiz } from './contexts/QuizContext';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Results from './pages/Results';

const AppContent: React.FC = () => {
  const { isQuizStarted, isQuizFinished } = useQuiz();

  return (
    <div className="min-h-screen bg-gray-50">
      {!isQuizStarted && !isQuizFinished && <Home />}
      {isQuizStarted && !isQuizFinished && <Quiz />}
      {isQuizFinished && <Results />}
    </div>
  );
};

function App() {
  return (
    <QuizProvider>
      <AppContent />
    </QuizProvider>
  );
}

export default App;