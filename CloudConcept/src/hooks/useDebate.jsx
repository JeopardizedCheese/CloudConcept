// src/hooks/useDebate.js
import { useState, useCallback } from 'react';
import { generateDebate } from '../api/services';

export function useDebate() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [debateData, setDebateData] = useState(null);
  const [progress, setProgress] = useState('');
  const [mode, setMode] = useState('validation');

  const startDebate = useCallback(async (prompt, category = 'general', debateMode = mode) => {
    setLoading(true);
    setError(null);
    setProgress('Initializing debate...');
    
    try {
      // Simulate progress updates
      const progressUpdates = [
        'AI agents are analyzing your idea...',
        'Technical expert is evaluating feasibility...',
        'Market analyst is assessing commercial potential...',
        'Originality assessor is reviewing uniqueness...',
        'Ethical evaluator is examining implications...',
        'Agents are cross-examining each other...',
        'Orchestrator is synthesizing insights...'
      ];
      
      // Simulate progress updates at intervals
      const progressInterval = setInterval(() => {
        setProgress(progressUpdates[Math.floor(Math.random() * progressUpdates.length)]);
      }, 2000);
      
      // Call the API
      const response = await generateDebate(prompt, category, debateMode);
      
      // Clear progress interval
      clearInterval(progressInterval);
      
      if (response.success) {
        setDebateData(response.data);
        setProgress('Debate complete!');
      } else {
        throw new Error(response.error || 'Failed to generate debate');
      }
    } catch (err) {
      setError(err.message);
      setProgress('');
    } finally {
      setLoading(false);
    }
  }, [mode]);

  const toggleMode = useCallback(() => {
    setMode(prev => prev === 'validation' ? 'generation' : 'validation');
  }, []);

  const reset = useCallback(() => {
    setDebateData(null);
    setError(null);
    setProgress('');
  }, []);

  return {
    loading,
    error,
    debateData,
    progress,
    mode,
    startDebate,
    toggleMode,
    reset
  };
}