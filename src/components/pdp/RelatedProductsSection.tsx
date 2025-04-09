// src/components/pdp/RelatedProductsSection.tsx
import React, { useState, useEffect } from "react";
import { Product } from "../../types/product"; // Adjust path as needed
import ProductCard from "../products/ProductCard";
import { FiChevronLeft, FiChevronRight, FiLoader } from "react-icons/fi";

interface RelatedProductsSectionProps {
  productId: string | number; // ID of the current product to fetch related items
  className?: string;
}

// Placeholder data fetching function - returns the correct type
const fetchRelatedProducts = async (
  currentProductId: string | number
): Promise<Product[]> => {
  console.log(`Workspaceing related products for ID: ${currentProductId}`);
  await new Promise((resolve) => setTimeout(resolve, 600)); // Simulate delay
  // Return placeholder data (make sure this data conforms to the Product interface)
  // Ideally, exclude the current product itself
  return [
    {
      id: "16",
      title: "DottedBlack Dress",
      price: 75.5,
      originalPrice: 95.5,
      rating: 4.3,
      reviewCount: 4100,
      vendor: "Fila",
      imageUrl:
        "https://via.placeholder.com/262x330/cccccc/969696?text=Related+1",
      colors: ["#F43B4E", "#A3F124", "#000000"],
      tags: [],
      isNew: false,
      outOfStock: false,
      stock: 10,
      description: "Desc...",
    },
    {
      id: "14",
      title: "Long Sleeve Coat",
      price: 87.5,
      rating: 4.8,
      reviewCount: 5200,
      vendor: "Burberry",
      imageUrl:
        "https://via.placeholder.com/262x330/cccccc/969696?text=Related+2",
      colors: ["#F0BE43", "#8F0713"],
      tags: ["New"],
      isNew: true,
      outOfStock: true,
      stock: 0,
      description: "Desc...",
    },
    {
      id: "13",
      title: "Rounded Black Dress",
      price: 95.5,
      originalPrice: 120.0,
      rating: 4.3,
      reviewCount: 4100,
      vendor: "Arong",
      imageUrl:
        "https://via.placeholder.com/262x330/cccccc/969696?text=Related+3",
      colors: ["#F43B4E", "#000000"],
      tags: ["Flash Sale"],
      isNew: false,
      outOfStock: false,
      stock: 5,
      description: "Desc...",
    },
    {
      id: "15",
      title: "Denim Jeans",
      price: 35.1,
      originalPrice: 95.5,
      rating: 4.1,
      reviewCount: 3100,
      vendor: "Camper",
      imageUrl:
        "https://via.placeholder.com/262x330/cccccc/969696?text=Related+4",
      colors: ["#000000", "#3B3EF4"],
      tags: ["Flash Sale", "Men"],
      category: "Men",
      brand: "Camper",
      size: ["M", "L", "XL"],
      stock: 15,
      description: "Desc...",
    },
  ].filter((p) => p.id !== currentProductId); // Ensure current product isn't shown as related
};

const RelatedProductsSection: React.FC<RelatedProductsSectionProps> = ({
  productId,
  className = "",
}) => {
  // State uses the correctly imported Product type
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Add error state

  useEffect(() => {
    const loadRelated = async () => {
      try {
        setLoading(true);
        setError(null); // Clear previous errors
        const data = await fetchRelatedProducts(productId);
        setRelatedProducts(data);
      } catch (err) {
        console.error("Failed to fetch related products", err);
        setError("Could not load related products."); // Set error message
      } finally {
        setLoading(false);
      }
    };
    loadRelated();
  }, [productId]); // Refetch if the main product ID changes

  // TODO: Implement actual carousel logic if desired
  const handlePrev = () => console.log("Prev Related");
  const handleNext = () => console.log("Next Related");

  return (
    <div className={`py-12 md:py-16 bg-white ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8 md:mb-12">
          <h2 className="text-3xl lg:text-4xl font-semibold text-brand-dark-alt">
            Related Products
          </h2>
          {/* Show arrows only if there are enough products to scroll/paginate */}
          {relatedProducts.length > 4 && ( // Example condition
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={handlePrev}
                aria-label="Previous Related Product"
                className="w-[44px] h-[44px] flex items-center justify-center bg-black bg-opacity-50 hover:bg-opacity-75 rounded-lg text-white transition-colors"
              >
                <FiChevronLeft size={24} />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next Related Product"
                className="w-[44px] h-[44px] flex items-center justify-center bg-black bg-opacity-50 hover:bg-opacity-75 rounded-lg text-white transition-colors"
              >
                <FiChevronRight size={24} />
              </button>
            </div>
          )}
        </div>

        {/* Content Display */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <FiLoader className="animate-spin text-brand-primary text-3xl" />
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-600">{error}</div>
        ) : relatedProducts.length > 0 ? (
          // Product Grid/Carousel Area
          // Recommendation: Use a carousel library (Swiper.js, react-slick) here for better UX
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* 'product' is inferred as Product because relatedProducts state is Product[] */}
            {relatedProducts.map((product) => (
              // Accessing product.id is now safe because Product type includes it
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-brand-gray-dark">
            No related products found.
          </div>
        )}
      </div>
    </div>
  );
};

export default RelatedProductsSection;
