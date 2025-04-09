// src/pages/ProductListingPage.tsx
import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { useSearchParams } from "react-router-dom";
// *** ENSURE THESE IMPORT PATHS ARE CORRECT ***
import { Product } from "../types/product";
import { ALL_PRODUCTS_MOCK } from "../data/products";
// Import Components
import Breadcrumbs from "../components/common/Breadcrumbs";
import FiltersSidebar from "../components/common/plp/FiltersSidebar";
import ProductCard from "../components/products/ProductCard";
import Pagination from "../components/common/plp/Pagination";
import {
  FiGrid,
  FiList,
  FiLoader,
  FiAlertTriangle,
  FiChevronDown,
} from "react-icons/fi";

const ITEMS_PER_PAGE = 12;

const safeParseInt = (value: string | null, defaultValue: number): number => {
  if (value === null) return defaultValue;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
};

// Centralized filter/sort logic
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

const filterAndSortProducts = (
  products: Product[],
  filters: FilterState,
  sort: string
): Product[] => {
  console.log("Filtering/Sorting with:", filters, sort);
  let results = [...products];
  // --- Apply Filters Safely ---
  if (filters.category) {
    const f = filters.category.trim().toLowerCase();
    results = results.filter((p) => p.category?.trim().toLowerCase() === f);
  }
  if (filters.subCategory) {
    const f = filters.subCategory.trim().toLowerCase();
    results = results.filter((p) => p.subCategory?.trim().toLowerCase() === f);
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
  // --- Apply Sorting ---
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
  console.log("Filtered Results Count:", results.length);
  return results;
};

const ProductListingPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // --- State ---
  const [loading] = useState(false);
  const [error] = useState<string | null>(null); // Currently only for potential future async errors
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState(
    () => searchParams.get("sort") || "default"
  );
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  // Filter States
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 1,
    max: 1000,
  });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null
  );
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const isInitialRender = useRef(true);
  // --- End State ---

  // --- Effect to Sync State <-> URL ---
  useEffect(() => {
    // Update state from URL params on load and back/forward navigation
    console.log(
      "Effect: Syncing state from URL Search Params:",
      searchParams.toString()
    );
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
    isInitialRender.current = false; // Mark initial sync from URL as done
  }, [searchParams]);

  // --- Effect to Update URL when state changes (from sidebar/pagination/sorting) ---
  // Separate effect to avoid loops with the one reading from searchParams
  useEffect(() => {
    // Don't update URL during the initial render cycle
    if (isInitialRender.current) return;

    console.log("Effect: Updating URL from state change");
    const newParams = new URLSearchParams();
    if (selectedCategory) newParams.set("category", selectedCategory);
    if (selectedSubCategory) newParams.set("subCategory", selectedSubCategory);
    if (selectedTag) newParams.set("tag", selectedTag);
    selectedBrands.forEach((b) => newParams.append("brand", b));
    // Only add collections if it's not just ['all']
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

    // Use replace to avoid polluting history during filtering/sorting/pagination
    setSearchParams(newParams, { replace: true });
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
  ]);

  // --- Filtering and Sorting (Memoized) ---
  const filteredAndSortedProducts = useMemo(() => {
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
    priceRange,
    selectedBrands,
    selectedSizes,
    selectedColors,
    selectedCollections,
    sortOption,
    selectedCategory,
    selectedSubCategory,
    selectedTag,
  ]);

  // --- Effect to Reset Page on Filter/Sort Change ---
  useEffect(() => {
    if (!isInitialRender.current) {
      console.log("Effect: Filters/Sort changed, resetting page to 1.");
      setCurrentPage(1); // Reset page number state
    }
    // Run when any filter/sort state (that affects results) changes
  }, [filteredAndSortedProducts]); // Depend on the result list itself changing

  // --- Scroll to Top on Page Change ---
  useEffect(() => {
    if (!isInitialRender.current) {
      // Avoid scroll on initial render
      try {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (error) {
        console.error("PLP ScrollToTop failed:", error);
      }
    }
  }, [currentPage]); // Trigger only when currentPage state changes

  // --- Pagination Logic ---
  const totalProducts = filteredAndSortedProducts.length;
  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo<Product[]>(() => {
    // Ensure currentPage is valid before slicing
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
    // *** CORRECTED: Explicitly type and RETURN the array ***
    const items: { name: string; href?: string }[] = [
      { name: "Home", href: "/" },
    ];

    if (selectedCategory) {
      items.push({
        name: selectedCategory,
        href: `/products?category=${encodeURIComponent(selectedCategory)}`,
      });
      if (selectedSubCategory) {
        items.push({ name: selectedSubCategory }); // No href for last item
      }
    } else if (selectedSubCategory) {
      items.push({ name: "Products", href: "/products" });
      items.push({ name: selectedSubCategory });
    } else if (selectedTag) {
      items.push({ name: "Products", href: "/products" });
      items.push({ name: selectedTag });
    } else {
      items.push({ name: "Products" }); // Default last item if no filters
    }
    return items; // <<< Added explicit return
  }, [selectedCategory, selectedSubCategory, selectedTag]);

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
            <FiltersSidebar
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              selectedBrands={selectedBrands}
              onBrandChange={setSelectedBrands}
              selectedSizes={selectedSizes}
              onSizeChange={setSelectedSizes}
              selectedColors={selectedColors}
              onColorChange={setSelectedColors}
              selectedCollections={selectedCollections}
              onCollectionChange={setSelectedCollections}
              // Pass state setters down correctly
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
                {paginatedProducts.length > 0
                  ? (currentPage - 1) * ITEMS_PER_PAGE + 1
                  : 0}
                -{(currentPage - 1) * ITEMS_PER_PAGE + paginatedProducts.length}{" "}
                of {totalProducts} results
              </div>
              <div className="relative flex-shrink-0">
                <select
                  id="sort-by"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
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
            {/* Content Display - *** CORRECTED TERNARY SYNTAX *** */}
            {loading ? ( // Using loading state (currently only true briefly on filter change with mock data)
              <div className="flex justify-center items-center h-96">
                <FiLoader className="animate-spin text-brand-primary text-4xl" />
              </div>
            ) : error ? ( // Check for error state
              <div className="flex flex-col items-center justify-center h-64 text-center text-red-600 bg-red-50 p-6 rounded-lg">
                <FiAlertTriangle className="text-4xl mb-3 mx-auto" />
                <p className="font-semibold">Error:</p>
                <p>{error}</p>
              </div>
            ) : paginatedProducts.length > 0 ? ( // Check if products exist
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
                {/* Render pagination only if more than one page */}
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    className="mt-12 md:mt-16"
                  />
                )}
              </>
            ) : (
              // Else for paginatedProducts.length > 0 (Empty State)
              <div className="text-center py-16 border border-dashed border-gray-300 rounded-lg bg-gray-50">
                <p className="text-xl text-brand-gray-dark">
                  No products match your current filters.
                </p>
              </div>
            )}{" "}
            {/* Closing brace for the main JSX expression */}
            {/* --- END CORRECTION --- */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
