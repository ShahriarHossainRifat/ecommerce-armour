// src/components/common/Breadcrumbs.tsx
import React from "react";
import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi"; // Example separator icon

interface BreadcrumbItem {
  name: string;
  href?: string; // Optional link for intermediate crumbs
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = "" }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={`bg-gray-100 ${className}`}>
      {" "}
      {/* Use background from CSS if needed */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center space-x-2 py-4">
          {" "}
          {/* Adjusted padding/spacing */}
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <FiChevronRight
                  className="h-5 w-5 text-gray-400 mx-1"
                  aria-hidden="true"
                />
              )}
              {item.href && index < items.length - 1 ? (
                <Link
                  to={item.href}
                  className="text-base font-medium text-brand-gray-dark hover:text-brand-primary transition-colors"
                >
                  {item.name}
                </Link>
              ) : (
                // Last item or item without href
                <span
                  className="text-base font-medium text-brand-dark"
                  aria-current={index === items.length - 1 ? "page" : undefined}
                >
                  {item.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
