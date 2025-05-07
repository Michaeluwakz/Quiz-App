import React, { useState } from 'react';
import { useQuiz } from '../contexts/QuizContext';
import TopicSelector from '../components/TopicSelector';
import QuizSettings from '../components/QuizSettings';
import { QuizSettings as QuizSettingsType, QuizTopic } from '../types/quiz';
import { BrainCircuit } from 'lucide-react';

const Home: React.FC = () => {
  const { configureQuiz, startQuiz } = useQuiz();
  const [selectedTopic, setSelectedTopic] = useState<QuizTopic | null>(null);

  const handleTopicSelect = (topic: QuizTopic) => {
    setSelectedTopic(topic);
  };

  const handleStartQuiz = (settings: QuizSettingsType) => {
    configureQuiz(settings);
    startQuiz();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-2xl mb-4">
            <BrainCircuit className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2 text-gray-900">QuizMaster</h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Test your knowledge with challenging quizzes on Physics, Mathematics, Chemistry, and Programming.
          </p>
        </div>
        
        {/* Main content */}
        <div className="space-y-8">
          {/* Step 1: Select Topic */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <span className="flex items-center justify-center w-7 h-7 bg-purple-600 text-white rounded-full mr-2 text-sm">1</span>
              Select a Topic
            </h2>
            <TopicSelector 
              selectedTopic={selectedTopic} 
              onSelectTopic={handleTopicSelect} 
            />
          </div>
          
          {/* Step 2: Quiz Settings (conditionally shown) */}
          {selectedTopic && (
            <div className="animate-fadeIn">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <span className="flex items-center justify-center w-7 h-7 bg-purple-600 text-white rounded-full mr-2 text-sm">2</span>
                Customize Your Quiz
              </h2>
              <QuizSettings 
                selectedTopic={selectedTopic} 
                onStartQuiz={handleStartQuiz} 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;