import React, { useState } from 'react';
import { QuizMode, QuizSettings, QuizTopic } from '../types/quiz';
import { Clock, Play, Settings } from 'lucide-react';

interface QuizSettingsProps {
  selectedTopic: QuizTopic;
  onStartQuiz: (settings: QuizSettings) => void;
}

const QuizSettings: React.FC<QuizSettingsProps> = ({ selectedTopic, onStartQuiz }) => {
  const [numQuestions, setNumQuestions] = useState(5);
  const [quizMode, setQuizMode] = useState<QuizMode>('untimed');
  const [timePerQuestion, setTimePerQuestion] = useState(30);
  const [totalTime, setTotalTime] = useState(300);

  const handleStartQuiz = () => {
    const settings: QuizSettings = {
      topic: selectedTopic,
      numQuestions,
      mode: quizMode,
      ...(quizMode === 'timed-question' && { timePerQuestion }),
      ...(quizMode === 'timed-quiz' && { totalTime }),
    };
    
    onStartQuiz(settings);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-md mx-auto">
      <div className="flex items-center space-x-2 mb-6">
        <Settings className="w-5 h-5 text-purple-600" />
        <h2 className="text-xl font-semibold">Quiz Settings</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Questions
          </label>
          <input
            type="range"
            min="3"
            max="15"
            step="1"
            value={numQuestions}
            onChange={(e) => setNumQuestions(parseInt(e.target.value))}
            className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between mt-1">
            <span className="text-sm text-gray-500">3</span>
            <span className="text-sm font-medium text-purple-700">{numQuestions}</span>
            <span className="text-sm text-gray-500">15</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quiz Mode
          </label>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <button
              type="button"
              className={`px-4 py-3 border rounded-lg text-sm font-medium transition-all ${
                quizMode === 'untimed'
                  ? 'bg-purple-100 border-purple-300 text-purple-700'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setQuizMode('untimed')}
            >
              Untimed
            </button>
            <button
              type="button"
              className={`px-4 py-3 border rounded-lg text-sm font-medium transition-all ${
                quizMode === 'timed-question'
                  ? 'bg-purple-100 border-purple-300 text-purple-700'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setQuizMode('timed-question')}
            >
              Per Question
            </button>
            <button
              type="button"
              className={`px-4 py-3 border rounded-lg text-sm font-medium transition-all ${
                quizMode === 'timed-quiz'
                  ? 'bg-purple-100 border-purple-300 text-purple-700'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setQuizMode('timed-quiz')}
            >
              Full Quiz
            </button>
          </div>
        </div>

        {quizMode === 'timed-question' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Per Question (seconds)
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="10"
                max="120"
                step="5"
                value={timePerQuestion}
                onChange={(e) => setTimePerQuestion(parseInt(e.target.value))}
                className="flex-1 h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex items-center space-x-1 px-3 py-2 bg-purple-50 rounded-md">
                <Clock className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-700">{timePerQuestion}s</span>
              </div>
            </div>
          </div>
        )}

        {quizMode === 'timed-quiz' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Quiz Time (seconds)
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="60"
                max="900"
                step="30"
                value={totalTime}
                onChange={(e) => setTotalTime(parseInt(e.target.value))}
                className="flex-1 h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex items-center space-x-1 px-3 py-2 bg-purple-50 rounded-md">
                <Clock className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-700">
                  {Math.floor(totalTime / 60)}m {totalTime % 60}s
                </span>
              </div>
            </div>
          </div>
        )}

        <button
          type="button"
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-purple-600 text-white rounded-lg font-medium shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
          onClick={handleStartQuiz}
        >
          <Play className="w-5 h-5" />
          <span>Start Quiz</span>
        </button>
      </div>
    </div>
  );
};

export default QuizSettings;