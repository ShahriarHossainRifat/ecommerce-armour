// src/components/landing/FlashSaleSection.tsx
import React, { useState, useMemo } from "react";
// *** ENSURE THESE IMPORT PATHS ARE CORRECT ***
import { Product } from "../../types/product";
import ProductCard from "../products/ProductCard";
// import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface FlashSaleSectionProps {
  products: Product[]; // Expects the full list
}

const TABS = ["MEN", "WOMEN", "KIDS", "ACCESSORIES"];

const FlashSaleSection: React.FC<FlashSaleSectionProps> = ({
  products = [],
}) => {
  const [activeTab, setActiveTab] = useState(TABS[0]); // Default to MEN

  const displayedProducts = useMemo(() => {
    // --- DETAILED DEBUGGING ---
    console.clear(); // Optional: Clear console each time for cleaner logs
    console.log(`--- FlashSale Filter Calculation ---`);
    console.log(`Timestamp: ${new Date().toLocaleTimeString()}`);
    console.log(`Active Tab: ${activeTab}`);
    console.log(`Raw products received count: ${products.length}`);
    if (products.length === 0) {
      console.warn("FlashSale received empty products array!");
    } else {
      // Log first few products received to check their structure
      console.log("First 3 products received:", products.slice(0, 3));
    }
    // --- END DEBUGGING ---

    const upperCaseTab = activeTab.toUpperCase();

    const filtered = products.filter((p, index) => {
      // Get product category, handle potential null/undefined, trim whitespace, convert to uppercase
      const productCategory = p.category; // Get the raw value first
      const productCategoryUpper = productCategory?.trim().toUpperCase();
      const isMatch = productCategoryUpper === upperCaseTab;

      // --- DETAILED LOGGING INSIDE FILTER (Log first 5 checks) ---
      if (index < 5) {
        // Log details only for the first few items
        console.log(
          `  - Checking Product ID ${p.id}: Category='${productCategory}' (Processed='${productCategoryUpper}') | Tab='${upperCaseTab}' | Match=${isMatch}`
        );
      }
      // --- END LOGGING ---

      return isMatch;
    });

    console.log(
      `FlashSale: Found ${filtered.length} products matching category "${activeTab}".`
    );
    if (filtered.length === 0 && products.length > 0) {
      console.warn(
        `No products found for category "${activeTab}". Check product data category fields.`
      );
    }
    return filtered.slice(0, 3); // Limit to 3 products
  }, [products, activeTab]); // Recalculate when products array or activeTab changes

  // Placeholder handlers for potential carousel
  // const handlePrev = () => { /* ... */ };
  // const handleNext = () => { /* ... */ };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      {/* Section Header & Tabs */}
      <div className="flex flex-col items-center mb-10 md:mb-16">
        <h2 className="text-3xl lg:text-4xl font-semibold text-brand-dark-alt mb-6 tracking-[0.1em] uppercase">
          {" "}
          FLASH SALE{" "}
        </h2>
        <div className="flex flex-wrap justify-center gap-x-8 sm:gap-x-12 md:gap-x-16 border-b border-gray-300">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-1 font-sans text-xl md:text-2xl font-normal tracking-tight transition-colors duration-200 ease-in-out ${
                activeTab === tab
                  ? "text-brand-primary border-b-2 border-brand-primary font-semibold"
                  : "text-black hover:text-brand-primary"
              }`}
              aria-pressed={activeTab === tab}
            >
              {" "}
              {tab}{" "}
            </button>
          ))}
        </div>
      </div>

      {/* Product Display Area */}
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 min-h-[300px]">
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                showAddToCartButton={true}
              />
            ))
          ) : (
            <p className="col-span-1 md:col-span-3 text-center text-brand-gray-dark py-10">
              {" "}
              No flash sale items currently available for{" "}
              {activeTab.toLowerCase()}.{" "}
            </p>
          )}
        </div>
        {/* Optional Navigation Arrows */}
      </div>
    </div>
  );
};

export default FlashSaleSection;
