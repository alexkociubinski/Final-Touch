"use client";

import { cn } from "@/lib/utils";
import type { ProductType } from "@/data/products";

const TYPES: { label: string; value: ProductType | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Flags", value: "flag" },
  { label: "Numbers", value: "number" },
  { label: "Crosses", value: "symbol" },
];

interface CategoryTabsProps {
  activeCategory: ProductType | "all";
  onSelect: (category: ProductType | "all") => void;
}

export default function CategoryTabs({ activeCategory, onSelect }: CategoryTabsProps) {
  return (
    <div className="relative">
      <div className="flex w-full items-center border-b border-white/10 overflow-x-auto no-scrollbar">
        <div className="flex gap-x-8 px-4">
          {TYPES.map((t) => (
            <button
              key={t.value}
              onClick={() => onSelect(t.value)}
              className={cn(
                "relative py-4 text-xs font-bold uppercase tracking-widest transition-colors hover:text-accent whitespace-nowrap",
                activeCategory === t.value ? "text-accent" : "text-white/40"
              )}
            >
              {t.label}
              {activeCategory === t.value && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full bg-accent animate-in fade-in slide-in-from-bottom-1 duration-200" />
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black to-transparent pointer-events-none sm:hidden" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black to-transparent pointer-events-none sm:hidden" />
    </div>
  );
}
