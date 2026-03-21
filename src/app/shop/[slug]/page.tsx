import { getProductBySlug, products } from "@/data/products";
import { notFound } from "next/navigation";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import ProductCard from "@/components/ProductCard";
import AddToCartButton from "./AddToCartButton"; // We need to create this client component

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-16">
        {/* Image / Gallery */}
        <div className="fade-in">
          <div className="aspect-square w-full overflow-hidden bg-zinc-900 border border-white/10 flex items-center justify-center">
             <div className="w-1/2 h-1/2 bg-zinc-800 rounded border border-white/5 opacity-50" />
          </div>
        </div>

        {/* Info */}
        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
          <div className="mb-4">
             <span className="text-xs font-bold uppercase tracking-widest text-accent">
               {product.category}
             </span>
          </div>
          <h1 className="font-display text-4xl font-bold uppercase tracking-tighter text-white">
            {product.name}
          </h1>
          <div className="mt-4">
            <h2 className="sr-only">Product information</h2>
            <p className="text-2xl font-bold tracking-tight text-white">
              {formatPrice(product.price)}
            </p>
          </div>

          <div className="mt-8">
            <h3 className="sr-only">Description</h3>
            <p className="text-base text-white/60 leading-relaxed uppercase font-medium text-[13px] tracking-tight">
              {product.description}
            </p>
          </div>

          <div className="mt-12">
            <AddToCartButton product={product} />
          </div>

          <div className="mt-12 border-t border-white/10 pt-8">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-4">
              Performance Specs
            </h3>
            <ul className="grid grid-cols-2 gap-y-4 gap-x-8">
               {["High-Tack Adhesive", "Weather Resistant", "Precision Cut", "Easy Removal"].map(spec => (
                 <li key={spec} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/60">
                   <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                   {spec}
                 </li>
               ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-32 border-t border-white/10 pt-16">
          <h2 className="font-display text-2xl font-bold uppercase tracking-tighter mb-10">
            Similar Designs
          </h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
