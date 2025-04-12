// src/data/brands.ts

// --- Import Brand Logos ---
// Adjust paths and filenames EXACTLY
import brandLogo1 from "../assets/images/Brands/brand-logo-1.png";
import brandLogo2 from "../assets/images/Brands/brand-logo-2.png";
import brandLogo3 from "../assets/images/Brands/brand-logo-3.png";
import brandLogo4 from "../assets/images/Brands/brand-logo-4.png";
import brandLogo5 from "../assets/images/Brands/brand-logo-5.png";
import brandLogo6 from "../assets/images/Brands/brand-logo-6.png";
import brandLogo7 from "../assets/images/Brands/brand-logo-7.png";
import brandLogo8 from "../assets/images/Brands/brand-logo-8.png";
// Add imports for any other logos you have

export interface BrandLogo {
  id: number;
  name: string;
  logoSrc: string; // Changed from url to logoSrc to reflect import
}

// Define and export the list using imported variables
export const brandLogos: BrandLogo[] = [
  { id: 1, name: "Brand 1", logoSrc: brandLogo1 },
  { id: 2, name: "Gucci", logoSrc: brandLogo2 },
  { id: 3, name: "Prada", logoSrc: brandLogo3 },
  { id: 4, name: "Nike", logoSrc: brandLogo4 },
  { id: 5, name: "Denim", logoSrc: brandLogo5 },
  { id: 6, name: "Louis Vuitton", logoSrc: brandLogo6 },
  { id: 7, name: "Gucci", logoSrc: brandLogo7 },
  { id: 8, name: "Zara", logoSrc: brandLogo8 },
];

// You might want separate arrays for each row if the design is fixed
export const row1Logos = brandLogos.slice(0, 4); // First 6 logos from image
export const row2Logos = brandLogos.slice(4, 8); // Next 6 logos from image (adjust slicing as needed)
