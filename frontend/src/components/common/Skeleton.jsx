import React from 'react';

const Skeleton = ({ className = '', variant = 'rectangular', ...props }) => {
  const variants = {
    rectangular: 'rounded-md',
    circular: 'rounded-full',
    text: 'rounded',
  };

  return (
    <div 
      className={`animate-pulse bg-slate-200 ${variants[variant]} ${className}`} 
      {...props}
    />
  );
};

export default Skeleton;
