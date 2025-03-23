
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactInformation from '@/components/support/ContactInformation';
import AdminTeam from '@/components/support/AdminTeam';
import SupportForm from '@/components/support/SupportForm';
import FAQ from '@/components/support/FAQ';

const CustomerSupport = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-gradient-to-b from-harvest-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 mt-16">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Customer Support</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're here to help! Feel free to reach out with any questions about your orders, products, or suggestions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Support Info */}
            <div className="lg:col-span-1">
              <ContactInformation />
              <AdminTeam />
            </div>
            
            {/* Support Form and FAQ */}
            <div className="lg:col-span-2">
              <SupportForm />
              <FAQ />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CustomerSupport;
