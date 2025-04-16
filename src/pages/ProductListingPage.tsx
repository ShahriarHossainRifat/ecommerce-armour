// src/pages/ProductListingPage.tsx
import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { useSearchParams } from "react-router-dom";
// *** ENSURE THESE IMPORT PATHS ARE CORRECT ***
import { Product } from "../types/product";
import { ALL_PRODUCTS_MOCK } from "../data/products";
// Import Components
import Breadcrumbs from "../components/common/Breadcrumbs";
import FiltersSidebar from "../components/common/plp/FiltersSidebar"; // Using user's path
import ProductCard from "../components/products/ProductCard";
import Pagination from "../components/common/plp/Pagination"; // Using user's path
import {
  FiGrid,
  FiList,
  FiLoader,
  FiAlertTriangle,
  FiChevronDown,
} from "react-icons/fi";

const ITEMS_PER_PAGE = 12;

// Helper function to safely parse numbers from URL params
const safeParseInt = (value: string | null, defaultValue: number): number => {
  if (value === null) return defaultValue;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) || parsed < 1 ? defaultValue : parsed;
};

// Define Filter State Type for clarity
interface FilterState {
  category?: string | null;
  tag?: string | null;
  subCategory?: string | null;
  priceRange: { min: number; max: number };
  brands: string[];
  sizes: string[];
  colors: string[];
  collections: string[];
}

// Centralized function to filter and sort products based on current state
const filterAndSortProducts = (
  products: Product[],
  filters: FilterState,
  sort: string
): Product[] => {
  console.log("Filtering/Sorting with:", filters, sort);
  let results = [...products];
  // Apply Filters Safely... (Ensure this logic is complete and correct)
  try {
    if (filters.category) {
      const f = filters.category.trim().toLowerCase();
      results = results.filter((p) => p.category?.trim().toLowerCase() === f);
    }
    if (filters.subCategory) {
      const f = filters.subCategory.trim().toLowerCase();
      results = results.filter(
        (p) => p.subCategory?.trim().toLowerCase() === f
      );
    }
    if (filters.tag) {
      const f = filters.tag.trim().toLowerCase();
      results = results.filter(
        (p) => p.tags && p.tags.some((t) => t.trim().toLowerCase() === f)
      );
    }
    results = results.filter(
      (p) =>
        p.price >= filters.priceRange.min && p.price <= filters.priceRange.max
    );
    if (filters.brands.length > 0) {
      results = results.filter(
        (p) => p.brand && filters.brands.includes(p.brand)
      );
    }
    if (filters.sizes.length > 0) {
      results = results.filter(
        (p) => p.sizes && p.sizes.some((s) => filters.sizes.includes(s))
      );
    }
    if (filters.colors.length > 0) {
      results = results.filter(
        (p) => p.colors && p.colors.some((c) => filters.colors.includes(c))
      );
    }
    const activeCollections = filters.collections.filter((c) => c !== "all");
    if (activeCollections.length > 0) {
      results = results.filter(
        (p) =>
          p.tags?.some((t) => activeCollections.includes(t)) ||
          (p.category && activeCollections.includes(p.category)) ||
          (p.subCategory && activeCollections.includes(p.subCategory))
      );
    }
  } catch (e) {
    console.error("Error during filtering:", e);
    return products;
  }
  // Apply Sorting...
  try {
    switch (sort) {
      case "price-asc":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        results.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        results.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-desc":
        results.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "rating":
        results.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      default:
        break;
    }
  } catch (e) {
    console.error("Error during sorting:", e);
  }
  console.log("Filtered Results Count:", results.length);
  return results;
};

const ProductListingPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isMounted = useRef(false); // Track mount status

  // --- Derive state directly from URL search params using useMemo ---
  // These values are read-only representations of the URL state
  const currentPage = useMemo(
    () => safeParseInt(searchParams.get("page"), 1),
    [searchParams]
  );
  const sortOption = useMemo(
    () => searchParams.get("sort") || "default",
    [searchParams]
  );
  const selectedBrands = useMemo(
    () => searchParams.getAll("brand") || [],
    [searchParams]
  );
  const selectedCollections = useMemo(
    () => searchParams.getAll("collection") || ["all"],
    [searchParams]
  );
  const selectedSizes = useMemo(
    () => searchParams.getAll("size") || [],
    [searchParams]
  );
  const selectedColors = useMemo(
    () => searchParams.getAll("color") || [],
    [searchParams]
  );
  const priceRange = useMemo(
    () => ({
      min: safeParseInt(searchParams.get("minPrice"), 1),
      max: safeParseInt(searchParams.get("maxPrice"), 1000),
    }),
    [searchParams]
  );
  const selectedCategory = useMemo(
    () => searchParams.get("category") || null,
    [searchParams]
  );
  const selectedSubCategory = useMemo(
    () => searchParams.get("subCategory") || null,
    [searchParams]
  );
  const selectedTag = useMemo(
    () => searchParams.get("tag") || null,
    [searchParams]
  );

  // --- Local UI state (not directly tied to URL filters) ---
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading] = useState(false); // For visual feedback if needed
  const [error] = useState<string | null>(null);
  // --- End State ---

  // --- Filtering and Sorting Products (Memoized based on derived state) ---
  const filteredAndSortedProducts = useMemo(() => {
    // Build filter object from derived state variables
    const currentFilters: FilterState = {
      category: selectedCategory,
      tag: selectedTag,
      subCategory: selectedSubCategory,
      priceRange,
      brands: selectedBrands,
      sizes: selectedSizes,
      colors: selectedColors,
      collections: selectedCollections,
    };
    // In a real app with API calls, this might trigger fetching based on filters/sort
    // For mock data, we filter directly here
    return filterAndSortProducts(ALL_PRODUCTS_MOCK, currentFilters, sortOption);
  }, [
    priceRange,
    selectedBrands,
    selectedSizes,
    selectedColors,
    selectedCollections,
    sortOption,
    selectedCategory,
    selectedSubCategory,
    selectedTag,
  ]); // Depend on derived filter/sort values

  // --- Pagination Logic ---
  const totalProducts = filteredAndSortedProducts.length;
  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);
  // Ensure current page from URL isn't invalid after filtering
  const validCurrentPage = useMemo(
    () => Math.max(1, Math.min(currentPage, totalPages || 1)),
    [currentPage, totalPages]
  );
  // Calculate products for the current valid page
  const paginatedProducts = useMemo<Product[]>(() => {
    const startIndex = (validCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedProducts.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
  }, [filteredAndSortedProducts, validCurrentPage]);

  // --- Scroll to Top on Page Change ---
  useEffect(() => {
    // Only scroll after initial mount
    if (isMounted.current) {
      console.log(
        `Effect [currentPage derived]: Scrolling to top for page ${currentPage}`
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage]); // Trigger when derived currentPage changes

  // --- Effect to mark initial mount done ---
  useEffect(() => {
    isMounted.current = true;
  }, []);

  // --- Dynamic Breadcrumbs ---
  const breadcrumbs = useMemo(() => {
    const items: { name: string; href?: string }[] = [
      { name: "Home", href: "/" },
    ];
    if (selectedCategory) {
      items.push({
        name: selectedCategory,
        href: `/products?category=${encodeURIComponent(selectedCategory)}`,
      });
    } else {
      items.push({ name: "Products", href: "/products" });
    }
    if (selectedSubCategory) {
      items.push({ name: selectedSubCategory });
    } else if (selectedTag) {
      items.push({ name: selectedTag });
    }
    if (items.length > 1) {
      items[items.length - 1].href = undefined;
    }
    return items;
  }, [selectedCategory, selectedSubCategory, selectedTag]);

  // --- Handlers that update URL Search Params ---
  // These functions create the *next* URL state based on user action
  const handlePageChange = useCallback(
    (newPage: number) => {
      console.log(`Handler: Updating URL page to ${newPage}`);
      const newParams = new URLSearchParams(searchParams);
      if (newPage <= 1) newParams.delete("page");
      else newParams.set("page", String(newPage));
      setSearchParams(newParams, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  const handleSortChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newSort = e.target.value;
      console.log(
        `Handler: Updating URL sort to ${newSort} and resetting page`
      );
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("page"); // Reset page param
      if (newSort === "default") newParams.delete("sort");
      else newParams.set("sort", newSort);
      setSearchParams(newParams, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  // Generic handler for sidebar filter changes
  const handleFilterChange = useCallback(
    (filterKey: string, value: any) => {
      console.log(`Handler: Updating URL filter ${filterKey} to`, value);
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("page"); // Reset page on filter change
      newParams.delete(filterKey); // Clear previous values for this specific filter key

      // Add new values based on type
      if (Array.isArray(value)) {
        // Handle arrays (brands, sizes, colors, collections)
        value
          .filter((v) => v !== "all")
          .forEach((v) => newParams.append(filterKey, v));
      } else if (filterKey === "priceRange") {
        // Handle price range object
        if (value.min > 1) newParams.set("minPrice", String(value.min));
        else newParams.delete("minPrice");
        if (value.max < 1000) newParams.set("maxPrice", String(value.max));
        else newParams.delete("maxPrice");
      }
      // Add other single value filter logic here if needed

      setSearchParams(newParams, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  // Specific handlers using the generic one, passed to FiltersSidebar
  const handleBrandChange = useCallback(
    (brands: string[]) => handleFilterChange("brand", brands),
    [handleFilterChange]
  );
  const handleCollectionChange = useCallback(
    (collections: string[]) => handleFilterChange("collection", collections),
    [handleFilterChange]
  );
  const handleSizeChange = useCallback(
    (sizes: string[]) => handleFilterChange("size", sizes),
    [handleFilterChange]
  );
  const handleColorChange = useCallback(
    (colors: string[]) => handleFilterChange("color", colors),
    [handleFilterChange]
  );
  const handlePriceChange = useCallback(
    (price: { min: number; max: number }) =>
      handleFilterChange("priceRange", price),
    [handleFilterChange]
  );
  // --- End Handlers ---

  return (
    <div>
      <Breadcrumbs
        items={breadcrumbs}
        className="bg-white border-b border-gray-200"
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-1/4 xl:w-1/5 flex-shrink-0">
            {/* Pass DERIVED state values AND the URL-updating handlers */}
            <FiltersSidebar
              priceRange={priceRange}
              onPriceChange={handlePriceChange}
              selectedBrands={selectedBrands}
              onBrandChange={handleBrandChange}
              selectedSizes={selectedSizes}
              onSizeChange={handleSizeChange}
              selectedColors={selectedColors}
              onColorChange={handleColorChange}
              selectedCollections={selectedCollections}
              onCollectionChange={handleCollectionChange}
            />
          </div>
          {/* Main Content Area */}
          <div className="w-full lg:w-3/4 xl:w-4/5">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 pb-4 border-b border-gray-200 gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${
                    viewMode === "grid"
                      ? "bg-gray-200 text-black"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                  aria-label="Grid view"
                  aria-pressed={viewMode === "grid"}
                >
                  {" "}
                  <FiGrid className="w-5 h-5" />{" "}
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${
                    viewMode === "list"
                      ? "bg-gray-200 text-black"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                  aria-label="List view"
                  aria-pressed={viewMode === "list"}
                >
                  {" "}
                  <FiList className="w-5 h-5" />{" "}
                </button>
              </div>
              <div className="text-sm text-brand-dark flex-shrink-0">
                Showing{" "}
                {(validCurrentPage - 1) * ITEMS_PER_PAGE +
                  (paginatedProducts.length > 0 ? 1 : 0)}
                -
                {(validCurrentPage - 1) * ITEMS_PER_PAGE +
                  paginatedProducts.length}{" "}
                of {totalProducts} results
              </div>
              <div className="relative flex-shrink-0">
                <select
                  id="sort-by"
                  value={sortOption}
                  onChange={handleSortChange}
                  className="appearance-none border border-brand-gray-dark rounded-md pl-4 pr-10 py-2 text-base focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary h-[42px] bg-white"
                  aria-label="Sort products by"
                >
                  <option value="default">Sort by Default</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                  <option value="rating">Rating</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Content Display */}
            {error ? (
              <div className="flex flex-col items-center justify-center h-64 text-center text-red-600 bg-red-50 p-6 rounded-lg">
                <FiAlertTriangle className="text-4xl mb-3 mx-auto" />
                <p className="font-semibold">Error:</p>
                <p>{error}</p>
              </div>
            ) : loading ? ( // Show loading indicator (optional)
              <div className="flex justify-center items-center h-96">
                <FiLoader className="animate-spin text-brand-primary text-4xl" />
              </div>
            ) : paginatedProducts.length > 0 ? (
              <>
                <div
                  className={`grid gap-6 md:gap-8 ${
                    viewMode === "grid"
                      ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                      : "grid-cols-1"
                  }`}
                >
                  {paginatedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      showAddToCartButton={true}
                    />
                  ))}
                </div>
                {/* Pass derived currentPage and the URL-updating handler */}
                {totalPages > 1 && (
                  <Pagination
                    currentPage={validCurrentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    className="mt-12 md:mt-16"
                  />
                )}
              </>
            ) : (
              <div className="text-center py-16 border border-dashed border-gray-300 rounded-lg bg-gray-50">
                <p className="text-xl text-brand-gray-dark">
                  No products match your current filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
