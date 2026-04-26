// src/pages/FoodPage.jsx (or src/components/FoodPage.jsx)
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function FoodPage() {
  const [foodSources, setFoodSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/getFood') 
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch food data');
        }
        return response.json();
      })
      .then((data) => {
        setFoodSources(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching food:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="container mt-5 text-center">Loading beautifully crafted food...</div>;
  if (error) return <div className="container mt-5 text-center text-danger">Error: {error}</div>;

  return (
    <div className="food-page-wrapper py-5">
      {/* The Stylized Header */}
      <div className="text-center mb-5">
        <h2 className="header-title d-inline-block me-2">RECIPES MADE FOR</h2>
        <span className="header-script">real, actual, everyday life.</span>
      </div>
      
      {foodSources.length === 0 ? (
        <p className="text-center">No food sources found. Please add some via Postman!</p>
      ) : (
        /* The 4-Column Grid */
        <div className="container-fluid px-4">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            {foodSources.map((place, index) => (
              <div key={place._id || index} className="col">
                
                {/* The Image Container (Now Clickable!) */}
                <div 
                  className="food-image-container"
                  onClick={() => navigate(`/food/${place._id}`)} 
                >
                  <img 
                    src={place.image} 
                    alt={place.name} 
                    className="food-image"
                  />
                  
                  {/* The Gold Label */}
                  <div className="gold-label">
                    {place.name.length > 20 ? place.name.substring(0, 20) + '...' : place.name}
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="hover-overlay">
                    <p>{place.cuisine}</p>
                    <p>{place.rating} ⭐ | {place.priceRange}</p>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- CUSTOM CSS FOR THIS SPECIFIC LOOK --- */}
      <style>
        {`
          .food-page-wrapper {
            background-color: #f9f9f9; 
            min-height: 100vh;
          }
          .header-title {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            font-size: 1.1rem;
            font-weight: 700;
            letter-spacing: 3px;
            text-transform: uppercase;
            color: #111;
            margin: 0;
            vertical-align: middle;
          }
          .header-script {
            font-family: 'Brush Script MT', 'Caveat', 'Great Vibes', cursive;
            font-size: 2rem;
            color: #6a5353; 
            vertical-align: middle;
          }
          .food-image-container {
            position: relative;
            margin-bottom: 30px; 
            cursor: pointer;
            overflow: visible; 
          }
          .food-image {
            width: 100%;
            height: 450px; 
            object-fit: cover; 
            display: block;
            box-shadow: 0 4px 10px rgba(0,0,0,0.05); 
          }
          .gold-label {
            position: absolute;
            bottom: -15px; 
            left: 50%;
            transform: translateX(-50%); 
            background-color: #e5b35c; 
            color: #fff;
            padding: 10px 24px;
            font-size: 0.85rem;
            font-weight: 700;
            letter-spacing: 2px;
            text-transform: uppercase;
            white-space: nowrap;
            z-index: 2;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          .hover-overlay {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0, 0, 0, 0.6);
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: opacity 0.3s ease;
            text-align: center;
            padding: 20px;
          }
          .food-image-container:hover .hover-overlay {
            opacity: 1;
          }
          .hover-overlay p {
            margin: 5px 0;
            font-size: 1.1rem;
            font-weight: bold;
            letter-spacing: 1px;
          }
        `}
      </style>
    </div>
  );
}

export default FoodPage;