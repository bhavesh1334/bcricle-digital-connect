import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const TermsAndConditions = () => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200 mr-4">
          <ChevronLeft className="w-5 h-5 mr-1" /> Back
        </button>
        <h1 className="text-4xl font-bold text-center text-gray-800 flex-grow">Terms and Conditions</h1>
      </div>

      <section className="mb-10 pb-6 border-b border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Membership Eligibility</h2>
        <p className="text-gray-600 leading-relaxed">
          Membership is open to businesses, professionals, and freelancers in or linked to Chhattisgarh.
        </p>
      </section>

      <section className="mb-10 pb-6 border-b border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Membership Fee</h2>
        <p className="text-gray-600 leading-relaxed">
          Annual membership fee is ₹10,000, non-refundable and non-transferable.
        </p>
      </section>

      <section className="mb-10 pb-6 border-b border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Business Profile</h2>
        <p className="text-gray-600 leading-relaxed">
          CBN creates your business profile, which you can later edit and manage.
        </p>
      </section>

      <section className="mb-10 pb-6 border-b border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Information Accuracy</h2>
        <p className="text-gray-600 leading-relaxed">
          Members must provide accurate and legal business information.
        </p>
      </section>

      <section className="mb-10 pb-6 border-b border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Platform Usage</h2>
        <p className="text-gray-600 leading-relaxed">
          Platform is for networking, not for spam, fraud, or misuse.
        </p>
      </section>

      <section className="mb-10 pb-6 border-b border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Content Usage</h2>
        <p className="text-gray-600 leading-relaxed">
          CBN may use your content for listings and promotional purposes.
        </p>
      </section>

      <section className="mb-10 pb-6 border-b border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Professional Conduct</h2>
        <p className="text-gray-600 leading-relaxed">
          Members must maintain professional conduct at all times.
        </p>
      </section>

      <section className="mb-10 pb-6 border-b border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Misuse Policy</h2>
        <p className="text-gray-600 leading-relaxed">
          Misuse or misconduct may lead to membership suspension or termination.
        </p>
      </section>

      <section className="mb-10 pb-6 border-b border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Data Privacy</h2>
        <p className="text-gray-600 leading-relaxed">
          Your data is kept private and only shared with trusted partners when needed.
        </p>
      </section>

      <section className="mb-10 pb-6 border-b border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Terms Modification</h2>
        <p className="text-gray-600 leading-relaxed">
          Features, pricing, or terms may change with prior notice.
        </p>
      </section>

      <section className="mb-10 pb-6 border-b border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Liability</h2>
        <p className="text-gray-600 leading-relaxed">
          CBN is not liable for any losses or disputes between members.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Jurisdiction</h2>
        <p className="text-gray-600 leading-relaxed">
          Legal matters fall under the jurisdiction of courts in Raipur, Chhattisgarh.
        </p>
      </section>
    </div>
  );
};

export default TermsAndConditions; 