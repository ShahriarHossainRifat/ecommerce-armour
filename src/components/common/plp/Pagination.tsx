// src/components/plp/Pagination.tsx
import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void; // Function passed from parent to update state/URL
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange, // This should be the 'handlePageChange' function from PLP
  className = "",
}) => {
  if (totalPages <= 1) return null;

  // --- Handler Functions ---
  const handlePageClick = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    // *** DEBUG LOG ***
    console.log(
      `Pagination: Button Clicked - Requesting page change to ${page}`
    );
    onPageChange(page); // Call the function passed via props (handlePageChange in PLP)
  };

  const handlePrev = () => {
    handlePageClick(currentPage - 1);
  };

  const handleNext = () => {
    handlePageClick(currentPage + 1);
  };
  // --- End Handlers ---

  // --- Generate Page Numbers (with ellipsis logic - simplified) ---
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const delta = 1; // How many pages around current page
    const left = currentPage - delta;
    const right = currentPage + delta;

    pages.push(1); // Always show first page

    if (left > 2) pages.push("..."); // Ellipsis after page 1

    for (let i = Math.max(2, left); i <= Math.min(totalPages - 1, right); i++) {
      pages.push(i); // Middle pages
    }

    if (right < totalPages - 1) pages.push("..."); // Ellipsis before last page

    if (totalPages > 1) pages.push(totalPages); // Always show last page

    return pages;
  };
  // --- End Page Numbers ---

  return (
    <nav
      className={`flex justify-center items-center space-x-1 md:space-x-2 ${className}`}
      aria-label="Pagination"
    >
      {/* Previous Button */}
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="p-2 rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Previous page"
      >
        <FiChevronLeft className="w-5 h-5" />
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((page, index) =>
        typeof page === "number" ? (
          <button
            key={`${page}-${index}`}
            onClick={() => handlePageClick(page)}
            className={`w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-md text-sm font-medium transition-colors ${
              currentPage === page
                ? "bg-black text-white cursor-default"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            aria-current={currentPage === page ? "page" : undefined}
            disabled={currentPage === page}
          >
            {" "}
            {page}{" "}
          </button>
        ) : (
          <span
            key={`ellipsis-${index}`}
            className="px-1 md:px-2 text-gray-500 self-end pb-1.5"
          >
            {" "}
            {page}{" "}
          </span>
        )
      )}

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="p-2 rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Next page"
      >
        <FiChevronRight className="w-5 h-5" />
      </button>
    </nav>
  );
};

export default Pagination;
