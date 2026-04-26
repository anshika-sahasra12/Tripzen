// src/pages/FoodDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

function FoodDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Data states
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Booking Form states
  const [showForm, setShowForm] = useState(false);
  const [bookingStatus, setBookingStatus] = useState("");
  const [reservation, setReservation] = useState({
    date: "",
    time: "",
    guests: 2
  });

  // State to control our beautiful login prompt
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/getFood/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch food details");
        return response.json();
      })
      .then((data) => {
        setFood(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleInputChange = (e) => {
    setReservation({ ...reservation, [e.target.name]: e.target.value });
  };

  // ⭐ THE FIXED BOOKING FUNCTION ⭐
  const handleConfirmBooking = async (e) => {
    e.preventDefault(); 
    
    // 1. Smart Token Retrieval (Looks in both possible places based on your App.jsx)
    let token = localStorage.getItem("token");
    
    if (!token) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          token = parsedUser.token || null;
        } catch (err) {
          console.error("Error parsing stored user data");
        }
      }
    }
    
    // 2. If STILL no token found, show the custom auth modal
    if (!token) {
      setShowAuthPrompt(true);
      return;
    }

    setBookingStatus("Booking...");

    try {
      const formattedOrderName = `${food.name} (Table for ${reservation.guests} on ${reservation.date} at ${reservation.time})`;

      const response = await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Pass the safely found token!
        },
        body: JSON.stringify({
          type: "food",
          listingId: food._id,
          listingName: formattedOrderName, 
          amount: 0, 
        }),
      });

      if (response.ok) {
        setBookingStatus("Reservation Confirmed!");
        setTimeout(() => {
          navigate("/orders"); 
        }, 1500);
      } else {
        const errData = await response.json();
        alert(`Booking failed: ${errData.message}`);
        setBookingStatus("");
      }
    } catch (err) {
      console.error("Booking error:", err);
      alert("An error occurred while booking.");
      setBookingStatus("");
    }
  };

  if (loading) return <div className="text-center mt-5 py-5 h4">Loading delicious details...</div>;
  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;
  if (!food) return <div className="text-center mt-5">Food not found.</div>;

  return (
    <div className="food-details-page pb-5 position-relative">
      
      {/* THE NEW AUTHENTICATION MODAL OVERLAY */}
      {showAuthPrompt && (
        <div className="custom-modal-overlay">
          <div className="custom-modal-card shadow-lg">
            <div className="text-center mb-4">
              <i className="bi bi-person-circle text-primary" style={{ fontSize: "3rem" }}></i>
              <h3 className="fw-bold mt-2">Almost there!</h3>
              <p className="text-muted">Please sign in or create a free account to secure your table at {food.name}.</p>
            </div>
            
            <div className="d-grid gap-3">
              <button onClick={() => navigate("/login", { state: { from: location.pathname } })} className="btn btn-primary btn-lg rounded-pill fw-bold">
                Log In
              </button>
              <button onClick={() => navigate("/signup", { state: { from: location.pathname } })} className="btn btn-outline-dark btn-lg rounded-pill fw-bold">
                Create an Account
              </button>
              <button onClick={() => setShowAuthPrompt(false)} className="btn btn-link text-muted mt-2 text-decoration-none">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Image Section */}
      <div 
        className="hero-image-section position-relative"
        style={{ 
          backgroundImage: `url(${food.image})`,
          height: '50vh',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="overlay-dark"></div>
        <button 
          className="btn btn-light position-absolute top-0 start-0 m-4 shadow"
          onClick={() => navigate(-1)} 
          style={{ zIndex: 10, borderRadius: '50%' }}
        >
          ← Back
        </button>
      </div>

      {/* Content Section */}
      <div className="container mt-n5 position-relative" style={{ zIndex: 5, marginTop: '-80px' }}>
        <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
          <div className="card-body p-5 bg-white text-center">
            
            <span className="badge bg-warning text-dark text-uppercase px-3 py-2 mb-3" style={{ letterSpacing: '2px' }}>
              {food.cuisine}
            </span>
            
            <h1 className="fw-bold mb-3" style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
              {food.name}
            </h1>
            
            <div className="d-flex justify-content-center gap-4 mb-4 text-muted">
              <span><i className="bi bi-geo-alt-fill text-danger"></i> {food.location}</span>
              <span><i className="bi bi-star-fill text-warning"></i> {food.rating} / 5.0</span>
              <span><i className="bi bi-tags-fill text-success"></i> {food.priceRange}</span>
            </div>

            <hr className="w-25 mx-auto mb-4" />

            <p className="lead text-muted mx-auto" style={{ maxWidth: '700px', lineHeight: '1.8' }}>
              Experience the best of {food.cuisine.toLowerCase()} at {food.name}. 
              Located beautifully in {food.location}, this establishment offers an exceptional 
              dining experience that blends traditional flavors with a modern atmosphere.
            </p>

            {/* THE INTERACTIVE BOOKING SECTION */}
            <div className="mt-5 mx-auto" style={{ maxWidth: "500px" }}>
              
              {!showForm && bookingStatus === "" && (
                <button 
                  className="btn btn-dark btn-lg px-5 py-3 shadow-sm w-100"
                  onClick={() => setShowForm(true)}
                  style={{ borderRadius: '30px', fontWeight: 'bold', letterSpacing: '1px' }}
                >
                  Reserve a Table
                </button>
              )}

              {bookingStatus === "Reservation Confirmed!" && (
                <div className="alert alert-success fw-bold p-3 rounded-4 shadow-sm">
                  🎉 {bookingStatus} Redirecting to your orders...
                </div>
              )}

              {showForm && bookingStatus === "" && (
                <form onSubmit={handleConfirmBooking} className="bg-light p-4 rounded-4 shadow-sm text-start">
                  <h5 className="fw-bold mb-3 text-center">Reservation Details</h5>
                  
                  <div className="mb-3">
                    <label className="form-label fw-bold small text-muted">Date</label>
                    <input type="date" name="date" className="form-control" required onChange={handleInputChange} />
                  </div>
                  
                  <div className="row mb-4">
                    <div className="col-6">
                      <label className="form-label fw-bold small text-muted">Time</label>
                      <input type="time" name="time" className="form-control" required onChange={handleInputChange} />
                    </div>
                    <div className="col-6">
                      <label className="form-label fw-bold small text-muted">Guests</label>
                      <input type="number" name="guests" className="form-control" min="1" max="20" defaultValue="2" required onChange={handleInputChange} />
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <button type="button" className="btn btn-outline-secondary flex-grow-1" onClick={() => setShowForm(false)}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-dark flex-grow-1" disabled={bookingStatus === "Booking..."}>
                      {bookingStatus === "Booking..." ? "Confirming..." : "Confirm Booking"}
                    </button>
                  </div>
                </form>
              )}

              <p className="text-muted small mt-3">No upfront payment required. Cancel anytime.</p>
            </div>

          </div>
        </div>
      </div>

      <style>
        {`
          .overlay-dark {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0, 0, 0, 0.3);
          }
          .food-details-page {
            background-color: #f9f9f9;
            min-height: 100vh;
          }

          /* CSS for the custom authentication modal */
          .custom-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(4px); 
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999; 
          }
          .custom-modal-card {
            background: white;
            padding: 40px;
            border-radius: 20px;
            width: 90%;
            max-width: 400px;
            animation: popIn 0.3s ease-out forwards;
          }
          @keyframes popIn {
            0% { transform: scale(0.9); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}

export default FoodDetails;