// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
// *** Use HashRouter for GitHub Pages compatibility ***
import { HashRouter } from "react-router-dom";
import App from "./App"; // Your main application component
import "./index.css"; // Global styles and Tailwind directives

// Import Context Providers (Ensure paths are correct)
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { WishlistProvider } from "./contexts/WishlistContext";

// Import Utility Components (Ensure path is correct)
import ScrollToTop from "./components/common/ScrollToTop";

// Standard React 18 root mounting
const rootElement = document.getElementById("root");
if (!rootElement)
  throw new Error(
    'Failed to find the root element with ID "root" in your index.html'
  );

const root = ReactDOM.createRoot(rootElement);

// Render the application
root.render(
  <React.StrictMode>
    {/* Use HashRouter */}
    <HashRouter>
      {/* Wrap App with Context Providers */}
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            {/* ScrollToTop works with HashRouter too */}
            <ScrollToTop />
            {/* Your main App component containing all the Routes */}
            <App />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>
);
