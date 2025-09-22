import React from 'react';

const ExtraContent = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-8 text-gray-800">Additional Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <h3 className="text-lg font-semibold mb-3">Quality Assurance</h3>
            <p className="text-gray-600">Every tile undergoes rigorous quality testing to ensure durability and performance standards are met consistently.</p>
          </div>
          <div className="text-center p-6">
            <h3 className="text-lg font-semibold mb-3">Expert Guidance</h3>
            <p className="text-gray-600">Our experienced team provides personalized recommendations based on your specific requirements and preferences.</p>
          </div>
          <div className="text-center p-6">
            <h3 className="text-lg font-semibold mb-3">Nationwide Service</h3>
            <p className="text-gray-600">We deliver across India with professional installation services available in major cities nationwide.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExtraContent;