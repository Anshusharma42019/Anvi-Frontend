import React, { useState, useEffect } from 'react';
import apiService from '../services/api';

const MessagingPanel = ({ showToast, setMessageStatus }) => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [manualPhone, setManualPhone] = useState('');
  const [manualMessage, setManualMessage] = useState('');
  const [messageType, setMessageType] = useState('both');
  const [loading, setLoading] = useState(false);
  const [messagingStatus, setMessagingStatus] = useState(null);

  useEffect(() => {
    loadContacts();
    checkMessagingStatus();
  }, []);

  const loadContacts = async () => {
    try {
      const response = await apiService.getAllContacts({ limit: 50 });
      setContacts(response.contacts || []);
    } catch (error) {
      console.error('Failed to load contacts:', error);
    }
  };

  const checkMessagingStatus = async () => {
    try {
      const status = await apiService.testMessaging();
      setMessagingStatus(status.results);
    } catch (error) {
      console.error('Failed to check messaging status:', error);
    }
  };

  const handleReply = async (contactId) => {
    if (!replyMessage.trim()) return;
    
    setLoading(true);
    try {
      const response = await apiService.replyToContact(contactId, replyMessage, 'Admin');
      if (response.messageSent && setMessageStatus) {
        setMessageStatus(response.messageSent);
        setTimeout(() => setMessageStatus(null), 5000);
      }
      showToast('🚀 Reply sent successfully!', 'success');
      setReplyMessage('');
      setSelectedContact(null);
      loadContacts();
    } catch (error) {
      showToast('Failed to send reply: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleManualMessage = async () => {
    if (!manualPhone.trim() || !manualMessage.trim()) return;
    
    setLoading(true);
    try {
      const response = await apiService.sendManualMessage(manualPhone, manualMessage, messageType);
      const successCount = (response.results?.sms ? 1 : 0) + (response.results?.whatsapp ? 1 : 0);
      if (successCount > 0) {
        showToast(`📤 Message sent via ${response.results?.sms && response.results?.whatsapp ? 'SMS & WhatsApp' : response.results?.sms ? 'SMS' : 'WhatsApp'}!`, 'success');
      } else {
        showToast('⚠️ Message failed to send via all channels', 'warning');
      }
      setManualPhone('');
      setManualMessage('');
    } catch (error) {
      showToast('Failed to send message: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">📱 Messaging Control Center</h2>
        <p className="text-purple-100">Send replies and manage customer communications</p>
      </div>
      
      {/* Messaging Status */}
      {messagingStatus && (
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">🔧 System Status</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className={`p-4 rounded-xl ${messagingStatus.config?.smsConfigured ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">📱</span>
                <div>
                  <p className="font-semibold text-gray-800">SMS Service</p>
                  <p className={`text-sm ${messagingStatus.config?.smsConfigured ? 'text-green-600' : 'text-red-600'}`}>
                    {messagingStatus.config?.smsConfigured ? '✅ Active' : '❌ Inactive'}
                  </p>
                </div>
              </div>
            </div>
            <div className={`p-4 rounded-xl ${messagingStatus.config?.whatsappConfigured ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">💬</span>
                <div>
                  <p className="font-semibold text-gray-800">WhatsApp</p>
                  <p className={`text-sm ${messagingStatus.config?.whatsappConfigured ? 'text-green-600' : 'text-red-600'}`}>
                    {messagingStatus.config?.whatsappConfigured ? '✅ Active' : '❌ Inactive'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Contact Replies */}
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
          <div className="flex items-center space-x-2 mb-6">
            <span className="text-2xl">📧</span>
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Reply to Contacts</h3>
          </div>
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {contacts.map((contact) => (
              <div key={contact._id} className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 hover:shadow-md transition-all duration-300 border border-gray-200">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-gray-800">{contact.name}</h4>
                    <p className="text-sm text-purple-600 font-medium">{contact.email}</p>
                    {contact.phone && (
                      <p className="text-sm text-blue-600 font-medium">📱 {contact.phone}</p>
                    )}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    contact.status === 'new' ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' :
                    contact.status === 'replied' ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' :
                    'bg-gradient-to-r from-gray-500 to-slate-500 text-white'
                  }`}>
                    {contact.status}
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-700 mb-2">{contact.subject}</p>
                <p className="text-xs text-gray-600 mb-3 bg-white p-2 rounded-lg">{contact.message}</p>
                
                {selectedContact === contact._id ? (
                  <div className="space-y-2">
                    <textarea
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      placeholder="Type your reply..."
                      className="w-full p-3 border-2 border-purple-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows="3"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleReply(contact._id)}
                        disabled={loading || !replyMessage.trim()}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 disabled:opacity-50"
                      >
                        {loading ? '⏳ Sending...' : '✨ Send Reply'}
                      </button>
                      <button
                        onClick={() => setSelectedContact(null)}
                        className="bg-gradient-to-r from-gray-500 to-slate-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:from-gray-600 hover:to-slate-600 transition-all duration-300"
                      >
                        ❌ Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setSelectedContact(contact._id)}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                  >
                    💬 Reply
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Manual Messaging */}
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
          <div className="flex items-center space-x-2 mb-6">
            <span className="text-2xl">📤</span>
            <h3 className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Send Manual Message</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">📱 Phone Number</label>
              <input
                type="tel"
                value={manualPhone}
                onChange={(e) => setManualPhone(e.target.value)}
                placeholder="9876543210"
                className="w-full p-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">🎯 Message Type</label>
              <select
                value={messageType}
                onChange={(e) => setMessageType(e.target.value)}
                className="w-full p-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="both">📱💬 Both SMS & WhatsApp</option>
                <option value="sms">📱 SMS Only</option>
                <option value="whatsapp">💬 WhatsApp Only</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">💬 Message</label>
              <textarea
                value={manualMessage}
                onChange={(e) => setManualMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full p-3 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows="4"
              />
            </div>
            
            <button
              onClick={handleManualMessage}
              disabled={loading || !manualPhone.trim() || !manualMessage.trim()}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-xl font-bold text-lg hover:from-green-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '⏳ Sending...' : '🚀 Send Message'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagingPanel;