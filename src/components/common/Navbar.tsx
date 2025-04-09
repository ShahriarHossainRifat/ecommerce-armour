// src/components/common/Navbar.tsx
import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  FiSearch,
  FiHeart,
  FiUser,
  FiShoppingCart,
  FiMenu,
  FiChevronDown,
} from "react-icons/fi";
import MegaMenu from "./MegaMenu";
import MiniCart from "./MiniCart";
import MobileMenuDrawer from "./MobileMenuDrawer";
import Button from "../ui/Button";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import { useWishlist } from "../../contexts/WishlistContext";

const logoUrl = "https://via.placeholder.com/208x42/cccccc/969696?text=Armour";

const Navbar: React.FC = () => {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { itemCount } = useCart();
  const { isAuthenticated } = useAuth();
  const { wishlistItems } = useWishlist();
  const location = useLocation(); // Hook to get current location

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMiniCartOpen(false);
    setIsMegaMenuOpen(false);
  }, [location]);

  // Toggle functions
  const toggleMiniCart = () => setIsMiniCartOpen((prevState) => !prevState);
  const closeMiniCart = () => setIsMiniCartOpen(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prevState) => !prevState);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // General handler to close menus on link clicks
  const handleLinkClick = () => {
    setIsMegaMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  // Specific Handler for the Home Link to scroll to top if already home
  const handleHomeLinkClick = () => {
    handleLinkClick(); // Close menus first
    if (location.pathname === "/") {
      try {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (error) {
        window.scrollTo(0, 0);
      } // Fallback
    }
    // Otherwise, NavLink handles navigation & ScrollToTop handles scroll
  };

  // NavLink styling
  const navLinkBaseClass =
    "font-nunito text-xl font-semibold text-black hover:text-brand-primary transition-colors duration-200 ease-in-out";
  const navLinkActiveClass = "!text-brand-primary";
  // Badge styling
  const badgeBaseStyles =
    "absolute -top-1.5 -right-1.5 bg-brand-primary text-white text-[10px] font-bold rounded-full h-5 min-w-[20px] px-1 flex items-center justify-center leading-none pointer-events-none";

  return (
    <>
      {/* Navbar Container: Sticky, Z-index */}
      <header className="bg-brand-bg shadow-sm sticky top-0 z-30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Flex Container: crucial for positioning Left, Center, Right groups */}
          <div className="flex justify-between items-center h-[90px] md:h-[114px]">
            {/* Left Group: Mobile Menu Toggle + Logo */}
            <div className="flex items-center gap-4 lg:gap-12 flex-shrink-0">
              {" "}
              {/* flex-shrink-0 prevents shrinking */}
              <button
                type="button"
                className="lg:hidden text-brand-dark-alt hover:text-brand-primary p-2 -ml-2 transition-colors"
                onClick={toggleMobileMenu}
                aria-label="Open main menu"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu-drawer"
              >
                <FiMenu className="h-6 w-6" />
              </button>
              <Link to="/" className="flex-shrink-0" onClick={handleLinkClick}>
                <img
                  className="h-8 sm:h-[42px] w-auto"
                  src={logoUrl}
                  alt="Armour Logo"
                />
              </Link>
            </div>

            {/* Center Group: Desktop Navigation */}
            {/* Contains the Mega Menu trigger */}
            <nav
              className="hidden lg:flex items-center gap-8 xl:gap-10"
              aria-label="Main navigation"
            >
              {/* Home link uses specific handler */}
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `${navLinkBaseClass} ${isActive ? navLinkActiveClass : ""}`
                }
                onClick={handleHomeLinkClick}
              >
                {" "}
                Home{" "}
              </NavLink>

              {/* Categories Dropdown Container - MUST BE 'relative' */}
              <div
                className="relative"
                onMouseEnter={() => setIsMegaMenuOpen(true)}
                onMouseLeave={() => setIsMegaMenuOpen(false)}
              >
                {/* Trigger Link */}
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    `${navLinkBaseClass} ${
                      isActive ? navLinkActiveClass : ""
                    } flex items-center gap-1`
                  }
                  aria-expanded={isMegaMenuOpen}
                  aria-controls="mega-menu-content"
                  onClick={handleLinkClick}
                >
                  Categories
                  <FiChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isMegaMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </NavLink>

                {/* Mega Menu Dropdown - MUST BE 'absolute' with positioning & z-index */}
                <div
                  id="mega-menu-content"
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-0 w-[max(80vw,1120px)] max-w-6xl transition-opacity duration-200 ease-in-out z-20 ${
                    isMegaMenuOpen
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                  }`}
                  aria-hidden={!isMegaMenuOpen}
                >
                  <MegaMenu />
                </div>
              </div>
              {/* End Categories Dropdown Container */}

              <NavLink
                to="/offers"
                className={({ isActive }) =>
                  `${navLinkBaseClass} ${isActive ? navLinkActiveClass : ""}`
                }
                onClick={handleLinkClick}
              >
                {" "}
                Offers{" "}
              </NavLink>
            </nav>
            {/* End Center Group */}

            {/* Right Group: Icons */}
            {/* flex-shrink-0 prevents this group from shrinking */}
            <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 flex-shrink-0">
              <Button
                variant="ghost"
                size="icon"
                className="text-brand-dark-alt hover:text-brand-primary hidden sm:inline-flex"
                aria-label="Search"
              >
                {" "}
                <FiSearch className="h-6 w-6" />{" "}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                to="/wishlist"
                className="text-brand-dark-alt hover:text-brand-primary relative"
                aria-label="Wishlist"
              >
                <FiHeart className="h-6 w-6" />
                {isAuthenticated && wishlistItems.length > 0 && (
                  <span className={badgeBaseStyles}>
                    {" "}
                    {wishlistItems.length > 9
                      ? "9+"
                      : wishlistItems.length}{" "}
                  </span>
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                to={isAuthenticated ? "/profile" : "/login"}
                className="text-brand-dark-alt hover:text-brand-primary"
                aria-label="Account"
              >
                {" "}
                <FiUser className="h-6 w-6" />{" "}
              </Button>
              {/* Cart Button - relies on being in this flex group for positioning */}
              <button
                type="button"
                className="relative bg-brand-dark-alt text-white rounded-lg w-11 h-11 flex items-center justify-center hover:bg-opacity-90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-dark focus:ring-offset-2"
                onClick={toggleMiniCart}
                aria-label={`Shopping Cart, ${itemCount} items`}
                aria-haspopup="dialog"
                aria-expanded={isMiniCartOpen}
                aria-controls="mini-cart-sidebar"
              >
                <FiShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className={badgeBaseStyles}>
                    {" "}
                    {itemCount > 9 ? "9+" : itemCount}{" "}
                  </span>
                )}
              </button>
            </div>
            {/* End Right Group */}
          </div>
          {/* End Main Flex Container */}
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <MobileMenuDrawer isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />

      {/* Mini Cart Sidebar/Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ease-in-out ${
          isMiniCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {" "}
        <div
          className="absolute inset-0 bg-brand-overlay"
          onClick={closeMiniCart}
          aria-hidden="true"
        ></div>{" "}
      </div>
      <div
        id="mini-cart-sidebar"
        className={`fixed top-0 right-0 h-full w-full max-w-[417px] bg-white shadow-xl z-50 transform transition-transform ease-in-out duration-300 ${
          isMiniCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mini-cart-title"
      >
        {" "}
        <MiniCart onClose={closeMiniCart} />{" "}
      </div>
    </>
  );
};

export default Navbar;
