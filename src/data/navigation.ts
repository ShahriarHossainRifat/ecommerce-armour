// src/data/navigation.ts

// Interface for individual menu links
export interface MenuItem {
  label: string;
  href: string; // Use query params for Product Listing Page filtering
}

// Interface for a category group (e.g., "Men", "Indian & Festive Wear")
export interface MenuCategory {
  title: string;
  isTitleBold?: boolean; // To match the bolder titles in the design
  items: MenuItem[];
}

// --- Data for Desktop Mega Menu (Multi-Column) ---
// Updated to match image_908df8.png structure, with logical fixes for cols 3 & 4
export const megaMenuData: MenuCategory[][] = [
  // --- Column 1: Men ---
  [
    {
      title: "Men",
      isTitleBold: true,
      items: [
        {
          label: "T-shirts",
          href: "/products?category=Men&subCategory=T-shirts",
        },
        {
          label: "Casual Shirts",
          href: "/products?category=Men&subCategory=Shirts&tag=Casual",
        }, // Combine where logical
        {
          label: "Formal Shirts",
          href: "/products?category=Men&subCategory=Shirts&tag=Formal",
        }, // Combine where logical
        {
          label: "Jackets",
          href: "/products?category=Men&subCategory=Jackets",
        },
        {
          label: "Blazers & Coats",
          href: "/products?category=Men&subCategory=Coats",
        }, // Map Blazers & Coats to Coats subCategory
      ],
    },
    {
      title: "Indian & Festive Wear",
      isTitleBold: true,
      items: [
        {
          label: "Kurta & Kurta Sets",
          href: "/products?category=Men&subCategory=Kurtas",
        },
        {
          label: "Sherwanis",
          href: "/products?category=Men&subCategory=Sherwanis",
        },
      ],
    },
  ],
  // --- Column 2: Women ---
  [
    {
      title: "Women",
      isTitleBold: true,
      items: [
        {
          label: "T-shirts",
          href: "/products?category=Women&subCategory=T-shirts",
        }, // Often combined with Tops
        {
          label: "Casual Shirts",
          href: "/products?category=Women&subCategory=Tops&tag=Casual",
        }, // Map shirts to Tops
        {
          label: "Formal Shirts",
          href: "/products?category=Women&subCategory=Tops&tag=Formal",
        }, // Map shirts to Tops
        {
          label: "Jackets",
          href: "/products?category=Women&subCategory=Jackets",
        },
        // Note: Blazers & Coats listed under Western Wear below in image
      ],
    },
    {
      title: "Western Wear",
      isTitleBold: true,
      items: [
        // This likely includes Dresses, Jeans etc.
        {
          label: "Dresses",
          href: "/products?category=Women&subCategory=Dresses",
        }, // Added based on common structure
        {
          label: "Tops & Blouses",
          href: "/products?category=Women&subCategory=Tops",
        }, // Added based on common structure
        {
          label: "Kurta & Kurta Sets",
          href: "/products?category=Women&subCategory=Kurtas",
        }, // As per image
        {
          label: "Sherwanis",
          href: "/products?category=Women&subCategory=Dresses&tag=Ethnic",
        }, // Unlikely under Western, maybe map elsewhere? Or specific type? Using Dresses+tag for now.
        {
          label: "Blazers & Coats",
          href: "/products?category=Women&subCategory=Coats",
        }, // As per image
        { label: "Jeans", href: "/products?category=Women&subCategory=Jeans" }, // Added based on common structure
      ],
    },
  ],
  // --- Column 3: Footwear & Features (Interpreted/Corrected) ---
  [
    {
      title: "Footwear",
      isTitleBold: true,
      items: [
        // Logical footwear subcategories instead of copy-paste error from image
        {
          label: "Men's Shoes",
          href: "/products?category=Men&subCategory=Shoes",
        },
        {
          label: "Women's Shoes",
          href: "/products?category=Women&subCategory=Shoes",
        },
        {
          label: "Kids' Shoes",
          href: "/products?category=Kids&subCategory=Shoes",
        },
        { label: "Sneakers", href: "/products?subCategory=Shoes&tag=Sneakers" }, // Tag based
        { label: "Boots", href: "/products?subCategory=Shoes&tag=Boots" }, // Tag based
      ],
    },
    {
      title: "Product Features",
      isTitleBold: true,
      items: [
        // As per image
        { label: "360 Product Viewer", href: "/features/360" }, // Example link
        { label: "Product with Video", href: "/features/video" }, // Example link
      ],
    },
  ],
  // --- Column 4: Kids & Accessories (Interpreted/Corrected) ---
  [
    {
      title: "Kids",
      isTitleBold: true,
      items: [
        // Logical Kids subcategories instead of copy-paste error from image
        {
          label: "T-shirts",
          href: "/products?category=Kids&subCategory=T-shirts",
        },
        { label: "Shirts", href: "/products?category=Kids&subCategory=Shirts" },
        {
          label: "Pants & Leggings",
          href: "/products?category=Kids&subCategory=Pants",
        },
        {
          label: "Dresses & Skirts",
          href: "/products?category=Kids&subCategory=Dresses",
        },
        {
          label: "Outerwear",
          href: "/products?category=Kids&subCategory=Jackets",
        }, // Map Jackets/Coats here
        { label: "Shoes", href: "/products?category=Kids&subCategory=Shoes" },
      ],
    },
    {
      // Added Accessories as a logical fit for 4th column
      title: "Accessories",
      isTitleBold: true,
      items: [
        {
          label: "Bags",
          href: "/products?category=Accessories&subCategory=Bags",
        },
        {
          label: "Sunglasses",
          href: "/products?category=Accessories&subCategory=Sunglasses",
        },
        {
          label: "Belts",
          href: "/products?category=Accessories&subCategory=Belts",
        },
        {
          label: "Hats & Scarves",
          href: "/products?category=Accessories&subCategory=Hats",
        }, // Combined
      ],
    },
  ],
];

// --- Data for Mobile Accordion Menu (Flatter structure derived from Mega Menu) ---
export const mobileCategories: MenuCategory[] = [
  {
    title: "Men",
    items: [
      { label: "All Men", href: "/products?category=Men" },
      {
        label: "T-shirts",
        href: "/products?category=Men&subCategory=T-shirts",
      },
      { label: "Shirts", href: "/products?category=Men&subCategory=Shirts" },
      {
        label: "Sweaters",
        href: "/products?category=Men&subCategory=Sweaters",
      },
      {
        label: "Jackets/Coats",
        href: "/products?category=Men&subCategory=Jackets",
      }, // Combined
      {
        label: "Pants & Chinos",
        href: "/products?category=Men&subCategory=Pants",
      },
      { label: "Indian Wear", href: "/products?category=Men&tag=Festive" }, // Link via tag
      { label: "Shoes", href: "/products?category=Men&subCategory=Shoes" },
    ],
  },
  {
    title: "Women",
    items: [
      { label: "All Women", href: "/products?category=Women" },
      {
        label: "Dresses",
        href: "/products?category=Women&subCategory=Dresses",
      },
      {
        label: "Tops & T-shirts",
        href: "/products?category=Women&subCategory=Tops",
      },
      { label: "Jeans", href: "/products?category=Women&subCategory=Jeans" },
      {
        label: "Coats & Jackets",
        href: "/products?category=Women&subCategory=Coats",
      },
      {
        label: "Sweaters/Cardigans",
        href: "/products?category=Women&subCategory=Sweaters",
      },
      { label: "Western Wear", href: "/products?category=Women&tag=Western" }, // Link via tag
      { label: "Shoes", href: "/products?category=Women&subCategory=Shoes" },
    ],
  },
  {
    title: "Kids",
    items: [
      { label: "All Kids", href: "/products?category=Kids" },
      {
        label: "T-shirts & Tops",
        href: "/products?category=Kids&subCategory=T-shirts",
      },
      {
        label: "Hoodies & Sweaters",
        href: "/products?category=Kids&subCategory=Hoodies",
      },
      {
        label: "Pants & Leggings",
        href: "/products?category=Kids&subCategory=Pants",
      },
      {
        label: "Dresses & Skirts",
        href: "/products?category=Kids&subCategory=Dresses",
      },
      {
        label: "Outerwear",
        href: "/products?category=Kids&subCategory=Jackets",
      },
      { label: "Shoes", href: "/products?category=Kids&subCategory=Shoes" },
    ],
  },
  {
    title: "Accessories",
    items: [
      { label: "All Accessories", href: "/products?category=Accessories" },
      {
        label: "Bags",
        href: "/products?category=Accessories&subCategory=Bags",
      },
      {
        label: "Sunglasses",
        href: "/products?category=Accessories&subCategory=Sunglasses",
      },
      {
        label: "Belts",
        href: "/products?category=Accessories&subCategory=Belts",
      },
      {
        label: "Hats & Scarves",
        href: "/products?category=Accessories&subCategory=Hats",
      },
    ],
  },
  {
    title: "Footwear",
    items: [
      // Separate Footwear entry for mobile clarity
      { label: "All Footwear", href: "/products?category=Shoes" },
      {
        label: "Men's Shoes",
        href: "/products?category=Men&subCategory=Shoes",
      },
      {
        label: "Women's Shoes",
        href: "/products?category=Women&subCategory=Shoes",
      },
      {
        label: "Kids' Shoes",
        href: "/products?category=Kids&subCategory=Shoes",
      },
    ],
  },
];
