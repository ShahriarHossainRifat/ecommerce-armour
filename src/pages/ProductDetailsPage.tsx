// src/pages/ProductDetailsPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // Added Link for potential use
// *** ENSURE THESE IMPORT PATHS ARE CORRECT ***
import { Product } from "../types/product"; // Import Product type from central location
import { getProductById } from "../data/utils"; // Import utility to get product data
// Import Components
import Breadcrumbs from "../components/common/Breadcrumbs";
import ImageGallery from "../components/pdp/ImageGallery";
import ProductInfo from "../components/pdp/ProductInfo";
// NOTE: FeaturesSection import and usage are removed from this page
import ProductTabs from "../components/pdp/ProductTabs";
import RelatedProductsSection from "../components/pdp/RelatedProductsSection";
import NewsletterSection from "../components/landing/NewsletterSection";
import { FiLoader, FiAlertTriangle } from "react-icons/fi"; // Icons for loading/error states

// Placeholder fetch logic using utility function (simulates fetching)
const fetchProductByIdSimulated = async (
  id: string | undefined
): Promise<Product | null> => {
  // Added check for undefined id
  if (id === undefined) {
    console.error("PDP: Product ID is undefined.");
    return null;
  }
  console.log(`PDP: Simulating fetch for product with ID: ${id}`);
  await new Promise((resolve) => setTimeout(resolve, 150)); // Simulate network delay
  const product = getProductById(id); // Get data from mock source via utility
  if (!product) {
    console.warn(`PDP: Product with ID ${id} not found in mock data.`);
  }
  return product || null; // Return product or null if not found
};

const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>(); // Get productId from URL
  const [product, setProduct] = useState<Product | null>(null); // State for the fetched product
  const [loading, setLoading] = useState(true); // Loading state for data fetching
  const [error, setError] = useState<string | null>(null); // Error state

  // Effect to fetch product data when productId changes
  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true); // Start loading
      setError(null); // Clear previous errors
      window.scrollTo(0, 0); // Scroll to top on new product load

      try {
        const data = await fetchProductByIdSimulated(productId); // Fetch data
        if (data) {
          setProduct(data); // Set product state if found
        } else {
          setError(`Product with ID "${productId}" not found.`); // Set error if not found
        }
      } catch (err) {
        setError("Failed to fetch product details. Please try again later."); // Set error on fetch failure
        console.error("PDP Fetch Error:", err);
      } finally {
        setLoading(false); // Stop loading regardless of outcome
      }
    };
    loadProduct(); // Run the loading function
  }, [productId]); // Re-run effect if productId changes

  // --- Loading State ---
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)] w-full">
        <FiLoader className="animate-spin text-brand-primary text-4xl" />
        <span className="ml-3 text-lg">Loading Product...</span>
      </div>
    );
  }

  // --- Error State ---
  if (error) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col items-center justify-center text-center text-red-600 bg-red-100 p-6 rounded-lg my-10 shadow-md border border-red-200">
          <FiAlertTriangle className="text-5xl mb-3 mx-auto text-red-500" />
          <p className="font-semibold text-lg mb-2">Oops! An Error Occurred</p>
          <p className="mb-4">{error}</p>
          <Link
            to="/products"
            className="text-blue-600 hover:underline font-medium"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  // --- Product Not Found State ---
  // This condition is met if loading finished, there was no error, but product is still null
  if (!product) {
    return (
      <div className="container mx-auto p-8 text-center text-xl text-brand-gray-dark">
        Product data could not be loaded or the product does not exist.
        <br />
        <Link
          to="/products"
          className="mt-4 inline-block text-brand-primary hover:underline font-medium"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  // --- Generate Breadcrumbs (Only if product exists) ---
  const breadcrumbs = [
    { name: "Home", href: "/" },
    // Add main category link if available
    ...(product.category
      ? [
          {
            name: product.category,
            href: `/products?category=${encodeURIComponent(product.category)}`,
          },
        ]
      : [{ name: "Products", href: "/products" }]),
    // Add subcategory link if available (optional)
    // ...(product.subCategory ? [{ name: product.subCategory, href: `/products?category=${encodeURIComponent(product.category || '')}&subCategory=${encodeURIComponent(product.subCategory)}` }] : []),
    { name: product.title }, // Current product name is the last item (no href)
  ];

  // --- Render Product Content ---
  return (
    <div>
      {" "}
      {/* Renders inside main Layout (which has Navbar/Footer) */}
      <Breadcrumbs
        items={breadcrumbs}
        className="bg-white border-b border-gray-200"
      />
      {/* Main Product Section: Image Gallery + Product Info */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16">
          {/* Left Column: Image Gallery */}
          <div className="w-full lg:w-1/2 xl:w-7/12 flex-shrink-0">
            {/* Pass images array (use fallback if missing), pass alt text */}
            <ImageGallery
              images={product.images ?? [product.imageUrl]}
              alt={product.title}
            />
          </div>
          {/* Right Column: Product Info */}
          <div className="w-full lg:w-1/2 xl:w-5/12">
            {/* Pass the validated, non-null product object */}
            <ProductInfo product={product} />
          </div>
        </div>
      </div>
      {/* Tabs Section for Details, Reviews etc. */}
      <ProductTabs product={product} />
      {/* Related Products Section */}
      <RelatedProductsSection productId={product.id} />
      {/* Newsletter Section */}
      <NewsletterSection />
      {/* Footer is automatically rendered by the main Layout component */}
    </div>
  );
};

export default ProductDetailsPage;
