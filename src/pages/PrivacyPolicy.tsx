import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200 mr-4">
          <ChevronLeft className="w-5 h-5 mr-1" /> Back
        </button>        <h1 className="text-4xl font-bold text-center text-gray-800 flex-grow">Privacy Policy</h1>
      </div>

      <section className="mb-10 pb-6 border-b border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Introduction</h2>
        <p className="text-gray-600 leading-relaxed">
          Welcome to our Business Directory. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the site.
        </p>
      </section>

      <section className="mb-10 pb-6 border-b border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Information We Collect</h2>
        <p className="text-gray-600 leading-relaxed">
          We collect information that you provide directly to us when you use our services. This may include personal information such as your name, email address, phone number, business name, business address, business category, and other details you provide when registering your business, creating an account, or contacting us.
        </p>
        <p className="text-gray-600 leading-relaxed mt-4">
          We may also collect non-personal information automatically as you navigate through the site, such as your IP address, browser type, operating system, and usage details.
        </p>
      </section>

      <section className="mb-10 pb-6 border-b border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">How We Use Your Information</h2>
        <p className="text-gray-600 leading-relaxed">
          We use the information we collect for various purposes, including to:
        </p>
        <ul className="list-disc list-inside text-gray-600 leading-relaxed mt-4 space-y-2">
          <li>Provide and maintain our Business Directory service</li>
          <li>Display business listings and related information</li>
          <li>Communicate with you, including responding to inquiries and providing updates</li>
          <li>Process your registration and manage your account</li>
          <li>Improve our website and services</li>
          <li>Personalize your experience on the site</li>
          <li>Detect and prevent fraud and other illegal activities</li>
        </ul>
      </section>

      <section className="mb-10 pb-6 border-b border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Disclosure of Your Information</h2>
        <p className="text-gray-600 leading-relaxed">
          We may share your information with third parties under certain circumstances, such as with service providers who assist us in operating our website and providing our services. We may also disclose information if required by law or in response to valid requests by public authorities.
        </p>
        <p className="text-gray-600 leading-relaxed mt-4">
          Business information provided for listings will be publicly available on the directory.
        </p>
      </section>

      <section className="mb-10 pb-6 border-b border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Data Security</h2>
        <p className="text-gray-600 leading-relaxed">
          We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. However, the transmission of information via the internet is not completely secure, and we cannot guarantee the security of your personal information transmitted to our site.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Changes to This Privacy Policy</h2>
        <p className="text-gray-600 leading-relaxed">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;