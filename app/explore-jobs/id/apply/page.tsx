'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ApplyJobPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      router.push('/dashboard'); // Direct to operational tracking dashboard
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto text-center p-12 bg-green-50 border border-green-200 rounded-xl mt-12">
        <h2 className="text-2xl font-bold text-green-700">Application Submitted!</h2>
        <p className="text-gray-600 mt-2">Redirecting you back to your workspace dashboard tracking panel...</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white border rounded-xl mt-10">
      <h1 className="text-2xl font-bold mb-2">Submit Application</h1>
      <p className="text-sm text-gray-500 mb-6">Applying for System Position ID: {params.id}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input required type="text" className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input required type="email" className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cover Letter / Pitch</label>
          <textarea rows={4} required className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-500" placeholder="Why are you the perfect fit for Kika?"></textarea>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white font-medium py-2.5 rounded-md hover:bg-blue-700">
          Submit Application Package
        </button>
      </form>
    </div>
  );
}
