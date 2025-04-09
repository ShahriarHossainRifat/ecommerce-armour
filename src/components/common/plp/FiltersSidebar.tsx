// src/components/plp/FiltersSidebar.tsx
import React from "react";

// Import individual filter components
import PriceFilter from "./filters/PriceFilter";
import CheckboxFilter from "./filters/CheckboxFilter";
import SizeFilter from "./filters/SizeFilter";
import ColorFilter from "./filters/ColorFilter";
import TagFilter from "./filters/TagFilter"; // TagFilter doesn't manage state, no props needed yet

// --- Define props based on state lifted to ProductListingPage ---
interface FiltersSidebarProps {
  priceRange: { min: number; max: number };
  onPriceChange: (value: { min: number; max: number }) => void;
  selectedBrands: string[];
  onBrandChange: (selected: string[]) => void;
  selectedSizes: string[];
  onSizeChange: (selected: string[]) => void;
  selectedColors: string[];
  onColorChange: (selected: string[]) => void;
  selectedCollections: string[];
  onCollectionChange: (selected: string[]) => void;
  // Add other filter props here if needed
}

// Placeholder data for filter options (These could also be passed as props if dynamic)
const brandOptions = [
  { id: "Gucci", label: "Gucci" },
  { id: "Chanel", label: "Chanel" },
  { id: "Arong", label: "Arong" },
  { id: "Denim", label: "Denim" },
  { id: "Calvin Klein", label: "Calvin Klein" },
  { id: "Fila", label: "Fila" },
  { id: "Burberry", label: "Burberry" },
  { id: "Camper", label: "Camper" }, // Use actual brand names if filtering by product.brand
];
const collectionOptions = [
  { id: "all", label: "All Products" },
  { id: "best", label: "Best Sellers" },
  { id: "new", label: "New Arrivals" },
  { id: "accessories", label: "Accessories" },
];
const sizeOptions = ["S", "M", "L", "XL", "XXL"];
const colorOptions = [
  "#E44B4B",
  "#664BCA",
  "#E4904B",
  "#2B0F16",
  "#ACBC33",
  "#E4BD4B",
  "#EB2D00",
];
const tagOptions = [
  { label: "Fashion", href: "#" },
  { label: "Hats", href: "#" },
  { label: "Sandal", href: "#" },
  { label: "Belt", href: "#" },
  { label: "Bags", href: "#" },
  { label: "Snacker", href: "#" },
  { label: "Denim", href: "#" },
  { label: "Minimog", href: "#" },
  { label: "Vagabond", href: "#" },
  { label: "Sunglasses", href: "#" },
  { label: "Beachwear", href: "#" },
];
// --- End Placeholder Data ---

const FiltersSidebar: React.FC<FiltersSidebarProps> = ({
  priceRange,
  onPriceChange,
  selectedBrands,
  onBrandChange,
  selectedSizes,
  onSizeChange,
  selectedColors,
  onColorChange,
  selectedCollections,
  onCollectionChange,
}) => {
  return (
    // Removed internal state, using props instead
    <aside className="w-full lg:w-64 space-y-0 divide-y divide-gray-200">
      {" "}
      {/* Use divide for lines */}
      <PriceFilter
        min={1}
        max={1000} // Example range limits
        value={priceRange}
        onChange={onPriceChange} // Pass down handler
      />
      <CheckboxFilter
        title="Product Categories" // Renamed from 'Brand' based on PLP CSS
        options={brandOptions}
        selectedValues={selectedBrands} // Use prop
        onChange={onBrandChange} // Use prop
        showSearch={true}
      />
      <SizeFilter
        title="Size"
        options={sizeOptions}
        selectedValues={selectedSizes} // Use prop
        onChange={onSizeChange} // Use prop
      />
      <ColorFilter
        title="Color"
        options={colorOptions}
        selectedValues={selectedColors} // Use prop
        onChange={onColorChange} // Use prop
      />
      <CheckboxFilter
        title="Collections"
        options={collectionOptions}
        selectedValues={selectedCollections} // Use prop
        onChange={onCollectionChange} // Use prop
        showSearch={false}
      />
      <TagFilter title="Tags" options={tagOptions} />
    </aside>
  );
};

export default FiltersSidebar;
