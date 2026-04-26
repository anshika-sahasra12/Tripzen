# ✈️ TripZen: E-Tourism & Hospitality Platform

> **Built by B.Anshika Sahasra**
TripZen is a comprehensive, full-stack web application built to centralize and simplify the travel planning experience. It provides a seamless platform for users to book curated travel packages, reserve hotel rooms, and discover local food experiences, all while empowering local vendors with a digital presence.

---

## ✨ Features

* **Dual-Role Access:** Distinct experiences and permissions for Customers and Administrators.
* **Dynamic Booking Flow:** Real-time credit card validation and secure checkout processing.
* **Local Vendor Modules:** Dedicated sections for discovering regional Food and Hotel options.
* **Admin Dashboard:** Secure API routes allowing admins to manage packages, food listings, and user orders dynamically.
* **Contact Management:** Integrated "Contact Us" form that saves messages directly to the database for admin review.
* **Responsive UI:** A fast, single-page application experience built with React.

---

## 💻 Tech Stack

**Frontend:**
* React.js (Vite)
* Bootstrap & Custom CSS
* React Router DOM

**Backend:**
* Node.js & Express.js
* RESTful API Architecture

**Database:**
* MongoDB & Mongoose (Schema validation)

**Security:**
* JSON Web Tokens (JWT) for stateless sessions
* Bcrypt.js for secure password hashing
* Custom Express Middleware for Role-Based Access Control (RBAC)

---

## 📁 Project Structure

```text
TripZen/
├── backend/
│   ├── .env               # Environment variables (Hidden)
│   ├── server.js          # Main server entry point & API routes
│   └── package.json       # Backend dependencies
│
└── frontend/
    ├── src/
    │   ├── components/    # Reusable React UI blocks (Cards, Navbars)
    │   ├── pages/         # Main views (Home, Contact, Payment, Admin)
    │   ├── App.jsx        # React Router configuration
    │   └── main.jsx       # React DOM rendering
    ├── index.html         # Base HTML file
    └── package.json       # Frontend dependencies

---

🔐 **Security Details**
Security is a primary focus of the TripZen architecture:
Password Protection: All user passwords are encrypted using Bcrypt with a salt round of 10 before entering the database.
Stateless Authentication: User sessions are managed via JWT. Tokens are generated upon login and required in the HTTP headers for protected routes.
Defense in Depth: Data is sanitized on the frontend using Regular Expressions (Regex) to strip invalid characters, and strictly validated on the backend using Mongoose Schemas.
Route Protection: Sensitive actions (like deleting a package) are guarded by isAdmin middleware, preventing unauthorized access.

---

👑 Admin Details
TripZen features a built-in Administrator role to manage the platform.
Admin Email: anshikatest@gmail.com
Admin Password: admin123
Admin Capabilities:
Add and Delete Travel Packages, Hotels, and Food listings.
View all system messages submitted through the Contact form.
Manage and view global user orders.

---

🧪 Testing with Postman
You can easily test the API routes using Postman before interacting with the frontend:
Start the backend server (npm start on port 5000).
Login to get your Token:
Make a POST request to http://localhost:5000/login
Body (JSON): { "email": "anshikatest@gmail.com", "password": "admin123" }
Copy the token string from the response.
Test a Protected Route (e.g., Add Package):
Change method to POST -> http://localhost:5000/addPackage
Go to the Headers tab in Postman.
Add a key called Authorization and set the value to Bearer <YOUR_TOKEN_HERE>.
Add the package details in the JSON body and hit Send!

---

🌱 Societal Impact
TripZen aligns with UN Sustainable Development Goals (SDGs) 8, 11, and 12 by fostering economic growth for local businesses, promoting authentic cultural tourism, and utilizing 100% digital, paperless itineraries.