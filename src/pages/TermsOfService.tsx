import { ChevronLeft } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const TermsOfService: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
       <div className="flex items-center mb-8">
        <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200 mr-4">
          <ChevronLeft className="w-5 h-5 mr-1" /> Back
        </button>        <h1 className="text-4xl font-bold text-center text-gray-800 flex-grow">Terms of Service</h1>
      </div>

      <section className="mb-10 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Acceptance of Terms</h2>
        <p className="text-gray-700 leading-relaxed">
          By accessing and using the Business Directory application, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use the application.
        </p>
      </section>

      <section className="mb-10 p-6 bg-white rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">2. User Responsibilities</h2>
        <p className="text-gray-700 leading-relaxed">
          You are responsible for your use of the application and for any content you provide. You agree to use the application only for lawful purposes and in a manner that does not infringe the rights of others.
        </p>
        <p className="text-gray-700 leading-relaxed mt-3">
          You agree not to:
        </p>
        <ul className="list-disc list-inside text-gray-700 mt-3 space-y-2">
          <li>Post or transmit any content that is false, misleading, or harmful.</li>
          <li>Engage in any activity that disrupts or interferes with the application.</li>
          <li>Attempt to gain unauthorized access to the application or its systems.</li>
          <li>Use the application for any commercial purposes without our prior written consent.</li>
        </ul>
      </section>

      <section className="mb-10 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Acceptable Use</h2>
        <p className="text-gray-700 leading-relaxed">
          The Business Directory application is intended for finding and listing businesses. You agree to use the information provided within the application for legitimate purposes only.
        </p>
        <p className="text-gray-700 leading-relaxed mt-3">
          You may not:
        </p>
        <ul className="list-disc list-inside text-gray-700 mt-3 space-y-2">
          <li>Scrape or systematically collect data from the application.</li>
          <li>Use the application to send unsolicited marketing messages.</li>
          <li>Misrepresent your identity or affiliation.</li>
        </ul>
      </section>

      <section className="mb-10 p-6 bg-white rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Disclaimer of Warranties</h2>
        <p className="text-gray-700 leading-relaxed">
          The Business Directory application is provided "as is" and without any warranties, express or implied. We do not guarantee the accuracy, completeness, or reliability of any content on the application.
        </p>
      </section>

      <section className="mb-10 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Limitation of Liability</h2>
        <p className="text-gray-700 leading-relaxed">
          We will not be liable for any damages arising from your use of the application.
        </p>
      </section>

      <section className="mb-10 p-6 bg-white rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Changes to Terms</h2>
        <p className="text-gray-700 leading-relaxed">
          We reserve the right to modify these Terms of Service at any time. Your continued use of the application after any changes constitutes your acceptance of the new terms.
        </p>
      </section>

      <section className="p-6 bg-gray-50 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Contact Information</h2>
        <p className="text-gray-700 leading-relaxed">
          If you have any questions about these Terms of Service, please contact us.
        </p>
      </section>
    </div>
  );
};

export default TermsOfService;