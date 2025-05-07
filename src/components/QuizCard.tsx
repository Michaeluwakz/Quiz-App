import React, { useState } from 'react';
import { QuizQuestion } from '../types/quiz';
import AnswerOption from './AnswerOption';
import Timer from './Timer';
import { ArrowRight, HelpCircle } from 'lucide-react';

interface QuizCardProps {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  showSolution: boolean;
  timePerQuestion?: number;
  onSelectAnswer: (index: number) => void;
  onTimeUp?: () => void;
  onNext: () => void;
}

const QuizCard: React.FC<QuizCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  showSolution,
  timePerQuestion,
  onSelectAnswer,
  onTimeUp,
  onNext,
}) => {
  const [showExplanation, setShowExplanation] = useState(false);

  const handleOptionSelect = (index: number) => {
    if (selectedAnswer === null && !showSolution) {
      onSelectAnswer(index);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-2xl mx-auto transition-all duration-300 transform">
      <div className="p-6">
        {/* Header with Question Number and Timer */}
        <div className="flex items-center justify-between mb-6">
          <div className="bg-purple-100 text-purple-800 py-1 px-3 rounded-full text-sm font-medium">
            Question {questionNumber} of {totalQuestions}
          </div>
          
          {timePerQuestion && !showSolution && (
            <Timer 
              initialTime={timePerQuestion} 
              onTimeUp={onTimeUp} 
              size="md"
            />
          )}
        </div>

        {/* Question */}
        <h3 className="text-xl font-semibold mb-6 leading-relaxed">{question.question}</h3>

        {/* Answer Options */}
        <div className="space-y-2 mb-6">
          {question.options.map((option, index) => (
            <AnswerOption
              key={index}
              index={index}
              text={option}
              selected={selectedAnswer === index}
              correct={question.correctAnswer === index}
              showResult={showSolution}
              onSelect={() => handleOptionSelect(index)}
            />
          ))}
        </div>

        {/* Solution/Explanation */}
        {showSolution && (
          <div className="mt-6">
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="flex items-center text-purple-600 hover:text-purple-800 font-medium"
            >
              <HelpCircle className="w-5 h-5 mr-1" />
              {showExplanation ? 'Hide Explanation' : 'Show Explanation'}
            </button>
            
            {showExplanation && (
              <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <p className="text-gray-800">{question.explanation}</p>
              </div>
            )}
          </div>
        )}
        
        {/* Next Button */}
        {(selectedAnswer !== null || showSolution) && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={onNext}
              className="flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizCard;