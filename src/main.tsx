// src/main.tsx (or near your Router setup in App.tsx)
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, useNavigate, useLocation } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import ScrollToTop from "./components/common/ScrollToTop"; // Adjust path if needed

// --- Component to Handle GitHub Pages Redirect ---
const GitHubPagesRedirectHandler: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const redirectPath = params.get("p");
    const redirectQuery = params.get("q");

    if (redirectPath) {
      let fullPath = redirectPath;
      if (redirectQuery) {
        // Replace placeholder '~and~' back to '&'
        fullPath += `?${redirectQuery.replace(/~and~/g, "&")}`;
      }
      console.log("GitHub Pages Redirect:", fullPath);
      // Use replace to avoid adding the intermediate URL to history
      navigate(fullPath, { replace: true });
    }
  }, [location, navigate]); // Run when location changes

  return null; // This component doesn't render anything visible
};
// --- End Redirect Handler ---

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      {" "}
      {/* Keep using BrowserRouter */}
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <ScrollToTop />
            <GitHubPagesRedirectHandler /> {/* Add the redirect handler */}
            <App />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
