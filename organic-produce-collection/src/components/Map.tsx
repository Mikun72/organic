
import React, { useEffect, useRef } from 'react';

const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Use Google Maps embed for Rajdhani College, Baramunda
    const iframe = document.createElement('iframe');
    iframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.7072714769874!2d85.7796638!3d20.2728918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19a7a3b9692fff%3A0x87e342a4eca11ad5!2sRajdhani%20College%2C%20Baramunda%2C%20Bhubaneswar%2C%20Odisha%20751003!5e0!m2!1sen!2sin!4v1621345678901!5m2!1sen!2sin";
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.style.border = "0";
    iframe.allowFullscreen = false;
    iframe.loading = "lazy";
    iframe.referrerPolicy = "no-referrer-when-downgrade";
    
    if (mapRef.current) {
      mapRef.current.innerHTML = "";
      mapRef.current.appendChild(iframe);
    }
    
    return () => {
      if (mapRef.current) {
        mapRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-md" ref={mapRef}>
      <div className="flex items-center justify-center h-full bg-gray-100 text-gray-500">
        Loading map of Rajdhani College, Baramunda, Bhubaneswar, Odisha, India - 751003...
      </div>
    </div>
  );
};

export default Map;
