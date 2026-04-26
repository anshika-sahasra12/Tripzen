// src/pages/Services.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    { title: "Luxury Hotels", desc: "Book top-rated stays with the best amenities.", link: "/all-listings", icon: "🏨" },
    { title: "Curated Packages", desc: "Enjoy fully planned trips and tours to global destinations.", link: "/packages", icon: "✈️" },
    { title: "Dining Reservations", desc: "Secure tables at the finest local restaurants.", link: "/food", icon: "🍽️" }
  ];

  return (
    <div className="container py-5 text-center" style={{ minHeight: '70vh' }}>
      <h1 className="fw-bold text-primary mb-4">Our Services</h1>
      <p className="lead text-muted mb-5">Everything you need for the perfect getaway.</p>
      
      <div className="row g-4">
        {services.map((srv, index) => (
          <div key={index} className="col-md-4">
            <div className="card h-100 shadow-sm border-0 py-4">
              <div className="card-body">
                <div className="display-4 mb-3">{srv.icon}</div>
                <h4 className="fw-bold">{srv.title}</h4>
                <p className="text-muted">{srv.desc}</p>
                <Link to={srv.link} className="btn btn-outline-primary mt-2 rounded-pill px-4">Explore</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;