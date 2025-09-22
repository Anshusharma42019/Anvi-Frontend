import React from 'react';

const LoadingSpinner = ({ size = 'medium', color = 'primary' }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const colorClasses = {
    primary: 'border-purple-500',
    secondary: 'border-pink-500',
    accent: 'border-blue-500',
    white: 'border-white'
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`${sizeClasses[size]} ${colorClasses[color]} border-4 border-t-transparent rounded-full animate-spin`}></div>
    </div>
  );
};

export const SkeletonLoader = ({ className = '', lines = 3 }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      {[...Array(lines)].map((_, i) => (
        <div key={i} className="skeleton h-4 mb-3 rounded"></div>
      ))}
    </div>
  );
};

export const CardSkeleton = () => {
  return (
    <div className="modern-card p-6 animate-pulse">
      <div className="skeleton h-48 mb-4 rounded-lg"></div>
      <div className="skeleton h-6 mb-2 rounded"></div>
      <div className="skeleton h-4 w-3/4 rounded"></div>
    </div>
  );
};

export default LoadingSpinner;