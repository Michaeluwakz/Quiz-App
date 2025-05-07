import React from 'react';
import { useQuiz } from '../contexts/QuizContext';
import ResultsSummary from '../components/ResultsSummary';

const Results: React.FC = () => {
  const { result, resetQuiz, configureQuiz, startQuiz } = useQuiz();

  if (!result) return null;

  const handleRetry = () => {
    // Restart the same quiz
    if (result.settings) {
      configureQuiz(result.settings);
      startQuiz();
    }
  };

  const handleNewQuiz = () => {
    // Start a completely new quiz
    resetQuiz();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <ResultsSummary 
        result={result} 
        onRestart={handleRetry} 
        onNewQuiz={handleNewQuiz} 
      />
    </div>
  );
};

export default Results;