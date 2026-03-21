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
    <div className="flex w-full items-center justify-center border-b border-white/10 overflow-x-auto no-scrollbar">
      <div className="flex gap-x-8 px-4">
        <button
          onClick={() => onSelect("all")}
          className={cn(
            "relative py-4 text-xs font-bold uppercase tracking-widest transition-colors hover:text-accent",
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
              "relative py-4 text-xs font-bold uppercase tracking-widest transition-colors hover:text-accent",
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
  );
}
