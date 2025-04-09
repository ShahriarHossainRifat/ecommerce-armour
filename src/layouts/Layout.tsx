// src/layouts/Layout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar"; // Will create next
import Footer from "../components/common/Footer"; // Will create next

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Outlet renders the matched child route component */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
