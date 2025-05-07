import React from 'react';
import { quizTopics } from '../data/topics';
import { QuizTopic, QuizTopicInfo } from '../types/quiz';
import { Atom, Code, FlaskConical, SquareEqual } from 'lucide-react';

interface TopicSelectorProps {
  selectedTopic: QuizTopic | null;
  onSelectTopic: (topic: QuizTopic) => void;
}

const TopicSelector: React.FC<TopicSelectorProps> = ({ 
  selectedTopic, 
  onSelectTopic 
}) => {
  const getTopicIcon = (iconName: string) => {
    switch (iconName) {
      case 'atom':
        return <Atom className="w-8 h-8" />;
      case 'code':
        return <Code className="w-8 h-8" />;
      case 'flask-conical':
        return <FlaskConical className="w-8 h-8" />;
      case 'square-equal':
        return <SquareEqual className="w-8 h-8" />;
      default:
        return <Atom className="w-8 h-8" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      {quizTopics.map((topic: QuizTopicInfo) => (
        <div
          key={topic.id}
          className={`cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 p-6 rounded-xl shadow-md ${
            selectedTopic === topic.id
              ? 'ring-4 ring-offset-2 bg-white'
              : 'bg-white hover:shadow-lg'
          }`}
          style={{ 
            borderLeft: `6px solid ${topic.color}`,
            boxShadow: selectedTopic === topic.id ? `0 0 0 2px ${topic.color}20` : undefined
          }}
          onClick={() => onSelectTopic(topic.id)}
        >
          <div className="flex items-start space-x-4">
            <div 
              className="p-3 rounded-lg" 
              style={{ backgroundColor: `${topic.color}15` }}
            >
              <div style={{ color: topic.color }}>
                {getTopicIcon(topic.icon)}
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">{topic.name}</h3>
              <p className="text-gray-600 text-sm">{topic.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopicSelector;