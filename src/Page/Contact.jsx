import React, { useState } from "react";
import ExtraContent from "./ExtraContent";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [autoReplyStatus, setAutoReplyStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    
    try {
      const apiService = (await import('../services/api')).default;
      const response = await apiService.submitContact(formData);
      setSubmitMessage('Thank you for your message! We\'ll get back to you soon.');
      setAutoReplyStatus(response.autoReplySent);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      setSubmitMessage('Failed to send message. Please try again.');
      console.error('Contact form error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <section className="py-20 px-4 text-gray-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-emerald-200/30 to-teal-200/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10 animate-fade-in-up">
          <span className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full text-emerald-800 font-semibold mb-6">
            📞 Let's Connect
          </span>
          <h1 className="hero-text gradient-text mb-6">Get in Touch</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your space? Our tile experts are here to guide you through every step of your journey
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div className="animate-slide-in-left">
              <div className="mb-8">
                <span className="inline-block px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full text-emerald-800 font-medium mb-4">
                  📍 Contact Information
                </span>
                <h2 className="section-title gradient-text mb-6">Multiple Ways to Reach Us</h2>
              </div>
              
              <div className="space-y-6 mb-12">
                <div className="modern-card hover-lift p-6 flex items-start">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mr-6 flex-shrink-0">
                    <span className="text-2xl">🏢</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Visit Our Flagship Showroom</h3>
                    <p className="text-gray-600 leading-relaxed">Anvi Showroom, Design Plaza<br />123 Tile Street, Luxury District<br />Mumbai, Maharashtra 400001</p>
                    <p className="text-emerald-600 font-medium mt-2">Experience our tiles in person</p>
                  </div>
                </div>
                
                <div className="modern-card hover-lift p-6 flex items-start">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mr-6 flex-shrink-0">
                    <span className="text-2xl">📞</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Call Our Experts</h3>
                    <p className="text-gray-600 leading-relaxed">Sales: +91 98765 43210<br />Support: +91 87654 32109<br />WhatsApp: +91 99999 88888</p>
                    <p className="text-blue-600 font-medium mt-2">24/7 customer support available</p>
                  </div>
                </div>
                
                <div className="modern-card hover-lift p-6 flex items-start">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mr-6 flex-shrink-0">
                    <span className="text-2xl">✉️</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Email Us</h3>
                    <p className="text-gray-600 leading-relaxed">General: info@anvishowroom.com<br />Sales: sales@anvishowroom.com<br />Support: support@anvishowroom.com</p>
                    <p className="text-purple-600 font-medium mt-2">Quick response guaranteed</p>
                  </div>
                </div>
                
                <div className="modern-card hover-lift p-6 flex items-start">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mr-6 flex-shrink-0">
                    <span className="text-2xl">🕰️</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Business Hours</h3>
                    <p className="text-gray-600 leading-relaxed">Monday - Saturday: 9:00 AM - 8:00 PM<br />Sunday: 10:00 AM - 6:00 PM<br />Holidays: 11:00 AM - 4:00 PM</p>
                    <p className="text-orange-600 font-medium mt-2">Extended hours during festivals</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="modern-card p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl flex items-center justify-center hover-lift neon-glow">
                    <span className="text-lg font-bold">f</span>
                  </a>
                  <a href="#" className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-xl flex items-center justify-center hover-lift neon-glow">
                    <span className="text-lg font-bold">t</span>
                  </a>
                  <a href="#" className="w-12 h-12 bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-xl flex items-center justify-center hover-lift neon-glow">
                    <span className="text-lg font-bold">i</span>
                  </a>
                  <a href="#" className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl flex items-center justify-center hover-lift neon-glow">
                    <span className="text-lg font-bold">y</span>
                  </a>
                  <a href="#" className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl flex items-center justify-center hover-lift neon-glow">
                    <span className="text-lg font-bold">w</span>
                  </a>
                </div>
                <p className="text-gray-600 text-sm mt-4">Follow us for design inspiration and latest updates</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="animate-slide-in-right">
              <div className="modern-card p-8 sm:p-10 neon-glow">
                <div className="mb-8">
                  <span className="inline-block px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full text-emerald-800 font-medium mb-4">
                    📝 Quick Contact
                  </span>
                  <h2 className="text-2xl font-bold gradient-text mb-2">Send Us a Message</h2>
                  <p className="text-gray-600">We'll get back to you within 24 hours</p>
                </div>
              
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-3">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:border-emerald-500 transition duration-300 bg-gray-50 focus:bg-white"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-3">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:border-emerald-500 transition duration-300 bg-gray-50 focus:bg-white"
                        placeholder="Your contact number"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-semibold mb-3">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:border-emerald-500 transition duration-300 bg-gray-50 focus:bg-white"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-semibold mb-3">Subject</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:border-emerald-500 transition duration-300 bg-gray-50 focus:bg-white"
                    >
                      <option value="">Choose your inquiry type</option>
                      <option value="product-inquiry">🔍 Product Inquiry</option>
                      <option value="bulk-order">📦 Bulk Order</option>
                      <option value="installation">🔨 Installation Service</option>
                      <option value="design-consultation">🎨 Design Consultation</option>
                      <option value="complaint">⚠️ Complaint</option>
                      <option value="other">💬 Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-semibold mb-3">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:border-emerald-500 transition duration-300 bg-gray-50 focus:bg-white resize-none"
                      placeholder="Tell us about your requirements, preferred styles, budget, or any specific questions..."
                    ></textarea>
                  </div>
                  
                  {submitMessage && (
                    <div className={`p-4 rounded-xl mb-4 ${submitMessage.includes('Thank you') ? 'bg-green-100 border border-green-200 text-green-800' : 'bg-red-100 border border-red-200 text-red-800'}`}>
                      <div className="flex items-center mb-2">
                        <span className="mr-2">{submitMessage.includes('Thank you') ? '✅' : '❌'}</span>
                        {submitMessage}
                      </div>
                      {autoReplyStatus && submitMessage.includes('Thank you') && (
                        <div className="text-sm mt-2 space-y-1">
                          <p className="font-medium">Auto-reply status:</p>
                          <div className="flex space-x-4">
                            <span className={autoReplyStatus.email ? 'text-green-600' : 'text-gray-400'}>
                              📧 Email: {autoReplyStatus.email ? '✅' : '❌'}
                            </span>
                            <span className={autoReplyStatus.sms ? 'text-green-600' : 'text-gray-400'}>
                              📱 SMS: {autoReplyStatus.sms ? '✅' : '❌'}
                            </span>
                            <span className={autoReplyStatus.whatsapp ? 'text-green-600' : 'text-gray-400'}>
                              💬 WhatsApp: {autoReplyStatus.whatsapp ? '✅' : '❌'}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary hover-lift py-4 text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending Message...
                      </span>
                    ) : (
                      <span>🚀 Send Message</span>
                    )}
                  </button>
                  
                  <p className="text-center text-gray-500 text-sm mt-4">
                    🔒 Your information is secure and will never be shared with third parties
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-gray-800">Find Our Showroom</h2>
          <div className="bg-gray-300 h-64 sm:h-80 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-600">
              <span className="text-4xl mb-2 block">🗺️</span>
              <p className="text-lg">Interactive Map</p>
              <p className="text-sm">123 Tile Street, Design District, Mumbai</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12 text-gray-800">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">What is your delivery time?</h3>
              <p className="text-gray-600">We typically deliver within 3-7 business days for in-stock items. Custom orders may take 2-3 weeks.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Do you provide installation services?</h3>
              <p className="text-gray-600">Yes, we have certified installers available across major cities. Installation charges are separate and depend on the area and complexity.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">What is your return policy?</h3>
              <p className="text-gray-600">We offer a 30-day return policy for unused tiles in original packaging. Custom-cut tiles are non-returnable.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Do you offer bulk discounts?</h3>
              <p className="text-gray-600">Yes, we provide attractive discounts for bulk orders above 500 sq ft. Contact our sales team for custom pricing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-blue-50 text-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Need Immediate Assistance?</h2>
          <p className="text-lg mb-8">Our customer support team is available to help you</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+919876543210" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
              Call Now: +91 98765 43210
            </a>
            <a href="https://wa.me/919876543210" className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition duration-300">
              WhatsApp Chat
            </a>
          </div>
        </div>
      </section>
      <ExtraContent />
    </div>
  );
};

export default Contact;