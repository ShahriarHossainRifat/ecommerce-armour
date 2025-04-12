// src/components/landing/CategoriesSection.tsx
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import categoryCasualSrc from "../../assets/images/Categories/category-casual.webp";
import categoryHoodiesSrc from "../../assets/images/Categories/category-hoodies.webp";
import categoryActivewearSrc from "../../assets/images/Categories/category-activewear.webp";
import categoryJacketsSrc from "../../assets/images/Categories/category-jackets.webp";
import categoryShoesSrc from "../../assets/images/Categories/category-shoes.webp";
import categoryAccessoriesSrc from "../../assets/images/Categories/category-accessories.webp";

interface Category {
  id: number;
  name: string;
  linkQuery: string;
  imageUrl: string;
  gradient: string;
}

// Example data (ensure this matches your needs)
const categoriesData: Category[] = [
  {
    id: 1,
    name: "Casual Wear",
    linkQuery: "tag=Casual Wear",
    imageUrl: categoryCasualSrc,
    gradient: "from-blue-200/30 to-blue-500/30",
  }, // Example gradients
  {
    id: 2,
    name: "Hoodies & Sweaters",
    linkQuery: "subCategory=Hoodies",
    imageUrl: categoryHoodiesSrc,
    gradient: "from-purple-200/30 to-purple-500/30",
  },
  {
    id: 3,
    name: "Activewear",
    linkQuery: "tag=Activewear",
    imageUrl: categoryActivewearSrc,
    gradient: "from-green-200/30 to-green-500/30",
  },
  {
    id: 4,
    name: "Jackets & Vests",
    linkQuery: "subCategory=Jackets",
    imageUrl: categoryJacketsSrc,
    gradient: "from-orange-200/30 to-orange-500/30",
  },
  {
    id: 5,
    name: "Shoes",
    linkQuery: "category=Shoes",
    imageUrl: categoryShoesSrc,
    gradient: "from-teal-200/30 to-teal-500/30",
  },
  {
    id: 6,
    name: "Accessories",
    linkQuery: "category=Accessories",
    imageUrl: categoryAccessoriesSrc,
    gradient: "from-pink-200/30 to-pink-500/30",
  },
];

const CategoriesSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.offsetWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Base styles for arrow buttons
  const arrowButtonBaseStyles =
    "flex items-center justify-center bg-white shadow-md rounded-lg border border-transparent hover:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-1 transition-all duration-200 ease-in-out group";
  const arrowIconStyles =
    "text-brand-primary group-hover:scale-110 transition-transform";

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 md:mb-12">
        <h2 className="text-3xl lg:text-4xl font-semibold text-brand-dark-alt">
          {" "}
          Shop by Categories{" "}
        </h2>
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => scroll("left")}
            aria-label="Previous Category"
            className={`${arrowButtonBaseStyles} w-[55px] h-[57px]`}
          >
            {" "}
            <FiChevronLeft size={24} className={arrowIconStyles} />{" "}
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Next Category"
            className={`${arrowButtonBaseStyles} w-[55px] h-[57px]`}
          >
            {" "}
            <FiChevronRight size={24} className={arrowIconStyles} />{" "}
          </button>
        </div>
      </div>

      {/* Category Cards - Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide"
      >
        {categoriesData.map((category) => (
          <Link
            key={category.id}
            to={`/products?${category.linkQuery.replace(/\s+/g, "%20")}`} // URL encode spaces
            className="flex-shrink-0 w-[262px] h-[361px] relative group rounded-2xl overflow-hidden block transition-transform duration-200 hover:-translate-y-1"
            title={`Shop ${category.name}`}
          >
            {/* Background Image */}
            <img
              src={category.imageUrl} // Use the imported image source
              alt={category.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            {/* Gradient Overlay - Applied over the image */}
            <div
              className={`absolute inset-0 bg-gradient-to-t ${category.gradient} mix-blend-multiply group-hover:opacity-75 transition-opacity duration-200`}
            ></div>

            {/* Text Button */}
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-[calc(100%-40px)] max-w-[219px] bg-white text-black text-center text-lg h-[49px] rounded-lg shadow-md opacity-90 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center font-medium group-hover:shadow-lg">
              {category.name}
            </div>
          </Link>
        ))}
      </div>
      {/* Mobile Navigation Arrows */}
      <div className="md:hidden flex justify-center items-center gap-3 mt-6">
        <button
          onClick={() => scroll("left")}
          aria-label="Previous Category"
          className={`${arrowButtonBaseStyles} w-12 h-12`}
        >
          {" "}
          <FiChevronLeft size={24} className={arrowIconStyles} />{" "}
        </button>
        <button
          onClick={() => scroll("right")}
          aria-label="Next Category"
          className={`${arrowButtonBaseStyles} w-12 h-12`}
        >
          {" "}
          <FiChevronRight size={24} className={arrowIconStyles} />{" "}
        </button>
      </div>
    </div>
  );
};

// Add this plugin to your tailwind.config.js if you haven't already:
// npm install --save-dev tailwind-scrollbar-hide
// plugins: [ require('tailwind-scrollbar-hide') ]

export default CategoriesSection;
