"use client";

import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <div className="group relative flex flex-col fade-in">
      {/* Image Wrapper */}
      <Link
        href={`/shop/${product.slug}`}
        className="relative aspect-square overflow-hidden bg-zinc-900 border border-white/10"
      >
        {/* Placeholder Block */}
        <div className="flex h-full w-full items-center justify-center transition-transform duration-500 group-hover:scale-105">
          <div className="h-1/2 w-1/2 rounded border border-white/5 bg-zinc-800 opacity-50" />
        </div>
        
        {/* Overlay Label (Optional design flair) */}
        <div className="absolute left-4 top-4">
          <span className="bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-black">
            {product.category}
          </span>
        </div>
      </Link>

      {/* Info */}
      <div className="mt-4 flex flex-1 flex-col h-24">
        <div className="flex justify-between items-start">
          <h3 className="text-sm font-display font-bold uppercase tracking-tight text-white">
            <Link href={`/shop/${product.slug}`}>
              <span aria-hidden="true" className="absolute inset-0 z-10" />
              {product.name}
            </Link>
          </h3>
          <p className="text-sm font-medium tabular-nums">{formatPrice(product.price)}</p>
        </div>
        
        <p className="mt-1 line-clamp-2 text-xs text-white/50 leading-relaxed">
          {product.description}
        </p>

        {/* Action (Visible on hover on desktop, always on mobile) */}
        <div className="mt-auto pt-4 relative z-20 md:opacity-0 md:translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addItem(product);
            }}
            className="w-full bg-white py-2.5 text-[10px] font-bold uppercase tracking-widest text-black transition-all hover:bg-accent hover:text-white"
          >
            Quick Add
          </button>
        </div>
      </div>
    </div>
  );
}
