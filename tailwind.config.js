// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    // Ensure this glob pattern correctly targets all files where you use Tailwind classes
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // --- Custom Theme Extensions ---
      colors: {
        "brand-dark": "#131118", // Dark-500, common background/text
        "brand-dark-alt": "#1F1F39", // Used for accents, divider, icons
        "brand-dark-text": "#1C1C1C", // "Sign in with Others" text
        "brand-gray-light": "#FAFAFA", // Light background for some sections (like footer)
        "brand-gray": "#A4A2AA", // Gray-500, subtitle text
        "brand-gray-medium": "#8A8A8A", // Used for placeholder text, descriptions
        "brand-gray-dark": "#484848", // Input text, secondary text
        "brand-gray-border": "#C2C2C2", // Social button border
        "brand-gray-divider": "#B5B5B5", // Filter section lines
        "brand-gray-input-border": "#9F9F9F", // Checkout input border
        "brand-gray-icon": "#677488", // Footer icon border?
        "brand-light-gray": "#989898", // Signup link, search input text
        "brand-bg": "#FFFFFF", // White-500, main background
        "brand-primary": "#F23E14", // Primary accent (Orange/Red)
        "brand-primary-light": "rgba(242, 62, 20, 0.2)", // Button background opacity
        "brand-primary-alt": "#CA6E25", // Alt accent (Orange)
        "brand-error": "#FF6262", // Strikethrough price
        "brand-error-alt": "#C8102E", // Out of Stock text
        "brand-warning": "#FCA120", // Star rating color
        "brand-blue-dark": "#2B2D42", // Footer link text
        "brand-blue-gray": "#46525E", // Product card vendor text/icon
        "brand-placeholder-bg": "#D9D9D9", // Image placeholder, OTP bg
        "brand-hero-bg": "#E0E0E0", // Hero image background
        "brand-category-bg": "#A8B5C6", // Category card gradient start
        "brand-category-bg-end": "#46525E", // Category card gradient end
        "brand-success": "#218400", // Color swatch example
        "brand-sale-tag": "#DA3F3F", // Sale timer text color
        "brand-sale-tag-bg": "#FDEFEE", // Sale timer background
        "brand-sale-tag-border": "#F8CCCC", // Sale timer border
        "brand-overlay": "rgba(0, 0, 0, 0.5)", // Overlay background
        "brand-footer-bg": "#EFEFEF", // Footer/Newsletter background (Often same as light gray)
      },
      fontFamily: {
        sans: ['"Nunito Sans"', "sans-serif"], // Default sans-serif
        nunito: ['"Nunito"', "sans-serif"], // Specific Nunito usage (Navbar, Features)
        digital: ['"Digital Numbers"', "monospace"], // For timer (ensure font is available)
        jost: ['"Jost"', "sans-serif"], // OTP Button font
        sfpro: ['"SF Pro Display"', "sans-serif"], // Reviews font (ensure available)
        sfprotext: ['"SF Pro Text"', "sans-serif"], // Card number font (ensure available)
        numans: ['"Numans"', "sans-serif"], // Brand logo font? (ensure available)
      },
      borderRadius: {
        lg: "10px", // For inputs, buttons etc. (Login, Signup, Forms)
        xl: "15px", // For cards (Product, Category)
        "2xl": "16px", // Social buttons
        "3xl": "20px", // Category card bg, Flash Sale tag
        "4xl": "40px", // Testimonial card rounding (approx)
      },
      // --- Custom Animations ---
      keyframes: {
        // For Brand Logo Scrolling
        "scroll-left": {
          "0%": { transform: "translateX(0)" },
          // Scrolls one full copy of the logos to the left
          "100%": { transform: "translateX(-50%)" },
        },
        "scroll-right": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        // For Basic Content Fade-in
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        // You can add more complex keyframes (e.g., fade-in-up) here
      },
      animation: {
        // Utilities using the keyframes
        "scroll-left": "scroll-left 40s linear infinite", // Adjust duration (e.g., 40s) for speed
        "scroll-right": "scroll-right 40s linear infinite", // Optional opposite direction
        "fade-in": "fade-in 0.5s ease-out forwards", // For testimonial content, etc.
      },
    },
  },
  plugins: [
    // Tailwind Forms plugin (install if needed: npm install -D @tailwindcss/forms)
    require("@tailwindcss/forms"),
    // Custom plugin for hover animation pause utility
    function ({ addUtilities }) {
      addUtilities({
        ".animation-pause": { "animation-play-state": "paused" },
        // Variants for hover state
        ".hover\\:animation-pause:hover": { "animation-play-state": "paused" },
        ".group-hover\\:animation-pause:hover": {
          "animation-play-state": "paused",
        }, // If using group-hover
      });
    },
    // Optional: Scrollbar Hide plugin (install if needed: npm install -D tailwind-scrollbar-hide)
    // require('tailwind-scrollbar-hide'),
  ],
};
