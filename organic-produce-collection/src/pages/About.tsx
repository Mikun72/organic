
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Leaf, Truck, Users, ShieldCheck, MapPin } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero section */}
        <section className="bg-gradient-to-b from-harvest-50 to-white py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 fade-up-1">Our Story</h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 fade-up-2">
              Fresh Harvest Hub connects local farmers directly with consumers who value fresh, 
              organic, and sustainably grown produce.
            </p>
          </div>
        </section>
        
        {/* Mission section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-4xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="fade-up-1">
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-muted-foreground mb-4">
                  At Fresh Harvest Hub, we believe everyone deserves access to fresh, locally grown produce. 
                  Our mission is to create a sustainable food ecosystem that benefits farmers, consumers, and the planet.
                </p>
                <p className="text-muted-foreground">
                  We strive to reduce food miles, support local economies, and promote sustainable farming practices 
                  that protect our soil, water, and biodiversity for generations to come.
                </p>
              </div>
              <div className="bg-secondary rounded-lg p-8 fade-up-2">
                <img 
                  src="https://images.unsplash.com/photo-1498579150354-977475b7ea0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80" 
                  alt="Farmer working in a field" 
                  className="rounded-lg w-full h-auto object-cover shadow-md"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Values section */}
        <section className="py-16 px-4 bg-secondary/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm fade-up-1 hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-harvest-100 rounded-full flex items-center justify-center mb-4">
                  <Leaf className="text-harvest-700" />
                </div>
                <h3 className="text-xl font-bold mb-2">Sustainability</h3>
                <p className="text-muted-foreground">
                  We promote eco-friendly farming practices that protect our soil and water resources.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm fade-up-2 hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-harvest-100 rounded-full flex items-center justify-center mb-4">
                  <Truck className="text-harvest-700" />
                </div>
                <h3 className="text-xl font-bold mb-2">Local Focus</h3>
                <p className="text-muted-foreground">
                  We reduce food miles by connecting you with farmers in your community.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm fade-up-3 hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-harvest-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="text-harvest-700" />
                </div>
                <h3 className="text-xl font-bold mb-2">Fair Pricing</h3>
                <p className="text-muted-foreground">
                  We ensure farmers receive fair compensation while keeping prices reasonable for consumers.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm fade-up-4 hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-harvest-100 rounded-full flex items-center justify-center mb-4">
                  <ShieldCheck className="text-harvest-700" />
                </div>
                <h3 className="text-xl font-bold mb-2">Quality Assurance</h3>
                <p className="text-muted-foreground">
                  We verify all produce meets strict quality and safety standards before delivery.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Location section with map */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-10 fade-up-1">
              <h2 className="text-3xl font-bold mb-4">Visit Us</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our main location is at Rajdhani College, Baramunda, Bhubaneswar, Odisha, India. 
                Come visit us to see our operations and meet our team!
              </p>
            </div>
            
            <div className="mb-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.0984431375147!2d85.79936547597032!3d20.27943621541641!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19a7dab9202e43%3A0xb050fe578c102895!2sRajdhani%20College!5e0!3m2!1sen!2sin!4v1710871126309!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0, borderRadius: '0.5rem' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Rajdhani College Map"
                className="shadow-md fade-up-2"
              ></iframe>
            </div>
            
            <div className="mt-6 flex items-center justify-center fade-up-3">
              <MapPin className="text-harvest-600 mr-2" />
              <span className="text-muted-foreground">
                N1/154, Near Baramunda Fire Station, Baramunda Square, Nayapalli, CRPF Colony, IRC Village, Nayapalli, Rajdhani College Rd, IRC Village, Baramunda, Bhubaneswar, Odisha 751003
              </span>
            </div>
          </div>
        </section>
        
        {/* Team section */}
        <section className="py-16 px-4 bg-secondary/20">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
              We're a passionate team of food enthusiasts, agricultural experts, and technology innovators 
              committed to transforming how people access fresh food.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              {/* Team members */}
              <div className="fade-up-1">
                <div className="aspect-square bg-secondary rounded-full mb-4 overflow-hidden">
                  <img 
                    src="https://ik.imagekit.io/Subhransu/Mamun.jpg?updatedAt=1742743038614"
                    alt="Soumyashree Nayak" 
                    className="w-full h-full object-fill"
                  />
                </div>
                <h3 className="font-bold">Soumyashree Nayak</h3>
                <p className="text-sm text-muted-foreground">
                  CEO and Founder
                </p>
              </div>

              <div className="fade-up-2">
                <div className="aspect-square bg-secondary rounded-full mb-4 overflow-hidden">
                  <img 
                    src="https://ik.imagekit.io/Subhransu/MIKUN%2019.jpg?updatedAt=1742743038903"
                    alt="Subhransu Mohapatra" 
                    className="w-full h-full object-fill"
                  />
                </div>
                <h3 className="font-bold">Subhransu Mohapatra</h3>
                <p className="text-sm text-muted-foreground">
                  Lead Developer cum Head of Operations
                </p>
              </div>

              <div className="fade-up-3">
                <div className="aspect-square bg-secondary rounded-full mb-4 overflow-hidden">
                  <img 
                    src="https://ik.imagekit.io/Subhransu/SWASTIK.jpg?updatedAt=1742743038896"
                    alt="Swastik Kumar Das" 
                    className="w-full h-full object-fill"
                  />
                </div>
                <h3 className="font-bold">Swastik Kumar Das</h3>
                <p className="text-sm text-muted-foreground">
                  Head of Logistics and Order Manager cum Lead Agriculturist
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
