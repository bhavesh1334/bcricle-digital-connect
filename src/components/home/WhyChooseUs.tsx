
import React from 'react';

const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="#FFD700">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'Local Community Focus',
    description: 'Built for Chhattisgarh businesses: hyperlocal insight, trusted connections.'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="#FFD700">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Direct Contact Model',
    description: 'Message, call, or WhatsApp local businesses instantly — no middlemen, no delays.'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="#FFD700">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Verified Businesses',
    description: 'Premium listings are verified, so you always connect with legitimate partners.'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="#FFD700">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
    title: 'Extensive Categories',
    description: 'From IT to healthcare, we cover all business sectors and dreams.'
  }
];

const WhyChooseUs = () => (
  <section className="py-16 bg-gradient-to-br from-[#e8eaf6] via-white to-[#f3f7fa]">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4 text-[#0a3572]">
          Why Choose <span className="bg-gradient-to-r from-[#FFD700] to-[#f39c12] bg-clip-text text-transparent">CBN</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          The platform built for Chhattisgarh's business ecosystem, making local connections easier than ever.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-white shadow-md rounded-xl border border-[#EDEDED] p-7 hover:scale-105 hover:shadow-xl hover:border-[#FFD700]/70 transition-all duration-300"
          >
            <div className="flex-shrink-0">{feature.icon}</div>
            <div className="text-center md:text-left">
              <h3 className="font-montserrat font-semibold text-xl mb-2 text-[#09488A]">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
