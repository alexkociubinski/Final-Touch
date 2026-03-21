export type ProductCategory = "flags" | "crosses" | "numbers" | "symbols";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  price: number; // in cents
  description: string;
  stripePriceId: string;
}

export const products: Product[] = [
  // Flags
  {
    id: "flag-001",
    slug: "american-flag",
    name: "American Flag",
    category: "flags",
    price: 1299,
    description:
      "A bold American flag decal built for game day. Clean lines, strong colors, and a finish that holds up under pressure. Apply it to gloves, bats, helmets, or cleats.",
    stripePriceId: "price_american_flag",
  },
  {
    id: "flag-002",
    slug: "mexican-flag",
    name: "Mexican Flag",
    category: "flags",
    price: 1299,
    description:
      "Represent your roots with a premium Mexican flag decal. Designed for athletes who play with pride. Sticks to any gear surface and stays put.",
    stripePriceId: "price_mexican_flag",
  },
  {
    id: "flag-003",
    slug: "puerto-rican-flag",
    name: "Puerto Rican Flag",
    category: "flags",
    price: 1299,
    description:
      "Carry the island onto the field. A sharp, durable Puerto Rican flag decal sized for gloves, bats, sticks, and cleats.",
    stripePriceId: "price_puerto_rican_flag",
  },

  // Crosses
  {
    id: "cross-001",
    slug: "classic-cross",
    name: "Classic Cross",
    category: "crosses",
    price: 999,
    description:
      "A clean, minimal cross decal for athletes who compete with faith. No frills — just a solid symbol that means something.",
    stripePriceId: "price_classic_cross",
  },
  {
    id: "cross-002",
    slug: "gothic-cross",
    name: "Gothic Cross",
    category: "crosses",
    price: 1099,
    description:
      "A detailed gothic cross decal with a heavier, more stylized design. Built for athletes who want their gear to carry weight.",
    stripePriceId: "price_gothic_cross",
  },
  {
    id: "cross-003",
    slug: "iron-cross",
    name: "Iron Cross",
    category: "crosses",
    price: 1099,
    description:
      "A sharp iron cross decal with bold edges. Looks clean on dark gear, holds up through every game and every season.",
    stripePriceId: "price_iron_cross",
  },

  // Numbers
  {
    id: "num-001",
    slug: "jersey-number-single",
    name: "Single Digit Number",
    category: "numbers",
    price: 899,
    description:
      "Your number, on your gear. A single-digit jersey number decal with clean typeface and durable adhesive. Pick your digit at checkout.",
    stripePriceId: "price_single_digit",
  },
  {
    id: "num-002",
    slug: "jersey-number-double",
    name: "Double Digit Number",
    category: "numbers",
    price: 999,
    description:
      "Two-digit jersey number decal. Same clean design, same game-ready durability. Sized to fit gloves, bats, sticks, and cleats.",
    stripePriceId: "price_double_digit",
  },
  {
    id: "num-003",
    slug: "jersey-number-outlined",
    name: "Outlined Number",
    category: "numbers",
    price: 1099,
    description:
      "A jersey number with an outlined style for a different look. Stands out on lighter gear without losing readability.",
    stripePriceId: "price_outlined_number",
  },

  // Symbols
  {
    id: "sym-001",
    slug: "lightning-bolt",
    name: "Lightning Bolt",
    category: "symbols",
    price: 999,
    description:
      "A sharp lightning bolt decal for athletes who bring energy. Simple, clean, and built to last on any surface.",
    stripePriceId: "price_lightning_bolt",
  },
  {
    id: "sym-002",
    slug: "skull-decal",
    name: "Skull",
    category: "symbols",
    price: 1099,
    description:
      "A minimal skull decal with an edge. No cartoons, no clipart — just a clean design that fits the intensity of competition.",
    stripePriceId: "price_skull",
  },
  {
    id: "sym-003",
    slug: "crown-decal",
    name: "Crown",
    category: "symbols",
    price: 1099,
    description:
      "A subtle crown decal for athletes who carry themselves like winners. Clean geometry, premium adhesive, made for game day.",
    stripePriceId: "price_crown",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}

export const categories: { label: string; value: ProductCategory }[] = [
  { label: "Flags", value: "flags" },
  { label: "Crosses", value: "crosses" },
  { label: "Numbers", value: "numbers" },
  { label: "Symbols", value: "symbols" },
];
