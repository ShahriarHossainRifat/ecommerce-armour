// src/layouts/CheckoutLayout.tsx
import React from "react";
import { Outlet } from "react-router-dom"; // *** Ensure Outlet is imported ***
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const CheckoutLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* You might want a simpler Navbar/Footer for checkout */}
      <Navbar />
      {/* Main content area for checkout steps */}
      <main className="flex-grow bg-gray-50 py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* *** Outlet renders the matched child route (ShippingPage, PaymentPage, etc.) *** */}
          <Outlet />
        </div>
      </main>
      {/* You might want a simpler Footer or none for checkout */}
      <Footer />
    </div>
  );
};

export default CheckoutLayout;
