export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatVariation(variation: Record<string, string | undefined>): string {
  const parts: string[] = [];
  if (variation.country) {
    parts.push(variation.country.charAt(0).toUpperCase() + variation.country.slice(1));
  }
  if (variation.digit !== undefined) parts.push(`#${variation.digit}`);
  if (variation.color) {
    parts.push(variation.color.charAt(0).toUpperCase() + variation.color.slice(1));
  }
  return parts.join(" · ");
}
