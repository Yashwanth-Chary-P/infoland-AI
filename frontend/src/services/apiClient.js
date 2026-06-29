import axios from 'axios';
import Swal from 'sweetalert2';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => {
    // The backend uses a standard format: { success, message, data, pagination }
    // We return the entire response.data so callers can access data, pagination, etc.
    return response.data;
  },
  (error) => {
    // Graceful error handling
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const message = error.response.data?.message || 'An error occurred while fetching data.';
      
      // We don't want to show Swal for every single background 404 (e.g. missing documents) 
      // but for critical failures, the UI components can handle it, or we handle global 500s here.
      if (error.response.status >= 500) {
        Swal.fire({
          icon: 'error',
          title: 'Server Error',
          text: message,
        });
      }
    } else if (error.request) {
      // The request was made but no response was received
      Swal.fire({
        icon: 'error',
        title: 'Network Error',
        text: 'Unable to connect to the server. Please check your internet connection.',
      });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('API Client Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
