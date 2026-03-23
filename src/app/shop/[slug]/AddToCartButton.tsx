"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import type { Product, ProductVariation, FlagCountry, Color } from "@/data/products";

const FLAG_LABELS: Record<FlagCountry, string> = {
  usa: "🇺🇸 USA",
  canada: "🇨🇦 Canada",
  poland: "🇵🇱 Poland",
  germany: "🇩🇪 Germany",
  mexico: "🇲🇽 Mexico",
};

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

export default function ProductOptions({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Variation state
  const [country, setCountry] = useState<FlagCountry | null>(
    product.options.countries ? null : undefined as any
  );
  const [digit, setDigit] = useState<string | null>(null);
  const [customDigit, setCustomDigit] = useState("");
  const [color, setColor] = useState<Color | null>(
    product.options.colors ? null : undefined as any
  );

  const buildVariation = (): ProductVariation | null => {
    const v: ProductVariation = {};
    if (product.options.countries) {
      if (!country) return null;
      v.country = country;
    }
    if (product.options.digits) {
      const effectiveDigit = digit === "custom" ? customDigit.trim() : digit;
      if (!effectiveDigit) return null;
      if (digit === "custom" && (customDigit.length < 1 || customDigit.length > 2 || !/^\d+$/.test(customDigit))) return null;
      v.digit = effectiveDigit;
    }
    if (product.options.colors) {
      if (!color) return null;
      v.color = color;
    }
    return v;
  };

  const handleAdd = () => {
    const variation = buildVariation();
    if (!variation) {
      setError("Please select all options before adding to cart.");
      return;
    }
    setError(null);
    setIsAdding(true);
    addItem(product, variation, quantity);
    setTimeout(() => setIsAdding(false), 600);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Country Selector (Flags) */}
      {product.options.countries && (
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Country</p>
          <div className="flex flex-wrap gap-2">
            {product.options.countries.map((c) => (
              <button
                key={c}
                onClick={() => setCountry(c)}
                className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border transition-all ${
                  country === c
                    ? "bg-white text-black border-white"
                    : "border-white/20 text-white/70 hover:border-white hover:text-white"
                }`}
              >
                {FLAG_LABELS[c]}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Number Selector */}
      {product.options.digits && (
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Number</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {DIGITS.map((d) => (
              <button
                key={d}
                onClick={() => setDigit(d)}
                className={`w-12 h-12 text-sm font-bold border transition-all ${
                  digit === d
                    ? "bg-white text-black border-white"
                    : "border-white/20 text-white/70 hover:border-white hover:text-white"
                }`}
              >
                {d}
              </button>
            ))}
            <button
              onClick={() => setDigit("custom")}
              className={`px-4 h-12 text-xs font-bold uppercase tracking-wider border transition-all ${
                digit === "custom"
                  ? "bg-white text-black border-white"
                  : "border-white/20 text-white/70 hover:border-white hover:text-white"
              }`}
            >
              Custom
            </button>
          </div>
          {digit === "custom" && (
            <input
              type="text"
              maxLength={2}
              value={customDigit}
              onChange={(e) => setCustomDigit(e.target.value.replace(/\D/g, "").slice(0, 2))}
              placeholder="Enter 1-2 digits"
              className="w-40 h-12 bg-zinc-900 border border-white/20 text-white px-4 text-sm focus:outline-none focus:border-white placeholder:text-white/30"
            />
          )}
        </div>
      )}

      {/* Color Selector (Numbers & Crosses) */}
      {product.options.colors && (
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Color</p>
          <div className="flex gap-3">
            {product.options.colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider border transition-all ${
                  color === c
                    ? "bg-white text-black border-white"
                    : "border-white/20 text-white/70 hover:border-white hover:text-white"
                }`}
              >
                <span
                  className={`h-4 w-4 rounded-full border ${
                    c === "black" ? "bg-zinc-900 border-white/30" : "bg-white border-white/30"
                  }`}
                />
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="text-xs font-bold text-red-400 uppercase tracking-widest">{error}</p>
      )}

      {/* Quantity + Add to Cart */}
      <div className="flex items-center gap-4">
        <div className="flex items-center border border-white/10 overflow-hidden h-14">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-6 hover:bg-white/5 transition-colors font-bold"
          >
            −
          </button>
          <span className="w-10 text-center font-bold">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-6 hover:bg-white/5 transition-colors font-bold"
          >
            +
          </button>
        </div>

        <button
          onClick={handleAdd}
          disabled={isAdding}
          className="flex-1 h-14 bg-white text-black px-8 text-xs font-bold uppercase tracking-[0.2em] transition-all hover:bg-accent hover:text-white disabled:bg-white/50"
        >
          {isAdding ? "Added!" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
