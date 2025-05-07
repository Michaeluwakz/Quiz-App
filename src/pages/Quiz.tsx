import React, { useEffect, useState } from 'react';
import { useQuiz } from '../contexts/QuizContext';
import QuizCard from '../components/QuizCard';
import ProgressBar from '../components/ProgressBar';
import Timer from '../components/Timer';
import { ArrowLeft, Clock } from 'lucide-react';

const Quiz: React.FC = () => {
  const { 
    questions, 
    currentQuestionIndex, 
    submitAnswer, 
    goToNextQuestion, 
    finishQuiz, 
    settings,
    answers,
    updateTimeSpent
  } = useQuiz();

  const [showSolution, setShowSolution] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timePerQ, setTimePerQ] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestionIndex];
  
  // Determine if we should use timer and what type
  const isTimedQuestion = settings?.mode === 'timed-question';
  const isTimedQuiz = settings?.mode === 'timed-quiz';
  
  // Set up timers
  useEffect(() => {
    if (isTimedQuestion && settings?.timePerQuestion) {
      setTimePerQ(settings.timePerQuestion);
    }
  }, [isTimedQuestion, settings]);

  // Update total elapsed time periodically
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Update context with time spent for each question
  useEffect(() => {
    updateTimeSpent(elapsedTime);
  }, [elapsedTime, updateTimeSpent]);

  const handleSelectAnswer = (index: number) => {
    if (currentQuestion) {
      submitAnswer(currentQuestion.id, index);
      // Show the solution after selecting an answer
      setShowSolution(true);
    }
  };

  const handleNext = () => {
    setShowSolution(false);
    
    // Reset timer for timed questions
    if (isTimedQuestion && settings?.timePerQuestion) {
      setTimePerQ(settings.timePerQuestion);
    }
    
    const canGoNext = goToNextQuestion();
    if (!canGoNext) {
      // If we can't go to the next question, we're at the end
      finishQuiz();
    }
    
    // Reset elapsed time for the new question
    setElapsedTime(0);
  };

  const handleTimeUp = () => {
    // If time's up and no answer selected, auto-proceed to next question
    if (currentAnswer.selectedOption === null) {
      // Submit null answer or a default (e.g., -1) to indicate timeout
      submitAnswer(currentQuestion.id, -1);
      handleNext();
    }
  };

  const handleQuizTimeUp = () => {
    // When the entire quiz time is up, finish the quiz
    finishQuiz();
  };

  if (!currentQuestion) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with back button and timer */}
        <div className="flex justify-between items-center mb-6">
          <button 
            className="flex items-center text-gray-600 hover:text-gray-900"
            onClick={() => finishQuiz()}
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            Finish Quiz
          </button>
          
          {isTimedQuiz && settings?.totalTime && (
            <Timer 
              initialTime={settings.totalTime} 
              onTimeUp={handleQuizTimeUp}
              size="lg"
            />
          )}
        </div>
        
        {/* Progress bar */}
        <ProgressBar 
          currentQuestion={currentQuestionIndex + 1} 
          totalQuestions={questions.length} 
        />
        
        {/* Quiz card */}
        <QuizCard
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          selectedAnswer={currentAnswer?.selectedOption || null}
          showSolution={showSolution}
          timePerQuestion={isTimedQuestion ? timePerQ : undefined}
          onSelectAnswer={handleSelectAnswer}
          onTimeUp={handleTimeUp}
          onNext={handleNext}
        />
      </div>
    </div>
  );
};

export default Quiz;