import React from 'react';
import { Link } from 'react-router-dom';

const ModernButton = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  to, 
  href, 
  onClick, 
  disabled = false, 
  loading = false,
  icon,
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'btn-primary hover-lift neon-glow',
    secondary: 'btn-secondary hover-lift',
    outline: 'border-2 border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white hover-lift',
    ghost: 'text-purple-500 hover:bg-purple-50 hover-scale',
    glass: 'glass text-white hover:bg-white/20',
    gradient: 'bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white hover-lift neon-glow'
  };
  
  const sizes = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl'
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
  const content = (
    <>
      {loading && (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
      )}
      {icon && !loading && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
    </>
  );
  
  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }
  
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    );
  }
  
  return (
    <button 
      className={classes} 
      onClick={onClick} 
      disabled={disabled || loading}
      {...props}
    >
      {content}
    </button>
  );
};

export default ModernButton;