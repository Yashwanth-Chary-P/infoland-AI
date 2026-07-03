import React from 'react';
import { FileQuestion, Search, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found | InfoLand AI</title>
        <meta name="description" content="The page you are looking for does not exist or has been moved." />
      </Helmet>
      
      <div className="min-h-[80vh] w-full flex flex-col items-center justify-center px-6 text-center">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6 relative">
          <FileQuestion className="w-10 h-10 text-slate-400" />
          <Search className="w-6 h-6 text-slate-500 absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-sm" />
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">Page Not Found</h1>
        <p className="text-base text-slate-500 mb-8 max-w-md mx-auto">
          We couldn't find the page you're looking for. It might have been moved, deleted, or perhaps the URL is incorrect.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link
            to="/explore"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            aria-label="Explore properties"
          >
            <Search className="w-5 h-5" /> Explore Properties
          </Link>
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

export default NotFound;
