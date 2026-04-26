// src/pages/About.jsx
import React from 'react';

const About = () => {
  return (
    <div className="container py-5">
      <div className="row align-items-center mb-5">
        <div className="col-lg-6">
          <h1 className="fw-bold text-primary mb-3">About TripZen</h1>
          <p className="lead text-muted">
            Your trusted travel partner for memorable journeys and exceptional hotel experiences.
          </p>
          <p className="text-muted">
            Founded in 2026, TripZen was created with a single mission: to make world-class travel accessible, seamless, and unforgettable. Whether you are looking for a luxury hotel stay, a guided tour package, or the best local culinary experiences, we curate the finest options for the discerning explorer.
          </p>
        </div>
        <div className="col-lg-6 text-center">
          <img 
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80" 
            alt="Travel Airplane" 
            className="img-fluid rounded-4 shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default About;