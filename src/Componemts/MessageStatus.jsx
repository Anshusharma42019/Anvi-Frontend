import React from 'react';
import { Mail, MessageCircle, Smartphone, CheckCircle, XCircle } from 'lucide-react';

const MessageStatus = ({ results, onClose }) => {
  const getStatusIcon = (success) => {
    return success ? (
      <CheckCircle className="w-5 h-5 text-green-500" />
    ) : (
      <XCircle className="w-5 h-5 text-red-500" />
    );
  };

  const getStatusBadge = (success) => {
    return success ? (
      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
        ✅ Sent
      </span>
    ) : (
      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">
        ❌ Failed
      </span>
    );
  };

  return (
    <div className="fixed top-4 right-4 z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 max-w-sm animate-bounce">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          📤 Message Status
        </h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          ✕
        </button>
      </div>

      <div className="space-y-3">
        {/* Email Status */}
        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-gray-700">Email</span>
          </div>
          {getStatusBadge(results.email)}
        </div>

        {/* SMS Status */}
        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl">
          <div className="flex items-center space-x-3">
            <Smartphone className="w-5 h-5 text-green-600" />
            <span className="font-medium text-gray-700">SMS</span>
          </div>
          {getStatusBadge(results.sms)}
        </div>

        {/* WhatsApp Status */}
        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl">
          <div className="flex items-center space-x-3">
            <MessageCircle className="w-5 h-5 text-emerald-600" />
            <span className="font-medium text-gray-700">WhatsApp</span>
          </div>
          {getStatusBadge(results.whatsapp)}
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          Reply sent via {[results.email && 'Email', results.sms && 'SMS', results.whatsapp && 'WhatsApp'].filter(Boolean).join(' & ') || 'none'}
        </p>
      </div>
    </div>
  );
};

export default MessageStatus;