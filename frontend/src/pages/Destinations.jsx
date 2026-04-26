// src/pages/Destinations.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Destinations = () => {
  // A beautiful list of top destinations to inspire your users
  const destinationsData = [
    {
      id: 1,
      name: "Bali, Indonesia",
      description: "Tropical beaches, volcanic mountains, and iconic rice paddies.",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
      tag: "Popular"
    },
    {
      id: 2,
      name: "Santorini, Greece",
      description: "Stunning sunsets, white-washed houses, and crystal clear waters.",
      image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=600&q=80",
      tag: "Romantic"
    },
    {
      id: 3,
      name: "Kyoto, Japan",
      description: "Classical Buddhist temples, as well as gardens, imperial palaces, and Shinto shrines.",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80",
      tag: "Cultural"
    },
    {
      id: 4,
      name: "Paris, France",
      description: "The global center for art, fashion, gastronomy, and culture.",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80",
      tag: "Trending"
    },
    {
      id: 5,
      name: "Maldives",
      description: "Unrivaled luxury, stunning white-sand beaches, and an amazing underwater world.",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=600&q=80",
      tag: "Luxury"
    },
    {
      id: 6,
      name: "Swiss Alps, Switzerland",
      description: "Dramatic peaks, pristine lakes, and world-class skiing resorts.",
      image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80",
      tag: "Adventure"
    }
  ];

  return (
    <div className="destinations-page py-5 bg-light" style={{ minHeight: '80vh' }}>
      
      {/* Page Header */}
      <div className="container text-center mb-5">
        <h1 className="fw-bold text-primary display-5 mb-3">Explore Top Destinations</h1>
        <p className="lead text-muted mx-auto" style={{ maxWidth: "600px" }}>
          Discover the world's most breathtaking locations. Where will your next adventure take you?
        </p>
      </div>

      {/* Destinations Grid */}
      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {destinationsData.map((dest) => (
            <div key={dest.id} className="col">
              <div className="card h-100 border-0 shadow-sm destination-card rounded-4 overflow-hidden">
                
                {/* Image Container with Hover Zoom */}
                <div className="img-container position-relative overflow-hidden" style={{ height: '250px' }}>
                  <img 
                    src={dest.image} 
                    alt={dest.name} 
                    className="destination-img w-100 h-100 object-fit-cover"
                  />
                  <span className="badge bg-warning text-dark position-absolute top-0 end-0 m-3 px-3 py-2 rounded-pill shadow-sm">
                    {dest.tag}
                  </span>
                </div>

                {/* Card Content */}
                <div className="card-body p-4 d-flex flex-column text-center">
                  <h4 className="fw-bold mb-2">{dest.name}</h4>
                  <p className="text-muted small mb-4 flex-grow-1">{dest.description}</p>
                  
                  {/* Action Buttons to guide them back to your features */}
                  <div className="d-flex gap-2 justify-content-center">
                    <Link to="/packages" className="btn btn-outline-primary rounded-pill px-4 flex-grow-1">
                      View Packages
                    </Link>
                    <Link to="/all-listings" className="btn btn-primary rounded-pill px-4 flex-grow-1">
                      Find Hotels
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom CSS for the smooth image hover zoom effect */}
      <style>
        {`
          .destination-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .destination-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
          }
          .destination-img {
            transition: transform 0.5s ease;
          }
          .destination-card:hover .destination-img {
            transform: scale(1.1); /* Creates a beautiful zoom effect on hover */
          }
        `}
      </style>
    </div>
  );
};

export default Destinations;