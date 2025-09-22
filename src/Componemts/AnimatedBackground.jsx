import React, { useEffect, useState } from 'react';

const AnimatedBackground = ({ variant = 'particles', className = '' }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (variant === 'particles') {
      const newParticles = [...Array(30)].map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 8 + 4,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5
      }));
      setParticles(newParticles);
    }
  }, [variant]);

  if (variant === 'particles') {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute bg-white/10 rounded-full animate-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'gradient-orbs') {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-10 w-48 h-48 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-2xl animate-float" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-1/3 right-1/4 w-56 h-56 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-full blur-2xl animate-float" style={{animationDelay: '1s'}}></div>
      </div>
    );
  }

  if (variant === 'geometric') {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        <div className="absolute top-10 left-10 w-32 h-32 border border-white/10 rotate-45 animate-rotate"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 right-10 w-16 h-16 bg-gradient-to-r from-purple-500/10 to-pink-500/10 transform rotate-12 animate-float"></div>
        <div className="absolute bottom-1/3 left-1/4 w-20 h-20 border-2 border-white/10 rounded-lg animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
    );
  }

  return null;
};

export default AnimatedBackground;