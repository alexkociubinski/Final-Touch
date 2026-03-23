export type ProductType = "flag" | "number" | "symbol";
export type ProductSize = "small" | "large";
export type FlagCountry = "usa" | "canada" | "poland" | "germany" | "mexico";
export type Color = "black" | "white";

export interface ProductVariation {
  // Flags
  country?: FlagCountry;
  // Numbers
  digit?: string; // '0'-'9' or custom like '42'
  color?: Color;
  // Allow string indexing for utility functions
  [key: string]: string | undefined;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  type: ProductType;
  size: ProductSize;
  price: number; // in cents
  description: string;
  image: string | null; // null = show placeholder
  // variation options available for this product
  options: {
    countries?: FlagCountry[];
    digits?: boolean; // 0-9 + custom
    colors?: Color[];
  };
}

const FLAG_COUNTRIES: FlagCountry[] = ["usa", "canada", "poland", "germany", "mexico"];
const COLORS: Color[] = ["black", "white"];

export const products: Product[] = [
  // ── FLAGS ──────────────────────────────────────────
  {
    id: "flag-small",
    slug: "small-flag",
    name: "Small Flag Decal",
    type: "flag",
    size: "small",
    price: 500,
    description:
      "Precision-cut flag decal sized for cleats. Choose your country. High-tack adhesive, weather resistant, easy removal.",
    image: "/USAcleat.png",
    options: { countries: FLAG_COUNTRIES },
  },
  {
    id: "flag-large",
    slug: "large-flag",
    name: "Large Flag Decal",
    type: "flag",
    size: "large",
    price: 700,
    description:
      "Full-size flag decal for bats, sticks, and large gear. Choose your country. Made to last through every play.",
    image: "/USAcleat.png",
    options: { countries: FLAG_COUNTRIES },
  },

  // ── NUMBERS ────────────────────────────────────────
  {
    id: "number-small",
    slug: "small-number",
    name: "Small Number Decal",
    type: "number",
    size: "small",
    price: 500,
    description:
      "Your jersey number on your gear. Single or double digit. Available in black or white. Sized for cleats.",
    image: null,
    options: { digits: true, colors: COLORS },
  },
  {
    id: "number-large",
    slug: "large-number",
    name: "Large Number Decal",
    type: "number",
    size: "large",
    price: 700,
    description:
      "Your number, at full size. Single or double digit. Available in black or white. For bats, sticks, and large gear.",
    image: null,
    options: { digits: true, colors: COLORS },
  },

  // ── SYMBOLS / CROSSES ──────────────────────────────
  {
    id: "cross-small",
    slug: "small-cross",
    name: "Small Cross Decal",
    type: "symbol",
    size: "small",
    price: 500,
    description:
      "A clean cross decal sized for cleats. Compete with faith. Available in black or white.",
    image: "/CrossCleat.png",
    options: { colors: COLORS },
  },
  {
    id: "cross-large",
    slug: "large-cross",
    name: "Large Cross Decal",
    type: "symbol",
    size: "large",
    price: 700,
    description:
      "A full-size cross decal for bats, sticks, and large gear. Bold, durable, game-ready. Available in black or white.",
    image: "/CrossTennis.png",
    options: { colors: COLORS },
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByType(type: ProductType): Product[] {
  return products.filter((p) => p.type === type);
}

export function formatVariation(variation: ProductVariation): string {
  const parts: string[] = [];
  if (variation.country) parts.push(variation.country.charAt(0).toUpperCase() + variation.country.slice(1));
  if (variation.digit !== undefined) parts.push(`#${variation.digit}`);
  if (variation.color) parts.push(variation.color.charAt(0).toUpperCase() + variation.color.slice(1));
  return parts.join(" · ");
}

export function getVariationLabel(product: Product, variation: ProductVariation): string {
  const parts: string[] = [product.name];
  const varLabel = formatVariation(variation);
  if (varLabel) parts.push(varLabel);
  return parts.join(" — ");
}

// Stripe Price IDs — set via env vars after running scripts/setup-stripe.ts
export function getStripePriceId(size: ProductSize): string {
  return size === "small"
    ? process.env.STRIPE_PRICE_SMALL ?? ""
    : process.env.STRIPE_PRICE_LARGE ?? "";
}
