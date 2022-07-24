import { useState } from 'react'

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

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