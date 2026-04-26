import { Link } from "react-router-dom";
import React from "react";

const Footer = () => {
  const footerStyle = {
    backgroundColor: "#E0F7FA", // Light blue background
    padding: "3rem 1rem",
    marginTop: "auto", 
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    maxWidth: "1200px",
    margin: "auto",
    gap: "2rem", 
  };

  const sectionStyle = {
    flex: "1",
    minWidth: "250px",
  };

  const linkStyle = {
    color: "#0077B6",
    textDecoration: "none",
    fontWeight: "500",
  };

  const listStyle = {
    listStyleType: "none",
    padding: 0,
    margin: 0,
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        
        {/* Column 1: Brand & Socials */}
        <div style={sectionStyle}>
          <h2 style={{ color: "#0077B6", fontSize: "1.8rem", fontWeight: "bold", marginBottom: "1rem" }}>
            Trip<span style={{ color: "#000" }}>Zen</span>
          </h2>
          <p style={{ color: "#555", lineHeight: "1.6" }}>
            Your trusted travel partner for memorable journeys and exceptional hotel experiences.
          </p>
          <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
            <a href="#" style={linkStyle}><i className="fab fa-facebook fa-lg"></i></a>
            <a href="#" style={linkStyle}><i className="fab fa-twitter fa-lg"></i></a>
            <a href="#" style={linkStyle}><i className="fab fa-instagram fa-lg"></i></a>
            <a href="#" style={linkStyle}><i className="fab fa-linkedin fa-lg"></i></a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div style={sectionStyle}>
          <h3 style={{ fontWeight: "bold", marginBottom: "1.2rem", color: "#333" }}>Quick Links</h3>
          <ul style={listStyle}>
            <li style={{ marginBottom: "0.8rem" }}><Link to="/about" style={linkStyle}>About Us</Link></li>
            <li style={{ marginBottom: "0.8rem" }}><Link to="/services" style={linkStyle}>Services</Link></li>
            <li style={{ marginBottom: "0.8rem" }}><Link to="/destinations" style={linkStyle}>Destinations</Link></li>
            <li style={{ marginBottom: "0.8rem" }}><Link to="/all-listings" style={linkStyle}>Hotels</Link></li>
            <li style={{ marginBottom: "0.8rem" }}><Link to="/packages" style={linkStyle}>Packages</Link></li>
            <li style={{ marginBottom: "0.8rem" }}><Link to="/contact" style={linkStyle}>Contact Us</Link></li>
          </ul>
        </div>

        {/* Column 3: Contact Info (FIXED) */}
        <div style={sectionStyle}>
          <h3 style={{ fontWeight: "bold", marginBottom: "1.2rem", color: "#333" }}>Contact Us</h3>
          
          <p style={{ marginBottom: "0.8rem", color: "#555" }}>
            <i className="fas fa-map-marker-alt" style={{ color: "#0077B6", width: "20px", marginRight: "5px" }}></i> 
            <span>1234 Travel Lane, Suite 500, Barcelona</span>
          </p>
          
          <p style={{ marginBottom: "0.8rem", color: "#555" }}>
            <i className="fas fa-phone" style={{ color: "#0077B6", width: "20px", marginRight: "5px" }}></i> 
            <span>+91 6304669864</span>
          </p>
          
          <p style={{ marginBottom: "0.8rem", color: "#555" }}>
            <i className="fas fa-envelope" style={{ color: "#0077B6", width: "20px", marginRight: "5px" }}></i> 
            <span>info@voyagehive.com</span>
          </p>
        </div>

        {/* Column 4: Newsletter */}
        <div style={sectionStyle}>
          <h3 style={{ fontWeight: "bold", marginBottom: "1.2rem", color: "#333" }}>Newsletter</h3>
          <p style={{ color: "#555", marginBottom: "1rem" }}>
            Subscribe to our newsletter for the latest updates and offers.
          </p>
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <input 
              type="email" 
              placeholder="Your email address" 
              style={{ padding: "0.6rem", borderRadius: "4px", border: "1px solid #ccc", flex: "1" }} 
            />
            <button 
              style={{ backgroundColor: "#0077B6", color: "white", padding: "0.6rem 1rem", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}
            >
              Subscribe
            </button>
          </div>
          <p style={{ fontSize: "0.8rem", color: "gray", lineHeight: "1.4" }}>
            By subscribing, you agree to our Privacy Policy and consent to receive updates.
          </p>
        </div>
      </div>

      {/* Bottom Legal Section */}
      <div style={{ borderTop: "1px solid #ccc", paddingTop: "1.5rem", marginTop: "2rem", textAlign: "center" }}>
        <p style={{ color: "#555", marginBottom: "1rem" }}>&copy; 2026 TripZen. All rights reserved.</p>
        
        <div style={{ display: "flex", justifyContent: "center", gap: "15px", flexWrap: "wrap", fontSize: "0.9rem" }}>
          <Link to="/privacy-policy" style={linkStyle}>Privacy Policy</Link>
          <span style={{ color: "#aaa" }}>|</span>
          <Link to="/terms" style={linkStyle}>Terms & Conditions</Link>
          <span style={{ color: "#aaa" }}>|</span>
          <Link to="/sitemap" style={linkStyle}>Sitemap</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;