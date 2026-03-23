import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

export default function Home() {
  // Get one product of each type
  const featured = [
    products.find(p => p.type === 'flag'),
    products.find(p => p.type === 'number'),
    products.find(p => p.type === 'symbol'),
  ].filter(Boolean);

  const sports = [
    "Boxing Gloves", "Baseball Bats", "Lacrosse Sticks", "Cleats", "Helmets", "Shin Guards"
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-[85vh] w-full bg-black overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 opacity-40">
          {/* Subtle grid background or just solid black for premium feel */}
          <div className="h-full w-full bg-[radial-gradient(#ffffff22_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000 flex flex-col items-center">
             <Image
                src="/BlackLogo.png"
                alt="Final Touch"
                width={164}
                height={120}
                className="mb-8"
                priority
              />
            <h1 className="text-5xl md:text-8xl font-display font-bold uppercase tracking-tighter text-white leading-[0.9] mb-6">
              Final Touch
            </h1>
            <p className="text-lg md:text-xl text-white/70 font-medium tracking-tight mb-10 max-w-md">
              The last detail before game time. Premium adhesive decals engineered for the elite.
            </p>
            <Link
              href="/shop"
              className="inline-flex h-14 items-center justify-center bg-white px-10 text-xs font-bold uppercase tracking-[0.2em] text-black transition-all hover:bg-accent hover:text-white"
            >
              Shop Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Ethos */}
      <section className="py-24 md:py-32 px-4 bg-black overflow-hidden">
        <div className="max-w-3xl mx-auto text-center animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-accent mb-12">
            The Philosophy
          </h2>
          <p className="text-2xl md:text-3xl font-display font-bold leading-tight text-white italic">
            "Your gear is an extension of your performance. Every detail counts. 
            Final Touch provides the durable, high-visibility identity your equipment deserves, 
            built to withstand the intensity of professional competition."
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="pb-24 px-4 bg-black">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Flags', type: 'flag' },
              { label: 'Numbers', type: 'number' },
              { label: 'Crosses', type: 'symbol' },
            ].map(({ label, type }) => (
              <Link
                key={type}
                href={`/shop?category=${type}`}
                className="group relative h-[400px] overflow-hidden bg-zinc-900 border border-white/10"
              >
                <div className="absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-110">
                  <div className="w-1/3 h-1/3 bg-white/10 rounded rotate-12" />
                </div>
                <div className="absolute bottom-8 left-8">
                  <h3 className="text-2xl font-display font-bold uppercase tracking-tighter decoration-accent decoration-2 underline-offset-8">
                   {label}
                  </h3>
                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] opacity-40 group-hover:opacity-100 transition-opacity text-white">
                    Explore &rarr;
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sports Strip */}
      <section className="border-y border-white/10 bg-zinc-900 overflow-hidden py-10">
        <div className="flex flex-nowrap gap-12 items-center justify-center md:animate-scroll whitespace-nowrap px-8">
          {[...sports, ...sports].map((sport, i) => (
            <span 
              key={i}
              className="text-xs font-bold uppercase tracking-[0.4em] text-white/30"
            >
              {sport}
            </span>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-12 border-b border-white/10 pb-8">
            <h2 className="font-display text-3xl font-bold uppercase tracking-tighter">
              Featured Designs
            </h2>
            <Link 
              href="/shop"
              className="text-xs font-bold uppercase tracking-widest hover:text-accent transition-colors"
            >
              View All &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {featured.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
