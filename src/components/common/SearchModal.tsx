// src/components/common/SearchModal.tsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiX, FiLoader } from "react-icons/fi";
import { Product } from "../../types/product"; // Adjust path
import { searchProducts } from "../../data/utils"; // Adjust path
import InputField from "../ui/InputField"; // Reusing InputField

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Simple debounce hook (optional, can implement directly in useEffect)
function useDebounce(value: string, delay: number): string {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    }; // Cleanup on unmount or value/delay change
  }, [value, delay]);
  return debouncedValue;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300); // Debounce input by 300ms
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Effect to focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      // Timeout ensures input is visible before focusing
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      // Reset search when closing
      setSearchTerm("");
      setResults([]);
    }
  }, [isOpen]);

  // Effect to perform search when debounced term changes
  useEffect(() => {
    if (debouncedSearchTerm.trim().length > 1) {
      // Start search after 2 chars
      setIsLoading(true);
      console.log(`Searching for (debounced): "${debouncedSearchTerm}"`);
      // Simulate async search if needed, currently sync with mock data
      const searchResults = searchProducts(debouncedSearchTerm);
      setResults(searchResults);
      setIsLoading(false);
    } else {
      setResults([]); // Clear results if term is too short
    }
  }, [debouncedSearchTerm]);

  const handleResultClick = () => {
    onClose(); // Close modal when a result is clicked
  };

  // Handle submitting the search (e.g., pressing Enter)
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onClose(); // Close modal
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`); // Navigate to search results page
    }
  };

  if (!isOpen) return null;

  return (
    // Using fixed position and z-index for modal overlay effect
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4"
      onClick={onClose} // Close on overlay click
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
    >
      {/* Optional dark overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm"
        aria-hidden="true"
      ></div>

      {/* Modal Content */}
      <div
        className="relative z-10 bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Prevent closing on content click
      >
        {/* Search Input Form */}
        <form
          onSubmit={handleSearchSubmit}
          className="relative border-b border-gray-200"
        >
          <InputField
            ref={inputRef} // Assign ref
            id="search-modal-input"
            label="Search Products" // Visually hidden label
            labelClassName="sr-only"
            type="search"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            // Override styles for modal input
            containerClassName="w-full"
            className="h-16 text-lg pl-14 pr-16 border-0 focus:ring-0" // Increased padding for icons
          />
          {/* Search Icon inside input */}
          <div className="absolute left-4 top-0 bottom-0 flex items-center pointer-events-none text-gray-400">
            <FiSearch size={24} />
          </div>
          {/* Clear/Close Button inside input */}
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute right-14 top-0 bottom-0 px-3 flex items-center text-gray-500 hover:text-gray-800"
              aria-label="Clear search"
            >
              <FiX size={18} />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-0 bottom-0 px-3 flex items-center text-gray-500 hover:text-gray-800"
            aria-label="Close search"
          >
            <FiX size={24} />
          </button>
        </form>

        {/* Search Results Area */}
        {/* Set max height and allow scrolling */}
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <FiLoader className="animate-spin text-brand-primary text-2xl" />
            </div>
          ) : debouncedSearchTerm.trim().length > 1 && results.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              No products found for "{debouncedSearchTerm}".
            </p>
          ) : results.length > 0 ? (
            <ul className="divide-y divide-gray-100">
              {results.slice(0, 10).map(
                (
                  product // Limit results shown in modal
                ) => (
                  <li key={product.id}>
                    <Link
                      to={`/products/${product.id}`}
                      onClick={handleResultClick}
                      className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-md transition-colors"
                    >
                      <img
                        src={product.imageUrl || "..."}
                        alt={product.title}
                        className="w-12 h-12 object-cover rounded flex-shrink-0 bg-gray-100"
                      />
                      <div className="flex-grow overflow-hidden">
                        <p className="font-medium text-black truncate">
                          {product.title}
                        </p>
                        {/* Optionally show category or price */}
                        <p className="text-sm text-brand-gray-dark truncate">
                          {product.category || product.brand}
                        </p>
                      </div>
                    </Link>
                  </li>
                )
              )}
              {/* Optional: Link to full search results page */}
              {results.length > 10 && (
                <li className="pt-3 text-center">
                  <Link
                    to={`/search?q=${encodeURIComponent(debouncedSearchTerm)}`}
                    onClick={handleResultClick}
                    className="text-sm text-brand-primary hover:underline font-medium"
                  >
                    View all {results.length} results &rarr;
                  </Link>
                </li>
              )}
            </ul>
          ) : debouncedSearchTerm.trim().length <= 1 &&
            searchTerm.length > 0 ? (
            <p className="text-center text-gray-400 py-8">
              Keep typing to search...
            </p>
          ) : null}
          {/* Initial empty state or suggestions could go here */}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
