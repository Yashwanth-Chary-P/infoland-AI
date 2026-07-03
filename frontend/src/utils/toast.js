import toast from 'react-hot-toast';

export const notify = {
  success: (message) => {
    toast.success(message, {
      duration: 4000,
      position: 'bottom-right',
      style: {
        background: '#10b981',
        color: '#fff',
        fontFamily: "'Inter', sans-serif",
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#10b981',
      },
    });
  },
  
  error: (message) => {
    toast.error(message, {
      duration: 5000,
      position: 'bottom-right',
      style: {
        background: '#ef4444',
        color: '#fff',
        fontFamily: "'Inter', sans-serif",
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#ef4444',
      },
    });
  },

  warning: (message) => {
    toast(message, {
      duration: 4000,
      position: 'bottom-right',
      icon: '⚠️',
      style: {
        background: '#f59e0b',
        color: '#fff',
        fontFamily: "'Inter', sans-serif",
      },
    });
  },

  info: (message) => {
    toast(message, {
      duration: 4000,
      position: 'bottom-right',
      icon: 'ℹ️',
      style: {
        background: '#3b82f6',
        color: '#fff',
        fontFamily: "'Inter', sans-serif",
      },
    });
  },
  
  networkError: () => {
    toast.error('Network disconnected. Please check your connection.', {
      duration: 6000,
      position: 'bottom-right',
      style: {
        background: '#0f172a',
        color: '#fff',
        fontFamily: "'Inter', sans-serif",
      },
      iconTheme: {
        primary: '#ef4444',
        secondary: '#0f172a',
      },
    });
  }
};
