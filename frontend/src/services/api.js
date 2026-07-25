import axios from 'axios';

// Get backend API base URL from Vite environment or default
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 20000, // 20s frontend request timeout
});

/**
 * Trigger analysis of a target URL
 */
export const analyzeUrl = async (url) => {
  try {
    const response = await apiClient.post('/api/analyze', { url });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error || 'Failed to complete analysis.');
    }
    if (error.code === 'ECONNABORTED') {
      throw new Error('Analysis timed out. The server took too long to respond.');
    }
    throw new Error(error.message || 'Unable to connect to analysis server.');
  }
};
