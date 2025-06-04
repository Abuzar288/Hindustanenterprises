export interface NavLink {
  label: string;
  href: string;
}

export const NAVIGATION_LINKS: NavLink[] = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT US", href: "#about" },
  { label: "KITCHEN PRODUCTS", href: "#kitchen-products" },
  { label: "FURNITURE", href: "#furniture" },
  { label: "HARDWARE", href: "#hardware" },
  { label: "BATHROOM", href: "#bathroom" },
  { label: "KITCHEN & BAR", href: "#kitchen-bar" },
  { label: "DECOR & ACCENT", href: "#decor" },
  { label: "CONTACT US", href: "#contact" },
];

// Extracted list of labels that are product categories for easier checking
export const PRODUCT_CATEGORY_NAV_LABELS: string[] = [
  "KITCHEN PRODUCTS",
  "FURNITURE",
  "HARDWARE",
  "BATHROOM",
  "KITCHEN & BAR",
  "DECOR & ACCENT",
];

    
