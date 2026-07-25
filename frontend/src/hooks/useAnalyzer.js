import { useState } from 'react';
import confetti from 'canvas-confetti';
import { analyzeUrl } from '../services/api';

export const useAnalyzer = () => {
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [activeUrl, setActiveUrl] = useState('');

  const runAnalysis = async (targetUrl) => {
    setStatus('loading');
    setError(null);
    setActiveUrl(targetUrl);

    try {
      const result = await analyzeUrl(targetUrl);
      setData(result);
      setStatus('success');

      // Trigger celebratory confetti if SEO score is >= 80
      if (result && result.seoScore >= 80) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#3B82F6', '#22C55E', '#60A5FA'],
        });
      }
    } catch (err) {
      setError(err.message || 'Failed to complete website audit.');
      setStatus('error');
    }
  };

  const reset = () => {
    setStatus('idle');
    setData(null);
    setError(null);
    setActiveUrl('');
  };

  return {
    status,
    data,
    error,
    activeUrl,
    runAnalysis,
    reset,
    isLoading: status === 'loading',
    isSuccess: status === 'success',
    isError: status === 'error',
  };
};
