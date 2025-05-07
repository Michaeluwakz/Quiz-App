import { useState, useEffect, useCallback } from 'react';

interface TimerHookProps {
  initialTime: number; // in seconds
  autoStart?: boolean;
  onTimeUp?: () => void;
}

export const useTimer = ({ 
  initialTime,
  autoStart = false,
  onTimeUp
}: TimerHookProps) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [isActive, setIsActive] = useState(autoStart);
  const [isPaused, setIsPaused] = useState(false);

  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);
  
  const start = useCallback(() => {
    setIsActive(true);
    setIsPaused(false);
  }, []);

  const pause = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resume = useCallback(() => {
    setIsPaused(false);
  }, []);

  const reset = useCallback((newTime = initialTime) => {
    setTimeRemaining(newTime);
    setIsActive(false);
    setIsPaused(false);
  }, [initialTime]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTimeRemaining((time) => {
          if (time <= 1) {
            if (interval) clearInterval(interval);
            if (onTimeUp) onTimeUp();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isPaused, onTimeUp]);

  return {
    timeRemaining,
    formattedTime: formatTime(timeRemaining),
    isActive,
    isPaused,
    start,
    pause,
    resume,
    reset,
  };
};