import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AddListing from "./components/AddListing";
import TotalListings from "./components/TotalListings";
import FeaturedListings from "./components/FeaturedListings";
import FeaturedPackages from "./components/FeaturedPackages";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ListingDetails from "./components/ListingDetails";
import BookingPage from "./components/BookingPage";
import Footer from "./components/Footer";
import PackagesPage from "./components/PackagesPage";
import AddPackage from "./components/AddPackage";
import PackageDetails from "./components/PackageDetails";
import PaymentPage from "./components/PaymentPage";
import NewPayment from "./components/NewPayment";
import OrdersPage from "./components/OrdersPage";
import Hotels from "./pages/Hotels";
import FoodPage from "./pages/FoodPage"; 
import FoodDetails from "./pages/FoodDetails"
import About from "./pages/About"; 
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Destinations from "./pages/Destinations";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = () => {
    try {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);

        // ✅ FIXED STRUCTURE
        if (parsedUser && parsedUser.token && parsedUser.user) {
          setUser(parsedUser.user); // only store user object
        } else {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error parsing user:", error);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  return (
    <div>
      <Navbar user={user} setUser={setUser} />

      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <FeaturedListings />
              <div className="container mt-5">
                <h2 className="text-center fw-bold mb-4">
                  Popular Packages
                </h2>
              </div>
              <FeaturedPackages />
            </>
          }
        />

        {/* Listings */}
        <Route path="/all-listings" element={<TotalListings />} />

        <Route
          path="/add-listing"
          element={
            user?.role === "admin" ? (
              <AddListing />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Auth */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />

        {/* Listing Details */}
        <Route path="/listing/:id" element={<ListingDetails />} />

        {/* Booking */}
        <Route path="/booking" element={<BookingPage />} />

        {/* Packages */}
        <Route path="/packages" element={<PackagesPage />} />

        <Route
          path="/add-package"
          element={
            user?.role === "admin" ? (
              <AddPackage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="/package/:id" element={<PackageDetails />} />

        {/* Payments */}
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/new-payment" element={<NewPayment />} />

        {/* Hotels */}
        <Route path="/hotels" element={<Hotels />} />

        {/* ⭐ NEW: Food Route ⭐ */}
        <Route path="/food" element={<FoodPage />} />
        <Route path="/food/:id" element={<FoodDetails />} />

        {/* Orders */}
        <Route
          path="/orders"
          element={user ? <OrdersPage /> : <Navigate to="/login" />}
        />

        {/* Informational Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />

        {/* Legal Pages */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />

        <Route path="/destinations" element={<Destinations />} />

        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="container text-center mt-5">
              <h1>404 - Page Not Found</h1>
              <button
                className="btn btn-primary"
                onClick={() => (window.location.href = "/")}
              >
                Go Home
              </button>
            </div>
          }
        />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;