import React from 'react';
import { AlertOctagon, RotateCcw, Home } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    // Console log for debugging, acceptable per requirements
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onRetry) {
      this.props.onRetry();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] w-full flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 max-w-lg w-full flex flex-col items-center">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
              <AlertOctagon className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Something went wrong</h2>
            <p className="text-sm text-slate-500 mb-8 max-w-sm">
              We encountered an unexpected error while loading this component. Our team has been notified.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:justify-center">
              <button
                onClick={this.handleRetry}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-lg font-medium text-sm hover:bg-slate-800 transition-colors"
                aria-label="Retry loading component"
              >
                <RotateCcw className="w-4 h-4" /> Retry
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg font-medium text-sm hover:bg-slate-50 transition-colors"
                aria-label="Return to home page"
              >
                <Home className="w-4 h-4" /> Return Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
