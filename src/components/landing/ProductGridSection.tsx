// src/components/landing/ProductGridSection.tsx
import React from "react";
import { Product } from "../../types/product"; // Adjusted import path
import ProductCard from "../products/ProductCard";
import Button from "../ui/Button";

interface ProductGridSectionProps {
  title: string;
  description?: string;
  products: Product[]; // Use the imported Product type here
  viewMoreLink?: string;
  className?: string;
}

const ProductGridSection: React.FC<ProductGridSectionProps> = ({
  title,
  description,
  products = [], // Default to empty array
  viewMoreLink = "/products",
  className = "",
}) => {
  // Don't render if no products unless specifically handled otherwise
  if (!products || products.length === 0) {
    // You could optionally render a placeholder or nothing
    // return <div className={`py-12 md:py-20 ${className}`}>Loading products or none found...</div>;
    return null;
  }

  return (
    <div className={`py-12 md:py-20 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl lg:text-4xl font-semibold text-brand-dark-alt mb-3">
            {title}
          </h2>
          {description && (
            <p className="text-lg md:text-xl text-brand-gray-dark max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Ensure 'product' here is correctly inferred as type 'Product' */}
          {products.map(
            (
              product: Product // Explicitly typing 'product' can sometimes help TS
            ) => (
              // Accessing product.id (which MUST exist on the Product type)
              <ProductCard key={product.id} product={product} />
            )
          )}
        </div>

        {/* View More Button */}
        {viewMoreLink && ( // Only show button if a link is provided
          <div className="text-center mt-12 md:mt-16">
            <Button
              to={viewMoreLink}
              variant="secondary"
              size="lg"
              className="h-auto py-3 px-8 rounded-lg"
            >
              View More
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGridSection;
