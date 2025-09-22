import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const getIcon = () => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5" />;
      case 'error': return <XCircle className="w-5 h-5" />;
      case 'warning': return <AlertCircle className="w-5 h-5" />;
      case 'info': return <Info className="w-5 h-5" />;
      default: return <CheckCircle className="w-5 h-5" />;
    }
  };

  const getStyles = () => {
    switch (type) {
      case 'success': return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
      case 'error': return 'bg-gradient-to-r from-red-500 to-pink-500 text-white';
      case 'warning': return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white';
      case 'info': return 'bg-gradient-to-r from-blue-500 to-purple-500 text-white';
      default: return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
    }
  };

  return (
    <div className={`fixed top-4 right-4 z-50 ${getStyles()} px-6 py-4 rounded-xl shadow-2xl backdrop-blur-lg border border-white/20 transform transition-all duration-300 animate-bounce max-w-sm`}>
      <div className="flex items-center space-x-3">
        {getIcon()}
        <span className="font-medium flex-1">{message}</span>
        <button
          onClick={onClose}
          className="hover:bg-white/20 p-1 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;