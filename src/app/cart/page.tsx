"use client";

import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
        <h1 className="font-display text-4xl font-bold uppercase tracking-tighter mb-8">
          Your Cart is Empty
        </h1>
        <Link
          href="/shop"
          className="inline-flex h-14 items-center justify-center bg-white px-10 text-xs font-bold uppercase tracking-[0.2em] text-black transition-all hover:bg-accent hover:text-white"
        >
          Browse Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl font-bold uppercase tracking-tighter mb-16 underline decoration-accent decoration-4 underline-offset-8">
        Shopping Cart
      </h1>

      <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
        <section aria-labelledby="cart-heading" className="lg:col-span-12">
          <h2 id="cart-heading" className="sr-only">Items in your cart</h2>
          <ul role="list" className="divide-y divide-white/10 border-t border-white/10">
            {items.map((item) => (
              <li key={item.product.id} className="flex py-10 sm:py-12 border-b border-white/10">
                <div className="flex-shrink-0 h-32 w-32 bg-zinc-900 border border-white/10">
                  {/* Placeholder */}
                  <div className="w-full h-full bg-zinc-800 animate-pulse" />
                </div>

                <div className="ml-8 flex flex-1 flex-col justify-between">
                  <div className="sm:grid sm:grid-cols-2 sm:gap-x-6">
                    <div>
                      <div className="flex justify-between">
                        <h3 className="text-sm">
                          <Link href={`/shop/${item.product.slug}`} className="font-display font-bold uppercase tracking-tight hover:text-accent transition-colors">
                            {item.product.name}
                          </Link>
                        </h3>
                      </div>
                      <div className="mt-1 flex text-xs text-white/50 font-bold uppercase tracking-widest">
                        <p>{item.product.category}</p>
                      </div>
                      <p className="mt-4 text-sm font-medium">{formatPrice(item.product.price)}</p>
                    </div>

                    <div className="mt-4 sm:mt-0 sm:pr-9 flex items-center justify-end gap-12">
                      <div className="flex items-center border border-white/10 rounded-lg overflow-hidden h-12">
                         <button
                           onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                           className="px-6 hover:bg-white/5 transition-colors font-bold"
                         >
                           -
                         </button>
                         <span className="w-10 text-center font-bold">{item.quantity}</span>
                         <button
                           onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                           className="px-6 hover:bg-white/5 transition-colors font-bold"
                         >
                           +
                         </button>
                      </div>
                      <div className="flex">
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-500 hover:text-red-600 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-16 sm:mt-24 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12">
        <section className="lg:col-span-5 lg:col-start-8 bg-zinc-900/50 p-8 border border-white/10 rounded-xl">
          <h2 className="font-display text-xl font-bold uppercase tracking-tight mb-8">
            Order Summary
          </h2>
          <div className="flow-root">
            <dl className="-my-4 divide-y divide-white/10 text-sm">
              <div className="flex items-center justify-between py-4">
                <dt className="text-white/50 uppercase font-bold tracking-widest text-xs">
                  Subtotal
                </dt>
                <dd className="font-medium">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex items-center justify-between py-4">
                <dt className="text-white/50 uppercase font-bold tracking-widest text-xs">
                  Shipping
                </dt>
                <dd className="font-medium">Calculated at checkout</dd>
              </div>
              <div className="flex items-center justify-between py-4 border-t-2 border-white pt-6 mt-2">
                <dt className="font-display text-lg font-bold uppercase tracking-tight">
                  Total
                </dt>
                <dd className="text-lg font-bold">{formatPrice(subtotal)}</dd>
              </div>
            </dl>
          </div>

          <div className="mt-10">
            <button
               className="w-full h-16 bg-white text-black text-xs font-bold uppercase tracking-[0.2em] transition-all hover:bg-accent hover:text-white"
            >
              Begin Checkout
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
