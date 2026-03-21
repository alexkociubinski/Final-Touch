"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { products, categories, type ProductCategory } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import CategoryTabs from "@/components/CategoryTabs";
import { Suspense, useMemo } from "react";

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeCategory = (searchParams.get("category") as ProductCategory | "all") || "all";

  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const handleCategoryChange = (category: ProductCategory | "all") => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "all") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-12 flex flex-col items-center text-center">
        <h1 className="font-display text-4xl font-bold uppercase tracking-tighter sm:text-6xl">
          The Shop
        </h1>
        <p className="mt-4 max-w-xl text-white/50">
          Professional grade identification for your equipment. Pick your design, 
          hit the field, and leave your mark.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="mb-16">
        <CategoryTabs 
          activeCategory={activeCategory} 
          onSelect={handleCategoryChange} 
        />
      </div>

      {/* Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-white/40">No products found in this category.</p>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="flex h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-transparent" />
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
