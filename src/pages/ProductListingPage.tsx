// src/pages/ProductListingPage.tsx
import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { useSearchParams } from "react-router-dom";
// *** ENSURE THESE IMPORT PATHS ARE CORRECT FOR YOUR PROJECT ***
import { Product } from "../types/product"; // Adjust path if needed
import { ALL_PRODUCTS_MOCK } from "../data/products"; // Adjust path if needed
// Import Components
import Breadcrumbs from "../components/common/Breadcrumbs";
import FiltersSidebar from "../components/common/plp/FiltersSidebar"; // Using path user specified
import ProductCard from "../components/products/ProductCard";
import Pagination from "../components/common/plp/Pagination"; // Using path user specified
import {
  FiGrid,
  FiList,
  FiLoader,
  FiAlertTriangle,
  FiChevronDown,
} from "react-icons/fi";

const ITEMS_PER_PAGE = 12; // Number of products per page

// Helper function to safely parse integers from URL params
const safeParseInt = (value: string | null, defaultValue: number): number => {
  if (value === null) return defaultValue;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) || parsed < 1 ? defaultValue : parsed;
};

// Define structure for the filter state object
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

// Centralized function to filter and sort products (can be moved to utils.ts)
const filterAndSortProducts = (
  products: Product[],
  filters: FilterState,
  sort: string
): Product[] => {
  console.log("Running filterAndSortProducts with:", filters, sort);
  let results = [...products];
  // Apply Filters (with checks for optional properties)
  try {
    if (filters.category) {
      const fLower = filters.category.trim().toLowerCase();
      results = results.filter(
        (p) => p.category?.trim().toLowerCase() === fLower
      );
    }
    if (filters.subCategory) {
      const fLower = filters.subCategory.trim().toLowerCase();
      results = results.filter(
        (p) => p.subCategory?.trim().toLowerCase() === fLower
      );
    }
    if (filters.tag) {
      const fLower = filters.tag.trim().toLowerCase();
      results = results.filter((p) =>
        p.tags?.some((t) => t.trim().toLowerCase() === fLower)
      );
    }
    results = results.filter(
      (p) =>
        p.price >= filters.priceRange.min && p.price <= filters.priceRange.max
    );
    if (filters.brands.length > 0) {
      results = results.filter(
        (p) => !!p.brand && filters.brands.includes(p.brand)
      );
    }
    if (filters.sizes.length > 0) {
      results = results.filter(
        (p) => !!p.sizes && p.sizes.some((s) => filters.sizes.includes(s))
      );
    }
    if (filters.colors.length > 0) {
      results = results.filter(
        (p) => !!p.colors && p.colors.some((c) => filters.colors.includes(c))
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
  } // Return unfiltered on error

  // Apply Sorting
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
        break; // Keep original order if sort is 'default'
    }
  } catch (e) {
    console.error("Error during sorting:", e);
  }
  console.log("Filtered/Sorted Results Count:", results.length);
  return results;
};

const ProductListingPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // --- Component State ---
  // Initialized ONCE from URL params using initializer functions
  const [currentPage, setCurrentPage] = useState(() =>
    safeParseInt(searchParams.get("page"), 1)
  );
  const [sortOption, setSortOption] = useState(
    () => searchParams.get("sort") || "default"
  );
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    () => searchParams.getAll("brand") || []
  );
  const [selectedCollections, setSelectedCollections] = useState<string[]>(
    () => searchParams.getAll("collection") || ["all"]
  );
  const [selectedSizes, setSelectedSizes] = useState<string[]>(
    () => searchParams.getAll("size") || []
  );
  const [selectedColors, setSelectedColors] = useState<string[]>(
    () => searchParams.getAll("color") || []
  );
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>(
    () => ({
      min: safeParseInt(searchParams.get("minPrice"), 1),
      max: safeParseInt(searchParams.get("maxPrice"), 1000),
    })
  );
  // State specifically derived from URL (category, subCategory, tag)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(() =>
    searchParams.get("category")
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    () => searchParams.get("subCategory")
  );
  const [selectedTag, setSelectedTag] = useState<string | null>(() =>
    searchParams.get("tag")
  );

  // Loading/Error state (mainly for potential async operations later)
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);
  // Ref to track if component has finished its initial mounting and state setup
  const isMounted = useRef(false);
  // --- End State ---

  // --- Effect to Sync State FROM URL (Runs on initial load & back/forward nav) ---
  useEffect(() => {
    console.log("Effect [searchParams]: Running.", searchParams.toString());
    // Update state to match URL params
    setSelectedBrands(searchParams.getAll("brand") || []);
    setSelectedCollections(searchParams.getAll("collection") || ["all"]);
    setSelectedSizes(searchParams.getAll("size") || []);
    setSelectedColors(searchParams.getAll("color") || []);
    setPriceRange({
      min: safeParseInt(searchParams.get("minPrice"), 1),
      max: safeParseInt(searchParams.get("maxPrice"), 1000),
    });
    setSelectedCategory(searchParams.get("category") || null);
    setSelectedSubCategory(searchParams.get("subCategory") || null);
    setSelectedTag(searchParams.get("tag") || null);
    setSortOption(searchParams.get("sort") || "default");
    setCurrentPage(safeParseInt(searchParams.get("page"), 1));

    // Mark initial render/sync complete after the first run
    isMounted.current = true;
  }, [searchParams]); // IMPORTANT: Only depends on searchParams

  // --- Effect to Update URL FROM State (Runs after state changes post-mount) ---
  useEffect(() => {
    // Do not update URL during the initial render cycle
    if (!isMounted.current) return;

    console.log("Effect [State Change]: Updating URL from state");
    const newParams = new URLSearchParams();
    // Build query params string from current state
    if (selectedCategory) newParams.set("category", selectedCategory);
    if (selectedSubCategory) newParams.set("subCategory", selectedSubCategory);
    if (selectedTag) newParams.set("tag", selectedTag);
    selectedBrands.forEach((b) => newParams.append("brand", b));
    selectedCollections
      .filter((c) => c !== "all")
      .forEach((c) => newParams.append("collection", c));
    selectedSizes.forEach((s) => newParams.append("size", s));
    selectedColors.forEach((c) => newParams.append("color", c));
    if (priceRange.min !== 1) newParams.set("minPrice", String(priceRange.min));
    if (priceRange.max !== 1000)
      newParams.set("maxPrice", String(priceRange.max));
    if (sortOption !== "default") newParams.set("sort", sortOption);
    if (currentPage !== 1) newParams.set("page", String(currentPage));

    // Only call setSearchParams if the params actually changed to avoid potential loops
    if (newParams.toString() !== searchParams.toString()) {
      setSearchParams(newParams, { replace: true });
    }

    // Depend on all state variables that should be reflected in the URL
  }, [
    selectedBrands,
    selectedCollections,
    selectedSizes,
    selectedColors,
    priceRange,
    selectedCategory,
    selectedSubCategory,
    selectedTag,
    sortOption,
    currentPage,
    setSearchParams,
  ]); // Removed searchParams from here

  // --- Filtering and Sorting (Memoized based on State) ---
  const filteredAndSortedProducts = useMemo(() => {
    // Filters are based on the current state variables
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
    return filterAndSortProducts(ALL_PRODUCTS_MOCK, currentFilters, sortOption);
  }, [
    selectedBrands,
    selectedCollections,
    selectedSizes,
    selectedColors,
    priceRange,
    selectedCategory,
    selectedSubCategory,
    selectedTag,
    sortOption,
  ]); // Depend on state filters/sort

  // --- Scroll to Top on Page Change ---
  useEffect(() => {
    if (isMounted.current) {
      // Avoid scroll on initial mount
      console.log(
        `Effect [currentPage Changed]: Scrolling to top for page ${currentPage}`
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage]); // Trigger only when currentPage state changes

  // --- Pagination Logic ---
  const totalProducts = filteredAndSortedProducts.length;
  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo<Product[]>(() => {
    // Calculate based on the *current* currentPage state
    const validCurrentPage = Math.max(
      1,
      Math.min(currentPage, totalPages || 1)
    );
    const startIndex = (validCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedProducts.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
  }, [filteredAndSortedProducts, currentPage, totalPages]);

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
    } // Make last item non-clickable
    return items;
  }, [selectedCategory, selectedSubCategory, selectedTag]);

  // --- Handlers to Update STATE Directly (which then trigger URL update effect) ---
  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage !== currentPage) {
        console.log(`Handler: Setting page state to ${newPage}`);
        setCurrentPage(newPage); // Update state directly
      }
    },
    [currentPage]
  );

  const handleSortChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newSort = e.target.value;
      console.log(
        `Handler: Setting sort state to ${newSort} and resetting page`
      );
      setSortOption(newSort);
      setCurrentPage(1); // Reset page state directly when sorting changes
    },
    []
  );

  // Filter Handlers - update state and reset page
  const handleBrandChange = useCallback((brands: string[]) => {
    setSelectedBrands(brands);
    setCurrentPage(1);
  }, []);
  const handleCollectionChange = useCallback((collections: string[]) => {
    setSelectedCollections(collections);
    setCurrentPage(1);
  }, []);
  const handleSizeChange = useCallback((sizes: string[]) => {
    setSelectedSizes(sizes);
    setCurrentPage(1);
  }, []);
  const handleColorChange = useCallback((colors: string[]) => {
    setSelectedColors(colors);
    setCurrentPage(1);
  }, []);
  const handlePriceChange = useCallback(
    (price: { min: number; max: number }) => {
      setPriceRange(price);
      setCurrentPage(1);
    },
    []
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
            {/* Pass state values AND state-updating handlers */}
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
                {" "}
                {/* View Mode Buttons */}
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
                {" "}
                {/* Result Count */}
                Showing{" "}
                {(currentPage - 1) * ITEMS_PER_PAGE +
                  (paginatedProducts.length > 0 ? 1 : 0)}
                -{(currentPage - 1) * ITEMS_PER_PAGE + paginatedProducts.length}{" "}
                of {totalProducts} results
              </div>
              <div className="relative flex-shrink-0">
                {" "}
                {/* Sort Dropdown */}
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
            {error ? ( // Check Error state
              <div className="flex flex-col items-center justify-center h-64 text-center text-red-600 bg-red-50 p-6 rounded-lg">
                <FiAlertTriangle className="text-4xl mb-3 mx-auto" />
                <p className="font-semibold">Error:</p>
                <p>{error}</p>
              </div>
            ) : loading ? ( // Check Loading state (optional for sync filtering)
              <div className="flex justify-center items-center h-96">
                <FiLoader className="animate-spin text-brand-primary text-4xl" />
              </div>
            ) : paginatedProducts.length > 0 ? ( // Check if results exist
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
                {/* Pagination Component */}
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    className="mt-12 md:mt-16"
                  />
                )}
              </>
            ) : (
              // Empty state if no errors and no results
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
