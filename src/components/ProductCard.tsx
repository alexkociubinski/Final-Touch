"use client";

import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const sizeBadge = product.size === "small" ? "S" : "L";

  return (
    <div className="group relative flex flex-col fade-in">
      {/* Image Wrapper */}
      <Link
        href={`/shop/${product.slug}`}
        className="relative aspect-square overflow-hidden bg-zinc-900 border border-white/10"
      >
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center transition-transform duration-500 group-hover:scale-105">
            <div className="h-1/2 w-1/2 rounded border border-white/5 bg-zinc-800 opacity-50" />
          </div>
        )}

        {/* Badges */}
        <div className="absolute left-3 top-3 flex gap-1.5">
          <span className="bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-black">
            {product.type === "symbol" ? "Cross" : product.type}
          </span>
          <span className="bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white">
            {sizeBadge}
          </span>
        </div>
      </Link>

      {/* Info */}
      <div className="mt-4 flex flex-1 flex-col">
        <div className="flex justify-between items-start">
          <h3 className="text-sm font-display font-bold uppercase tracking-tight text-white">
            <Link href={`/shop/${product.slug}`}>
              <span aria-hidden="true" className="absolute inset-0 z-10" />
              {product.name}
            </Link>
          </h3>
          <p className="text-sm font-medium tabular-nums">{formatPrice(product.price)}</p>
        </div>

        <p className="mt-1 text-[11px] text-white/40 font-bold uppercase tracking-widest">
          {product.size === "small" ? "Cleats & small gear" : "Bats, sticks & large gear"}
        </p>

        {/* CTA — always goes to detail page since variation is required */}
        <div className="mt-auto pt-4 relative z-20 md:opacity-0 md:translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <Link
            href={`/shop/${product.slug}`}
            className="block w-full bg-white py-2.5 text-[10px] font-bold uppercase tracking-widest text-black text-center transition-all hover:bg-accent hover:text-white"
          >
            Customize →
          </Link>
        </div>
      </div>
    </div>
  );
}
