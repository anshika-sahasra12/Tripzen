// src/pages/Terms.jsx
import React from 'react';

const Terms = () => {
  return (
    <div className="container py-5" style={{ maxWidth: '800px', minHeight: '70vh' }}>
      <h1 className="fw-bold text-primary mb-4">Terms & Conditions</h1>
      <p className="text-muted mb-4">Last updated: March 2026</p>

      <section className="mb-4">
        <h4 className="fw-bold">1. Agreement to Terms</h4>
        <p className="text-muted">
          By accessing or using TripZen, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access our service.
        </p>
      </section>

      <section className="mb-4">
        <h4 className="fw-bold">2. Booking and Payments</h4>
        <p className="text-muted">
          All bookings are subject to availability. Prices are subject to change without notice prior to booking confirmation. You agree to provide current, complete, and accurate purchase and account information for all purchases made via our platform.
        </p>
      </section>

      <section className="mb-4">
        <h4 className="fw-bold">3. Cancellations and Refunds</h4>
        <p className="text-muted">
          Cancellation policies vary depending on the specific hotel, package, or restaurant. Please review the specific cancellation policy provided at the time of booking. TripZen reserves the right to charge cancellation fees as outlined by our partners.
        </p>
      </section>

      <section className="mb-4">
        <h4 className="fw-bold">4. Limitation of Liability</h4>
        <p className="text-muted">
          TripZen acts as an intermediary between you and travel service providers. We are not liable for any injuries, damages, losses, or delays incurred during your travel experiences.
        </p>
      </section>
    </div>
  );
};

export default Terms;