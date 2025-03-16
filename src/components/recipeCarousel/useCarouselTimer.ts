
import { useRef, useEffect } from 'react';

interface UseCarouselTimerProps {
  onSlideChange: () => void;
  interval?: number;
}

export const useCarouselTimer = ({ 
  onSlideChange, 
  interval = 15000 
}: UseCarouselTimerProps) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Start automatic sliding timer
  const startTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    timerRef.current = setInterval(() => {
      onSlideChange();
    }, interval);
  };

  // Reset timer when user interacts with arrows
  const resetTimer = () => {
    startTimer();
  };

  useEffect(() => {
    startTimer();
    
    // Clear interval on component unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return {
    resetTimer,
    pauseTimer: () => timerRef.current && clearInterval(timerRef.current),
    resumeTimer: startTimer
  };
};
