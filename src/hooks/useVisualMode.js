import { useState } from 'react';

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  console.log("History Array: ", history);

  /**
   * This function set mode with given newMode String and update the history array according to replace boolean value
   * @param {*} newMode String
   * @param {*} replace Boolean
   */
  function transition(newMode, replace = false) {
    setMode(() => newMode);
    setHistory((prev) => {
      let historyArray = [...prev];
      if (replace) {
        historyArray.pop();
      }
      historyArray.push(newMode);
      return historyArray;
    });
  }

  /**
   * This function removes the last item from history array and update the mode and history state
   */
  function back() {
    setHistory((prev) => {
      const historyArray = [...prev];
      if (historyArray.length > 1) {
        historyArray.pop();
        setMode(() => historyArray[historyArray.length - 1]);
      }
      return historyArray;
    });

  }

  return {
    mode,
    transition,
    back
  };
} 