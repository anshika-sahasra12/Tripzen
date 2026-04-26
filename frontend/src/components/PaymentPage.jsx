import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Safely grab the data, ensuring 'amount' is always a valid number
  const safeName = location.state?.name || "Andaman Island Tour";
  const safeAmount = Number(location.state?.amount) || 30000;
  
  // Safely grab the orderId so we can tell the backend to complete it
  const orderId = location.state?.orderId; 

  const [formData, setFormData] = useState({
    nameOnCard: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  // --- FORMATTING & VALIDATION HANDLERS ---

  const handleCardNumberChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    if (rawValue.length <= 16) {
      const formattedValue = rawValue.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
      setFormData({ ...formData, cardNumber: formattedValue });
    }
  };

  const handleExpiryChange = (e) => {
    let rawValue = e.target.value.replace(/\D/g, "");
    if (rawValue.length > 4) {
      rawValue = rawValue.substring(0, 4);
    }
    if (rawValue.length >= 2) {
      rawValue = rawValue.substring(0, 2) + "/" + rawValue.substring(2, 4);
    }
    setFormData({ ...formData, expiryDate: rawValue });
  };

  const handleCvvChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    if (rawValue.length <= 3) {
      setFormData({ ...formData, cvv: rawValue });
    }
  };

  const handleNameChange = (e) => {
    const rawValue = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    setFormData({ ...formData, nameOnCard: rawValue });
  };

  // --- SUBMIT HANDLER ---

  const handlePayment = (e) => {
    e.preventDefault();
    let newErrors = {};

    const rawCardNumber = formData.cardNumber.replace(/\s/g, "");
    if (rawCardNumber.length !== 16) {
      newErrors.cardNumber = "Card number must be exactly 16 digits.";
    }

    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryRegex.test(formData.expiryDate)) {
      newErrors.expiryDate = "Enter a valid date in MM/YY format.";
    }

    if (formData.cvv.length !== 3) {
      newErrors.cvv = "CVV must be 3 digits.";
    }

    if (formData.nameOnCard.trim().length < 3) {
      newErrors.nameOnCard = "Please enter the full name on the card.";
    }

    setErrors(newErrors);

    // ⭐ INTEGRATED API CALL ⭐
    if (Object.keys(newErrors).length === 0) {
      setIsProcessing(true);
      
      setTimeout(async () => {
        try {
          // Tell the backend the payment worked! 
          if (orderId) {
            await fetch(`http://localhost:5000/orders/${orderId}/complete`, {
              method: "PUT",
            });
          } else {
            console.warn("No orderId provided to PaymentPage, skipping backend update.");
          }

          setIsProcessing(false);
          alert("Payment Successful! Your booking is confirmed.");
          navigate("/orders"); 
          
        } catch (error) {
          console.error("Payment update failed", error);
          setIsProcessing(false);
          alert("Payment processed, but we had trouble updating the order status.");
        }
      }, 2000);
    }
  };

  return (
    <div className="payment-page-container d-flex align-items-center justify-content-center py-5">
      <div className="payment-card shadow-lg p-5 rounded-4 bg-white">
        
        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary mb-1">Confirm Your Booking</h2>
          <p className="text-muted small">Complete your payment to secure your reservation.</p>
        </div>

        <div className="order-summary p-4 rounded-3 mb-4">
          <p className="mb-1 text-muted fw-bold small text-uppercase">Item</p>
          <h5 className="mb-3 text-dark fw-semibold">{safeName}</h5>
          
          <p className="mb-1 text-muted fw-bold small text-uppercase">Total Amount</p>
          <h2 className="mb-0 text-success fw-bold">₹{safeAmount.toLocaleString('en-IN')}</h2>
        </div>

        <form onSubmit={handlePayment}>
          
          <div className="mb-3">
            <label className="form-label fw-bold text-muted small">Name on Card</label>
            <input
              type="text"
              className={`form-control form-control-lg ${errors.nameOnCard ? "is-invalid" : ""}`}
              placeholder="e.g. John Doe"
              value={formData.nameOnCard}
              onChange={handleNameChange}
            />
            {errors.nameOnCard && <div className="invalid-feedback">{errors.nameOnCard}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold text-muted small">Card Number</label>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0">
                <i className="bi bi-credit-card text-muted"></i>
              </span>
              <input
                type="text"
                className={`form-control form-control-lg border-start-0 ps-0 ${errors.cardNumber ? "is-invalid" : ""}`}
                placeholder="XXXX XXXX XXXX XXXX"
                value={formData.cardNumber}
                onChange={handleCardNumberChange}
              />
              {errors.cardNumber && <div className="invalid-feedback">{errors.cardNumber}</div>}
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-6">
              <label className="form-label fw-bold text-muted small">Expiry Date</label>
              <input
                type="text"
                className={`form-control form-control-lg ${errors.expiryDate ? "is-invalid" : ""}`}
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={handleExpiryChange}
              />
              {errors.expiryDate && <div className="invalid-feedback">{errors.expiryDate}</div>}
            </div>
            
            <div className="col-6">
              <label className="form-label fw-bold text-muted small">CVV</label>
              <div className="input-group">
                <input
                  type="password"
                  className={`form-control form-control-lg border-end-0 ${errors.cvv ? "is-invalid" : ""}`}
                  placeholder="XXX"
                  value={formData.cvv}
                  onChange={handleCvvChange}
                  maxLength="3"
                />
                <span className="input-group-text bg-light border-start-0">
                  <i className="bi bi-lock-fill text-muted"></i>
                </span>
                {errors.cvv && <div className="invalid-feedback">{errors.cvv}</div>}
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-lg w-100 fw-bold rounded-pill shadow-sm"
            disabled={isProcessing}
            style={{ letterSpacing: '1px' }}
          >
            {isProcessing ? "Processing..." : `Pay ₹${safeAmount.toLocaleString('en-IN')}`}
          </button>

          <div className="text-center mt-3">
            <small className="text-muted">
              <i className="bi bi-shield-lock-fill text-success me-1"></i>
              Payments are secure and encrypted
            </small>
          </div>
        </form>
      </div>

      <style>
        {`
          .payment-page-container {
            min-height: 80vh;
            background-color: #f4f7f6; 
          }
          .payment-card {
            width: 100%;
            max-width: 480px;
            border: 1px solid rgba(0,0,0,0.05);
          }
          .order-summary {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            border-left: 4px solid #198754; 
          }
          .form-control:focus {
            box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.15);
            border-color: #86b7fe;
          }
          .input-group-text {
            background-color: transparent;
          }
          .btn-primary {
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }
          .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(13, 110, 253, 0.3) !important;
          }
        `}
      </style>
    </div>
  );
};

export default PaymentPage;