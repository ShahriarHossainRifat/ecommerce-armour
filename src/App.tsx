// src/App.tsx
import { Routes, Route } from "react-router-dom";

// Layouts
import Layout from "./layouts/Layout.tsx";
import CheckoutLayout from "./layouts/CheckoutLayout.tsx"; // Ensure this exists and has Outlet

// --- Ensure ALL these import paths are correct for YOUR project structure ---

// Pages (Assuming these are in src/pages/)
import LandingPage from "./pages/LandingPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.tsx";
import EnterOtpPage from "./pages/EnterOtpPage.tsx";
import ProductListingPage from "./pages/ProductListingPage.tsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.tsx";
import ConfirmationPage from "./pages/ConfirmationPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import CartPage from "./pages/CartPage.tsx";
import WishlistPage from "./pages/WishlistPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import SearchPage from "./pages/SearchPage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import TermsPage from "./pages/TermsPage.tsx";
import PrivacyPage from "./pages/PrivacyPage.tsx";
import OffersPage from "./pages/OffersPage.tsx";

// Profile Sub-Pages (Assuming src/pages/profile/)
import OrderHistoryPage from "./pages/profile/OrderHistoryPage.tsx";
import OrderDetailsPage from "./pages/profile/OrderDetailsPage.tsx";
import AddressesPage from "./pages/profile/AddressesPage.tsx";

// *** Checkout Pages (Using YOUR specified path: src/components/checkout/) ***
import ShippingPage from "./components/checkout/ShippingPage.tsx";
import PaymentPage from "./components/checkout/PaymentPage.tsx";
import ReviewOrderPage from "./components/checkout/ReviewOrderPage.tsx";
// --- End Imports ---

function App() {
  return (
    <Routes>
      {/* Main Site Routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="products" element={<ProductListingPage />} />
        <Route path="products/:productId" element={<ProductDetailsPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="wishlist" element={<WishlistPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="offers" element={<OffersPage />} />
        <Route path="profile" element={<ProfilePage />}>
          <Route index element={<OrderHistoryPage />} />
          <Route path="orders" element={<OrderHistoryPage />} />
          <Route path="orders/:orderId" element={<OrderDetailsPage />} />
          <Route path="addresses" element={<AddressesPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Standalone Auth Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/enter-otp" element={<EnterOtpPage />} />

      {/* --- Checkout Routes --- */}
      {/* Parent route using CheckoutLayout */}
      <Route path="/checkout" element={<CheckoutLayout />}>
        {/* Child routes rendered via Outlet in CheckoutLayout */}
        <Route path="shipping" element={<ShippingPage />} />
        <Route path="payment" element={<PaymentPage />} />
        <Route path="review" element={<ReviewOrderPage />} />
        {/* Default child for '/checkout' path */}
        <Route index element={<ShippingPage />} />
      </Route>
      {/* --- End Checkout Routes --- */}

      {/* Standalone Confirmation Route */}
      <Route path="/confirmation" element={<ConfirmationPage />} />
    </Routes>
  );
}

export default App;
