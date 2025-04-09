// src/pages/ProfilePage.tsx
import React from "react";
// CORRECTED: Import NavLink for active styling & Outlet for nested routes
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Use context for user info and logout
import Button from "../components/ui/Button"; // Use Button for logout styling

const ProfilePage: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Basic protected route logic: Redirect if not logged in
  // Place this appropriately if ProfilePage isn't already within a protected route structure
  React.useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login, saving the intended destination
      navigate("/login", { state: { from: location.pathname }, replace: true });
    }
  }, [isAuthenticated, navigate, location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to home page after logout
  };

  // Define base and active styles for NavLink consistency
  const navLinkBaseStyles =
    "px-3 py-2 rounded-md text-base font-medium text-brand-dark-alt hover:bg-gray-100 hover:text-brand-primary transition-colors duration-150 ease-in-out";
  const navLinkActiveStyles =
    "bg-brand-primary-light text-brand-primary font-semibold"; // Example active style

  // Avoid rendering if not authenticated (or show loading)
  if (!isAuthenticated) {
    // You might want a loading spinner here if auth state is initially unknown
    return null;
  }

  return (
    // This page should likely be rendered within the main <Layout> which provides padding
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <h1 className="text-3xl lg:text-4xl font-semibold mb-6">My Account</h1>
      {user ? (
        <p className="mb-8 text-lg">
          Welcome back, <span className="font-semibold">{user.name}</span>!
        </p>
      ) : (
        <p className="mb-8 text-lg">Loading user information...</p>
      )}

      {/* Profile Sub-Navigation using NavLink */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-gray-200 mb-8 pb-3">
        {/* CORRECTED: Use NavLink and 'end' prop */}
        <NavLink
          to="/profile"
          end // Match only /profile exactly
          className={({ isActive }) =>
            `${navLinkBaseStyles} ${isActive ? navLinkActiveStyles : ""}`
          }
        >
          Overview
        </NavLink>
        <NavLink
          to="/profile/orders"
          className={({ isActive }) =>
            `${navLinkBaseStyles} ${isActive ? navLinkActiveStyles : ""}`
          }
        >
          Order History
        </NavLink>
        <NavLink
          to="/profile/addresses"
          className={({ isActive }) =>
            `${navLinkBaseStyles} ${isActive ? navLinkActiveStyles : ""}`
          }
        >
          Addresses
        </NavLink>
        {/* Add other profile links like Settings */}

        {/* Logout Button */}
        <Button
          variant="link" // Use link variant for less emphasis
          onClick={handleLogout}
          className="!text-red-600 hover:!text-red-800 !p-0 ml-auto" // Override button padding/styles
        >
          Logout
        </Button>
      </div>

      {/* Content Area for Nested Routes */}
      {/* This Outlet will render OrderHistoryPage, OrderDetailsPage, AddressesPage etc. */}
      {/* based on the routes defined in App.tsx */}
      <Outlet />

      {/* Or if you don't use nested routes, display default content here */}
      {/* Example: Display default content if on /profile exactly */}
      {/* {location.pathname === '/profile' && (
           <div>
              <h2 className="text-2xl font-medium mb-4">Account Overview</h2>
              <p>Your main profile information...</p>
              {user?.email && <p className='mt-4'>Email: {user.email}</p>}
           </div>
       )} */}
    </div>
  );
};

export default ProfilePage;
