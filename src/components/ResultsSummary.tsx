import React from 'react';
import { QuizResult } from '../types/quiz';
import { Award, Clock, BarChart2, BookOpen, RefreshCw } from 'lucide-react';
import { quizTopics } from '../data/topics';

interface ResultsSummaryProps {
  result: QuizResult;
  onRestart: () => void;
  onNewQuiz: () => void;
}

const ResultsSummary: React.FC<ResultsSummaryProps> = ({ 
  result, 
  onRestart, 
  onNewQuiz 
}) => {
  const { totalScore, totalTime, settings, answers } = result;
  const topicInfo = quizTopics.find(t => t.id === settings.topic);
  
  const scorePercentage = Math.round((totalScore / settings.numQuestions) * 100);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };
  
  const getScoreColor = () => {
    if (scorePercentage >= 80) return 'text-green-600';
    if (scorePercentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  const getScoreMessage = () => {
    if (scorePercentage >= 90) return 'Excellent!';
    if (scorePercentage >= 80) return 'Great job!';
    if (scorePercentage >= 70) return 'Good work!';
    if (scorePercentage >= 60) return 'Not bad!';
    if (scorePercentage >= 50) return 'You can do better!';
    return 'Keep practicing!';
  };

  const difficultyBreakdown = answers.reduce((acc, answer) => {
    const question = result.settings.questions?.find(q => q.id === answer.questionId);
    if (question && answer.isCorrect) {
      acc[question.difficulty] = (acc[question.difficulty] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-3xl mx-auto">
      <div className="p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Quiz Results</h2>
          <p className="text-gray-600">
            {topicInfo?.name} Quiz - {getScoreMessage()}
          </p>
        </div>
        
        {/* Score Summary */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="relative w-36 h-36 mb-4">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="3"
                strokeDasharray="100, 100"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke={scorePercentage >= 80 ? "#059669" : scorePercentage >= 60 ? "#D97706" : "#DC2626"}
                strokeWidth="3"
                strokeDasharray={`${scorePercentage}, 100`}
              />
              <text x="18" y="20.5" className="text-5xl font-bold" textAnchor="middle" fill={scorePercentage >= 80 ? "#059669" : scorePercentage >= 60 ? "#D97706" : "#DC2626"}>
                {scorePercentage}%
              </text>
            </svg>
          </div>
          <div className={`text-2xl font-bold ${getScoreColor()}`}>
            {totalScore} / {settings.numQuestions} correct
          </div>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-purple-600 mr-2" />
              <span className="text-sm text-purple-700 font-medium">Time Taken</span>
            </div>
            <p className="text-2xl font-semibold mt-2">{formatTime(totalTime)}</p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-center">
              <BarChart2 className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-sm text-blue-700 font-medium">Avg. Time Per Question</span>
            </div>
            <p className="text-2xl font-semibold mt-2">{formatTime(Math.round(totalTime / settings.numQuestions))}</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <div className="flex items-center">
              <Award className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-sm text-green-700 font-medium">Performance</span>
            </div>
            <p className="text-2xl font-semibold mt-2">{getScoreMessage()}</p>
          </div>
        </div>
        
        {/* Question Breakdown (Optional, can expand if needed) */}
        
        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          <button
            onClick={onRestart}
            className="flex items-center justify-center py-3 px-4 bg-white border border-purple-600 text-purple-600 font-medium rounded-lg hover:bg-purple-50 transition-colors"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Retry Quiz
          </button>
          
          <button
            onClick={onNewQuiz}
            className="flex items-center justify-center py-3 px-4 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
          >
            <BookOpen className="w-5 h-5 mr-2" />
            New Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsSummary;