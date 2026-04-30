
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const CancellationPolicyPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Banner Section */}
      <section className="relative h-96 flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80')" }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-serif font-bold mb-4">Cancellation & Refund Policy</h1>
          <p className="text-xl font-light">Fair and transparent cancellation terms</p>
        </div>
      </section>

      <main className="section-padding">
        <div className="container-custom max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-serif font-bold text-stone-800 mb-6">Cancellation & Refund Policy</h2>
            
            <h3 className="text-2xl font-serif font-semibold text-stone-800 mb-4">1. Cancellation Timeline</h3>
            <p className="text-stone-600 mb-6">
              To ensure fairness to all our guests and to manage our accommodations effectively, we have established 
              the following cancellation policy:
            </p>
            <ul className="text-stone-600 mb-6 list-disc pl-6">
              <li>48+ hours before check-in: 100% refund</li>
              <li>24-48 hours before check-in: 50% refund</li>
              <li>Less than 24 hours or no-show: No refund</li>
            </ul>

            <h3 className="text-2xl font-serif font-semibold text-stone-800 mb-4">2. Refund Processing</h3>
            <p className="text-stone-600 mb-6">
              Refunds will be processed within 7-10 business days to the original payment method. Please note that 
              it may take additional time for your bank or credit card company to process the refund.
            </p>

            <h3 className="text-2xl font-serif font-semibold text-stone-800 mb-4">3. Modification Policy</h3>
            <p className="text-stone-600 mb-6">
              We understand that plans can change. You may modify your reservation up to 24 hours before your scheduled 
              check-in time, subject to availability. Modifications that result in a rate increase will require additional 
              payment.
            </p>

            <h3 className="text-2xl font-serif font-semibold text-stone-800 mb-4">4. Weather & Emergency Cancellations</h3>
            <p className="text-stone-600 mb-6">
              In case of severe weather conditions or unforeseen emergencies that prevent travel, we may waive our 
              standard cancellation policy on a case-by-case basis. Please contact us as soon as possible if such 
              circumstances arise.
            </p>

            <h3 className="text-2xl font-serif font-semibold text-stone-800 mb-4">5. Package & Long-term Stay Cancellations</h3>
            <p className="text-stone-600 mb-6">
              Special cancellation terms may apply to Easy Stay Packages and extended stays. These terms will be clearly 
              communicated at the time of booking and included in your confirmation email.
            </p>

            <h3 className="text-2xl font-serif font-semibold text-stone-800 mb-4">6. Group Bookings</h3>
            <p className="text-stone-600 mb-6">
              Group bookings (5+ rooms) may have different cancellation terms. Please contact our reservations team 
              for specific group booking policies.
            </p>

            <h3 className="text-2xl font-serif font-semibold text-stone-800 mb-4">7. Contact for Cancellations</h3>
            <p className="text-stone-600 mb-6">
              To cancel your reservation, please contact us:
              <br />
              Email: reservations@edengraciousliving.com
              <br />
              Phone: +91-7533909333
              <br />
              Online: Through your booking confirmation link
            </p>

            <p className="text-stone-500 text-sm mt-8">
              This policy is effective as of December 2024 and applies to all new bookings.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CancellationPolicyPage;
