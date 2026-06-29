import React from 'react';

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 animate-fadeIn">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4 mx-auto" aria-label="Loading"></div>
      <p className="text-lg text-blue-600 font-medium">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
