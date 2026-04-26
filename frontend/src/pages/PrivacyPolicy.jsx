// src/pages/PrivacyPolicy.jsx
import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="container py-5" style={{ maxWidth: '800px', minHeight: '70vh' }}>
      <h1 className="fw-bold text-primary mb-4">Privacy Policy</h1>
      <p className="text-muted mb-4">Last updated: March 2026</p>

      <section className="mb-4">
        <h4 className="fw-bold">1. Information We Collect</h4>
        <p className="text-muted">
          We collect information you provide directly to us when you create an account, make a booking, or contact customer support. This may include your name, email address, phone number, and payment information.
        </p>
      </section>

      <section className="mb-4">
        <h4 className="fw-bold">2. How We Use Your Information</h4>
        <p className="text-muted">
          We use the information we collect to process your bookings, send you confirmations, provide customer service, and improve our platform. We may also use your email to send promotional offers, which you can opt out of at any time.
        </p>
      </section>

      <section className="mb-4">
        <h4 className="fw-bold">3. Information Sharing</h4>
        <p className="text-muted">
          We share your necessary booking details (such as your name and reservation dates) with the specific hotels, restaurants, and tour operators you have booked through TripZen. We do not sell your personal data to third parties.
        </p>
      </section>

      <section className="mb-4">
        <h4 className="fw-bold">4. Data Security</h4>
        <p className="text-muted">
          We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;