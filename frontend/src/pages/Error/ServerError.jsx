import React from 'react';
import { ServerCrash, RotateCcw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const ServerError = () => {
  return (
    <>
      <Helmet>
        <title>Server Error | InfoLand AI</title>
        <meta name="description" content="We are experiencing temporary technical difficulties." />
      </Helmet>
      
      <div className="min-h-[80vh] w-full flex flex-col items-center justify-center px-6 text-center">
        <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mb-6 border border-red-100">
          <ServerCrash className="w-10 h-10 text-red-500" />
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">Service Unavailable</h1>
        <p className="text-base text-slate-500 mb-8 max-w-md mx-auto">
          We are currently experiencing technical difficulties connecting to our Dataset Engine. Please try again in a few moments.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
            aria-label="Refresh page"
          >
            <RotateCcw className="w-5 h-5" /> Try Again
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors shadow-sm"
            aria-label="Return to home page"
          >
            <Home className="w-5 h-5" /> Return Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default ServerError;
