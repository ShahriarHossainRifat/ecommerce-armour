// src/pages/OffersPage.tsx
import React, { useMemo } from "react";
import { Product } from "../types/product"; // Import type
import { ALL_PRODUCTS_MOCK } from "../data/products"; // Import all products
import ProductCard from "../components/products/ProductCard";
import Breadcrumbs from "../components/common/Breadcrumbs";

const OffersPage: React.FC = () => {
  // Filter products that are on sale
  const discountedProducts = useMemo(() => {
    return ALL_PRODUCTS_MOCK.filter(
      (product) =>
        product.tags?.includes("Sale") ||
        (typeof product.originalPrice === "number" &&
          product.price < product.originalPrice)
    );
  }, []); // Only calculate once

  const breadcrumbs = [{ name: "Home", href: "/" }, { name: "Offers" }];

  return (
    <div>
      <Breadcrumbs
        items={breadcrumbs}
        className="bg-white border-b border-gray-200"
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Optional Banner */}
        <div className="bg-gradient-to-r from-brand-primary to-orange-500 text-white p-8 md:p-12 rounded-lg shadow-lg mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Special Offers!
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            Don't miss out on our limited-time deals and discounts.
          </p>
        </div>

        {/* Product Grid */}
        {discountedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {discountedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                showAddToCartButton={true}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-dashed border-gray-300 rounded-lg bg-gray-50">
            <p className="text-xl text-brand-gray-dark">
              No special offers available at the moment.
            </p>
            <p className="text-gray-500 mt-2">Check back soon!</p>
          </div>
        )}

        {/* Optional: Add pagination if many sale items */}
        {/* <Pagination currentPage={...} totalPages={...} onPageChange={...} className="mt-12" /> */}
      </div>
    </div>
  );
};

export default OffersPage;
