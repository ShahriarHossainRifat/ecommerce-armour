// src/components/common/MegaMenu.tsx
import React from "react";
import { Link } from "react-router-dom";
// *** ENSURE THIS IMPORT PATH IS CORRECT ***
import { megaMenuData } from "../../data/navigation"; // Import centralized data

const MegaMenu: React.FC = () => {
  return (
    // Container positioned absolutely by Navbar
    // UPDATED: Changed rounded-b-lg to rounded-lg for all corners
    <div className="bg-white px-6 py-8 shadow-2xl border border-gray-200 rounded-lg">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8">
        {megaMenuData.map((column, colIndex) => (
          <div key={colIndex} className="space-y-6">
            {column.map((category, catIndex) => (
              <div key={catIndex}>
                <h4
                  className={`mb-3 ${
                    category.isTitleBold
                      ? "text-lg font-bold text-black"
                      : "text-base font-semibold text-gray-600"
                  }`}
                >
                  {category.title}
                </h4>
                <ul className="space-y-2.5">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <Link
                        to={item.href}
                        className="text-base text-brand-gray-dark hover:text-brand-primary hover:underline transition-colors duration-150"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MegaMenu;
