// src/pages/LandingPage.tsx
import React from "react";

// *** ENSURE THESE IMPORT PATHS ARE CORRECT ***
import { ALL_PRODUCTS_MOCK } from "../data/products"; // Import the full product list
// Import Section Components
import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import CategoriesSection from "../components/landing/CategoriesSection";
import ProductGridSection from "../components/landing/ProductGridSection";
import BannerSection from "../components/landing/BannerSection";
import DealsSection from "../components/landing/DealsSection";
import FlashSaleSection from "../components/landing/FlashSaleSection"; // Import Flash Sale
import BrandsSection from "../components/landing/BrandsSection";
import TestimonialsSection from "../components/landing/TestimonialsSection";
import ShareSection from "../components/landing/ShareSection";
import NewsletterSection from "../components/landing/NewsletterSection";

const LandingPage: React.FC = () => {
  // Use a slice or specific selection for grids if needed, or pass all
  const trendyProducts = ALL_PRODUCTS_MOCK.slice(0, 4); // Example: First 4 for "Trendy"
  const popularProducts = ALL_PRODUCTS_MOCK.slice(4, 8); // Example: Next 4 for "Popular"

  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <CategoriesSection />
      {/* Pass data to Product Grids */}
      <ProductGridSection
        title="Trendy Collections"
        products={trendyProducts}
      />
      <BannerSection />
      <ProductGridSection title="Most Popular" products={popularProducts} />
      <DealsSection />
      {/* *** Pass the FULL product list to FlashSaleSection *** */}
      <FlashSaleSection products={ALL_PRODUCTS_MOCK} />
      <BrandsSection />
      <TestimonialsSection />
      <ShareSection />
      <NewsletterSection />
    </div>
  );
};

export default LandingPage;
