"use client";

import { cn } from "@/lib/utils";
import { categories } from "@/data/products";
import type { ProductCategory } from "@/data/products";

interface CategoryTabsProps {
  activeCategory: ProductCategory | "all";
  onSelect: (category: ProductCategory | "all") => void;
}

export default function CategoryTabs({ activeCategory, onSelect }: CategoryTabsProps) {
  return (
    <div className="relative">
      <div className="flex w-full items-center border-b border-white/10 overflow-x-auto no-scrollbar">
        <div className="flex gap-x-8 px-4">
          <button
            onClick={() => onSelect("all")}
            className={cn(
              "relative py-4 text-xs font-bold uppercase tracking-widest transition-colors hover:text-accent whitespace-nowrap",
              activeCategory === "all" ? "text-accent" : "text-white/40"
            )}
          >
            All
            {activeCategory === "all" && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full bg-accent animate-in fade-in slide-in-from-bottom-1 duration-200" />
            )}
          </button>

          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => onSelect(cat.value)}
              className={cn(
                "relative py-4 text-xs font-bold uppercase tracking-widest transition-colors hover:text-accent whitespace-nowrap",
                activeCategory === cat.value ? "text-accent" : "text-white/40"
              )}
            >
              {cat.label}
              {activeCategory === cat.value && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full bg-accent animate-in fade-in slide-in-from-bottom-1 duration-200" />
              )}
            </button>
          ))}
        </div>
      </div>
      {/* Scroll fade indicators */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black to-transparent pointer-events-none sm:hidden" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black to-transparent pointer-events-none sm:hidden" />
    </div>
  );
}
