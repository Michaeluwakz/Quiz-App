import React from 'react';
import { Check, X } from 'lucide-react';

interface AnswerOptionProps {
  index: number;
  text: string;
  selected: boolean;
  correct?: boolean;
  showResult?: boolean;
  disabled?: boolean;
  onSelect: () => void;
}

const AnswerOption: React.FC<AnswerOptionProps> = ({
  index,
  text,
  selected,
  correct,
  showResult = false,
  disabled = false,
  onSelect,
}) => {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  
  const getBackgroundColor = () => {
    if (!showResult) return selected ? 'bg-purple-100' : 'bg-white';
    if (correct) return 'bg-green-100';
    if (selected) return 'bg-red-100';
    return 'bg-white';
  };

  const getBorderColor = () => {
    if (!showResult) return selected ? 'border-purple-300' : 'border-gray-200';
    if (correct) return 'border-green-500';
    if (selected) return 'border-red-500';
    return 'border-gray-200';
  };

  return (
    <button
      type="button"
      className={`w-full ${getBackgroundColor()} ${getBorderColor()} border-2 rounded-lg p-4 mb-3 text-left transition-all duration-200 relative ${
        !disabled && !showResult ? 'hover:shadow-md hover:border-purple-400' : ''
      } ${disabled ? 'opacity-60' : ''}`}
      onClick={onSelect}
      disabled={disabled || showResult}
    >
      <div className="flex items-center">
        <div className={`flex items-center justify-center h-8 w-8 rounded-full mr-3 ${
          selected 
            ? showResult 
              ? correct 
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
              : 'bg-purple-100 text-purple-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          <span className="font-medium">{letters[index]}</span>
        </div>
        <span className="flex-1">{text}</span>
        
        {showResult && selected && (
          <div className={`ml-2 ${correct ? 'text-green-600' : 'text-red-600'}`}>
            {correct ? <Check className="h-5 w-5" /> : <X className="h-5 w-5" />}
          </div>
        )}
        
        {showResult && correct && !selected && (
          <div className="ml-2 text-green-600">
            <Check className="h-5 w-5" />
          </div>
        )}
      </div>
    </button>
  );
};

export default AnswerOption;