'use client';
import { useState } from 'react';
import Link from 'next/link';

interface ServiceItem {
  name: string;
  desc: string;
  path: string;
  icon: string;
}

export default function ServicesDropdown() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const services: ServiceItem[] = [
    {
      name: 'Kika Money Transfer',
      desc: 'Remittance tiers & low-cost global transfers',
      path: '/services/kika-money',
      icon: '💰'
    },
    {
      name: 'Global VoIP Calls',
      desc: 'Cheap communication profiles & active lines',
      path: '/services/voip-calls',
      icon: '📞'
    },
    {
      name: 'Cooperative Saving & Credits',
      desc: 'Micro-loans, pooling, & shared investments',
      path: '/services/coop-savings',
      icon: '🏦'
    }
  ];

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium inline-flex items-center gap-1 transition"
      >
        Services
        <svg 
          className={`w-4 h-4 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 origin-top-right rounded-xl bg-white shadow-xl ring-1 ring-black ring-opacity-5 z-50 p-2 divide-y divide-gray-100">
          {services.map((service, index) => (
            <Link 
              key={index} 
              href={service.path}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition group"
            >
              <span className="text-2xl p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition">
                {service.icon}
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-900">{service.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{service.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
