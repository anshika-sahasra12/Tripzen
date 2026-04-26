import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setStatusMsg({ type: '', text: '' });
  };

  // ⭐ THIS IS THE NEW REAL API CALL ⭐
  const handleSendMessage = async (e) => {
    e.preventDefault(); 

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatusMsg({ 
        type: 'danger', 
        text: 'Oops! Please fill out all fields, including your message, before sending.' 
      });
      return; 
    }

    setIsSending(true);

    try {
      // Actually send the data to your backend!
      const response = await fetch("http://localhost:5000/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatusMsg({ 
          type: 'success', 
          text: 'Message Sent Successfully! We will get back to you soon.' 
        });
        setFormData({ name: '', email: '', message: '' }); // Clear form
      } else {
        setStatusMsg({ 
          type: 'danger', 
          text: 'Failed to send message. Please try again.' 
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatusMsg({ 
        type: 'danger', 
        text: 'Server error. Please make sure the backend is running!' 
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="container py-5" style={{ minHeight: '70vh' }}>
      <div className="row justify-content-center">
        <div className="col-md-8 text-center mb-5">
          <h1 className="fw-bold text-primary">Contact Us</h1>
          <p className="lead text-muted">We would love to hear from you. Reach out with any questions!</p>
        </div>
      </div>

      <div className="row g-5">
        <div className="col-md-5">
          <div className="bg-light p-4 rounded-4 shadow-sm h-100">
            <h4 className="fw-bold mb-4">Get In Touch</h4>
            <p>
              <strong><i className="bi bi-geo-alt-fill text-danger me-2"></i>Address:</strong>
              <br />
              1234 Travel Lane, Suite 500
              <br />
              Barcelona, Spain
            </p>
            <p>
              <strong><i className="bi bi-telephone-fill text-success me-2"></i>Phone:</strong>
              <br />
              +91 6304669864
            </p>
            <p>
              <strong><i className="bi bi-envelope-fill text-primary me-2"></i>Email:</strong>
              <br />
              info@voyagehive.com
            </p>
          </div>
        </div>
        
        <div className="col-md-7">
          <form className="bg-white p-4 rounded-4 shadow-sm border" onSubmit={handleSendMessage}>
            
            {statusMsg.text && (
              <div className={`alert alert-${statusMsg.type} fw-bold`} role="alert">
                {statusMsg.text}
              </div>
            )}

            <div className="mb-3">
              <label className="form-label fw-bold">Your Name</label>
              <input 
                type="text" 
                name="name"
                className="form-control" 
                placeholder="John Doe" 
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            
            <div className="mb-3">
              <label className="form-label fw-bold">Email address</label>
              <input 
                type="email" 
                name="email"
                className="form-control" 
                placeholder="name@example.com" 
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            
            <div className="mb-3">
              <label className="form-label fw-bold">Message</label>
              <textarea 
                className="form-control" 
                name="message"
                rows="4" 
                placeholder="How can we help you?"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary px-5 rounded-pill fw-bold"
              disabled={isSending}
            >
              {isSending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;