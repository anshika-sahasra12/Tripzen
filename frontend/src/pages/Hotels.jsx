import React, { useEffect, useState } from "react";

const Hotels = () => {

  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/getHotels")
      .then(res => res.json())
      .then(data => setHotels(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Hotels</h1>

      {hotels.map((hotel) => (
        <div key={hotel._id} style={{
          border: "1px solid #ddd",
          margin: "20px",
          padding: "20px",
          borderRadius: "10px"
        }}>
          <img
            src={hotel.image}
            alt={hotel.name}
            style={{ width: "300px", borderRadius: "10px" }}
          />

          <h2>{hotel.name}</h2>

          <p>📍 {hotel.location}</p>

          <p>💰 ₹{hotel.price}</p>

          <p>🛏 Rooms Available: {hotel.roomsAvailable}</p>

          <p>
            🍽 Food Available: {hotel.foodAvailable ? "Yes" : "No"}
          </p>

          <p>📞 {hotel.contact}</p>
        </div>
      ))}
    </div>
  );
};

export default Hotels;