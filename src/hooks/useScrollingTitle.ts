import { useEffect, useRef } from 'react';

/**
 * A custom React hook that creates a scrolling effect for the document title.
 * @param title The string to scroll in the document title.
 * @param speed The scrolling speed in milliseconds.
 */
export const useScrollingTitle = (title: string, speed: number = 300) => {
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    let fullTitle = title + " "; // Add a space for better looping
    let currentIndex = 0;

    const scroll = () => {
      // Rotate the string
      document.title = fullTitle.substring(currentIndex) + fullTitle.substring(0, currentIndex);
      
      // Move to the next character
      currentIndex++;
      if (currentIndex >= fullTitle.length) {
        currentIndex = 0;
      }
    };

    // Clear any existing interval to prevent duplicates
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Start the scrolling interval
    intervalRef.current = window.setInterval(scroll, speed);

    // Cleanup function to stop the interval when the component unmounts
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [title, speed]);
};
