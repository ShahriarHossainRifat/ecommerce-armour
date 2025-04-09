// src/pages/ProductDetailsPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // Added Link for potential use
// *** ENSURE THIS IMPORT PATH IS CORRECT AND POINTS TO YOUR FULLY DEFINED PRODUCT TYPE ***
import { Product } from "../types/product"; // Adjust path if necessary!
import { getProductById } from "../data/utils"; // Import the utility to get product data
// Import Components
import Breadcrumbs from "../components/common/Breadcrumbs";
import ImageGallery from "../components/pdp/ImageGallery";
import ProductInfo from "../components/pdp/ProductInfo";
import FeaturesSection from "../components/landing/FeaturesSection";
import ProductTabs from "../components/pdp/ProductTabs";
import RelatedProductsSection from "../components/pdp/RelatedProductsSection";
import NewsletterSection from "../components/landing/NewsletterSection";
import { FiLoader, FiAlertTriangle } from "react-icons/fi"; // Icons for loading/error

const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    window.scrollTo(0, 0); // Scroll to top on product change

    // Get product data using the utility function from our mock data source
    const foundProduct = getProductById(productId);

    // Simulate slight delay as if fetching from API
    const timer = setTimeout(() => {
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        setError("Product not found.");
      }
      setLoading(false);
    }, 150); // Short delay simulation

    // Cleanup timeout on component unmount or if productId changes
    return () => clearTimeout(timer);
  }, [productId]); // Dependency array: re-run effect if productId changes

  // --- Loading State ---
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)] w-full">
        <FiLoader className="animate-spin text-brand-primary text-4xl" />
      </div>
    );
  }

  // --- Error State ---
  if (error) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col items-center justify-center text-center text-red-600 bg-red-50 p-6 rounded-lg my-10">
          <FiAlertTriangle className="text-4xl mb-3 mx-auto" />
          <p className="font-semibold text-lg">{error}</p>
          {/* Optional: Add a button to go back or retry */}
          <Link to="/products" className="mt-4 text-blue-600 hover:underline">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  // --- Product Not Found State ---
  // This check ensures 'product' is not null before rendering main content
  if (!product) {
    // This state might be reached if loading finishes but product is still null (e.g., fetch returned null)
    return (
      <div className="container mx-auto p-8 text-center text-xl">
        Product not found.
      </div>
    );
  }

  // --- Breadcrumbs Generation (using safe access) ---
  // Use the product's category property
  const breadcrumbs = [
    { name: "Home", href: "/" },
    // Add category if it exists, otherwise skip
    ...(product.category ? [{ 
      name: product.category,
      // Encode category name for URL safety
      href: `/products?category=${encodeURIComponent(product.category)}`
    }] : []),
    { name: product.title }, // title is required
  ];

  // --- Render Product Content ---
  return (
    <div>
      {" "}
      {/* Rendered inside main Layout */}
      <Breadcrumbs
        items={breadcrumbs}
        className="bg-white border-b border-gray-200"
      />
      {/* Main Product Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16">
          {/* Left Column: Image Gallery */}
          <div className="w-full lg:w-1/2 xl:w-7/12 flex-shrink-0">
            {/* Pass images safely, providing fallback */}
            <ImageGallery
              images={product.images ?? [product.imageUrl]}
              alt={product.title}
            />
          </div>
          {/* Right Column: Product Info */}
          <div className="w-full lg:w-1/2 xl:w-5/12">
            {/* Pass the non-null product object */}
            <ProductInfo product={product} />
          </div>
        </div>
      </div>
      {/* Other Sections */}
      <FeaturesSection />
      <ProductTabs product={product} />
      <RelatedProductsSection productId={product.id} />
      <NewsletterSection />
      {/* Footer is rendered by the main Layout component */}
    </div>
  );
};

export default ProductDetailsPage;
