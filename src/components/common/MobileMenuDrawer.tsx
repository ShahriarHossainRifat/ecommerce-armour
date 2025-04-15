// src/components/common/MobileMenuDrawer.tsx
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logSrc from "../../assets/images/armour-logo.svg";
import {
  FiX,
  FiHome,
  FiGrid,
  FiTag,
  FiLogIn,
  FiUser,
  FiUserPlus,
  FiLogOut,
  FiHeart,
  FiChevronDown,
} from "react-icons/fi";
import { useAuth } from "../../contexts/AuthContext"; // Import Auth context hook
// *** ENSURE THIS IMPORT PATH IS CORRECT ***
import { mobileCategories } from "../../data/navigation"; // Import category data specific for mobile view

// Placeholder Logo URL - Replace with your actual logo import or path
const logoUrl = logSrc;

interface MobileMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void; // Function to close the drawer
}

const MobileMenuDrawer: React.FC<MobileMenuDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const { isAuthenticated, logout } = useAuth(); // Get authentication state and logout function
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false); // State for categories accordion

  // Handler to log out and close the drawer
  const handleLogout = () => {
    logout();
    onClose();
  };

  // Handler to close the drawer when any link is clicked
  const handleLinkClick = () => {
    onClose();
  };

  // Base and active styles for main navigation links
  const linkClassName =
    "flex items-center gap-3 px-4 py-3 rounded-md text-lg font-medium text-brand-dark hover:bg-gray-100 transition-colors duration-150 ease-in-out";
  const activeClassName =
    "bg-brand-primary-light text-brand-primary font-semibold"; // Style for active NavLink
  // Styling for the sub-category links within the accordion
  const sublinkClassName =
    "block px-4 py-2 rounded-md text-base font-medium text-brand-gray-dark hover:bg-gray-100 hover:text-brand-primary transition-colors duration-150 ease-in-out";

  return (
    <>
      {/* Overlay for mobile view */}
      <div
        className={`fixed inset-0 z-40 bg-black lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose} // Close drawer when overlay is clicked
        aria-hidden="true"
      ></div>

      {/* Drawer Container */}
      <div
        id="mobile-menu-drawer" // ID for aria-controls
        className={`fixed top-0 left-0 h-full w-full max-w-xs bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          // Only shown on smaller screens
          isOpen ? "translate-x-0" : "-translate-x-full" // Slide in/out animation
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title" // Use an h2 with this id inside if needed
      >
        {/* Flex container for header and scrollable nav */}
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200 flex-shrink-0">
            <Link to="/" onClick={handleLinkClick} className="flex-shrink-0">
              <img
                className="h-8 w-auto"
                src={logoUrl}
                alt="Armour Logo"
                id="mobile-menu-title"
              />
            </Link>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-800"
              aria-label="Close menu"
            >
              <FiX size={24} />
            </button>
          </div>

          {/* Scrollable Navigation Area */}
          <nav className="flex-grow p-4 space-y-1 overflow-y-auto">
            {/* Main Links */}
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${linkClassName} ${isActive ? activeClassName : ""}`
              }
              onClick={handleLinkClick}
            >
              <FiHome className="w-5 h-5" /> Home
            </NavLink>

            {/* Categories Accordion Section */}
            <div>
              {/* Button to toggle the accordion */}
              <button
                type="button"
                className={`${linkClassName} w-full justify-between`} // Button takes full width
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)} // Toggle state on click
                aria-expanded={isCategoriesOpen}
                aria-controls="mobile-categories-panel" // Links button to panel
              >
                <span className="flex items-center gap-3">
                  <FiGrid className="w-5 h-5" /> Categories
                </span>
                {/* Chevron icon indicates open/closed state */}
                <FiChevronDown
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isCategoriesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Collapsible Panel using Grid Template Rows for smooth height animation */}
              <div
                id="mobile-categories-panel"
                className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                  isCategoriesOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]" // Animate grid rows
                }`}
              >
                {/* Inner div required for grid height animation */}
                <div className="overflow-hidden">
                  {/* Indented content with padding/border */}
                  <div className="pt-2 pl-5 pb-2 space-y-1 border-l-2 border-gray-100 ml-4 mt-1">
                    {mobileCategories.map((category, index) => (
                      <div key={index} className="py-1">
                        {/* Main Category Title */}
                        <span className="font-semibold text-base text-gray-700 block px-4 pt-2 pb-1">
                          {category.title}
                        </span>
                        {/* Sub-Category Links List */}
                        <ul className="space-y-0.5">
                          {category.items.map((item) => (
                            <li key={item.href}>
                              <NavLink
                                to={item.href}
                                // Apply active styles to sublinks
                                className={({ isActive }) =>
                                  `${sublinkClassName} ${
                                    isActive
                                      ? "text-brand-primary font-semibold bg-gray-50"
                                      : ""
                                  }`
                                }
                                onClick={handleLinkClick} // Close drawer on sublink click
                              >
                                {item.label}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* End Categories Accordion */}

            <NavLink
              to="/offers"
              className={({ isActive }) =>
                `${linkClassName} ${isActive ? activeClassName : ""}`
              }
              onClick={handleLinkClick}
            >
              <FiTag className="w-5 h-5" /> Offers
            </NavLink>

            <hr className="my-4" />

            {/* Auth & Wishlist Links */}
            {isAuthenticated ? (
              <>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `${linkClassName} ${isActive ? activeClassName : ""}`
                  }
                  onClick={handleLinkClick}
                >
                  {" "}
                  <FiUser className="w-5 h-5" /> Profile{" "}
                </NavLink>
                <NavLink
                  to="/wishlist"
                  className={({ isActive }) =>
                    `${linkClassName} ${isActive ? activeClassName : ""}`
                  }
                  onClick={handleLinkClick}
                >
                  {" "}
                  <FiHeart className="w-5 h-5" /> Wishlist{" "}
                </NavLink>
                <button
                  onClick={handleLogout}
                  className={`${linkClassName} w-full text-left`}
                >
                  {" "}
                  <FiLogOut className="w-5 h-5" /> Logout{" "}
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `${linkClassName} ${isActive ? activeClassName : ""}`
                  }
                  onClick={handleLinkClick}
                >
                  {" "}
                  <FiLogIn className="w-5 h-5" /> Login{" "}
                </NavLink>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    `${linkClassName} ${isActive ? activeClassName : ""}`
                  }
                  onClick={handleLinkClick}
                >
                  {" "}
                  <FiUserPlus className="w-5 h-5" /> Sign Up{" "}
                </NavLink>
                <NavLink
                  to="/wishlist"
                  className={({ isActive }) =>
                    `${linkClassName} ${isActive ? activeClassName : ""}`
                  }
                  onClick={handleLinkClick}
                >
                  {" "}
                  <FiHeart className="w-5 h-5" /> Wishlist{" "}
                </NavLink>
              </>
            )}
          </nav>
        </div>
      </div>
    </>
  );
};

export default MobileMenuDrawer;
