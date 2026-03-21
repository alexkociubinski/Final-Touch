"use client";

import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";
import { useState } from "react";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = () => {
    setIsAdding(true);
    addItem(product, quantity);
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center border border-white/10 rounded-lg overflow-hidden h-14">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-6 hover:bg-white/5 transition-colors font-bold"
          >
            -
          </button>
          <span className="w-12 text-center font-bold">{quantity}</span>
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
          {isAdding ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
