
import React from 'react';

const FAQ = () => {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-3">Frequently Asked Questions</h2>
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-medium">How do I track my order?</h3>
          <p className="text-sm text-gray-600 mt-1">
            You can track your order by logging into your account and visiting the order history section.
          </p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-medium">What is your return policy?</h3>
          <p className="text-sm text-gray-600 mt-1">
            If you're not satisfied with the quality of the products, you can request a refund within 24 hours of delivery.
          </p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-medium">How can I place a bulk order?</h3>
          <p className="text-sm text-gray-600 mt-1">
            For bulk orders, please use our dedicated <a href="/bulk-order-request" className="text-harvest-600 hover:underline">Bulk Order Request</a> form or contact our team directly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
