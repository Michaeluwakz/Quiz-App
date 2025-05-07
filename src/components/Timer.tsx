import React, { useEffect } from 'react';
import { useTimer } from '../hooks/useTimer';
import { Clock } from 'lucide-react';

interface TimerProps {
  initialTime: number;
  autoStart?: boolean;
  onTimeUp?: () => void;
  showControls?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Timer: React.FC<TimerProps> = ({
  initialTime,
  autoStart = true,
  onTimeUp,
  showControls = false,
  size = 'md',
  className = '',
}) => {
  const { 
    formattedTime, 
    timeRemaining,
    isActive, 
    isPaused, 
    start, 
    pause, 
    resume, 
    reset 
  } = useTimer({
    initialTime,
    autoStart,
    onTimeUp,
  });

  // Calculate warning levels
  const getTimerColor = () => {
    const percentage = (timeRemaining / initialTime) * 100;
    if (percentage <= 25) return 'text-red-600';
    if (percentage <= 50) return 'text-orange-500';
    return 'text-green-600';
  };

  const sizeClasses = {
    sm: 'text-sm px-2 py-1',
    md: 'text-base px-3 py-2',
    lg: 'text-lg px-4 py-2',
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div 
        className={`flex items-center rounded-lg bg-gray-50 border border-gray-200 ${sizeClasses[size]}`}
      >
        <Clock className={`w-4 h-4 mr-2 ${getTimerColor()}`} />
        <span className={`font-mono font-medium ${getTimerColor()}`}>
          {formattedTime}
        </span>
      </div>

      {showControls && (
        <div className="flex mt-2 space-x-2">
          {!isActive && !isPaused ? (
            <button
              onClick={start}
              className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
            >
              Start
            </button>
          ) : isPaused ? (
            <button
              onClick={resume}
              className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Resume
            </button>
          ) : (
            <button
              onClick={pause}
              className="px-3 py-1 text-xs bg-yellow-600 text-white rounded hover:bg-yellow-700"
            >
              Pause
            </button>
          )}
          <button
            onClick={() => reset()}
            className="px-3 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
};

export default Timer;