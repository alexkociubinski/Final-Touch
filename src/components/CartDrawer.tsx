"use client";

import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useCheckout } from "@/hooks/useCheckout";

export default function CartDrawer() {
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    subtotal, 
    isCartOpen, 
    setIsCartOpen 
  } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close drawer on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsCartOpen(false);
    };
    if (isCartOpen) window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isCartOpen, setIsCartOpen]);

  // Lock scroll when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isCartOpen]);

  const { handleCheckout, isLoading } = useCheckout();

  if (!isMounted) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md bg-black shadow-2xl transition-transform duration-300 transform ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 p-6">
            <h2 className="font-display text-xl font-bold uppercase underline decoration-accent decoration-2 underline-offset-4">
              Your Cart
            </h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 transition-colors hover:text-accent"
              aria-label="Close cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 focus:outline-none">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center opacity-60">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="mb-4"
                >
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                  <path d="M3 6h18" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <p className="text-sm">Your cart is empty.</p>
                <Link
                  href="/shop"
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 text-sm font-bold uppercase tracking-wider underline decoration-accent decoration-2 underline-offset-4 hover:text-accent transition-colors"
                >
                  Go Shop
                </Link>
              </div>
            ) : (
              <div className="space-y-8">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    {/* Placeholder Image */}
                    <div className="h-24 w-24 flex-shrink-0 bg-white/10 overflow-hidden">
                      <div className="w-full h-full bg-zinc-800 animate-pulse" />
                    </div>

                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between text-sm font-medium">
                        <h3 className="font-display font-bold uppercase tracking-tight">
                          {item.product.name}
                        </h3>
                        <p>{formatPrice(item.product.price)}</p>
                      </div>
                      <p className="mt-1 text-xs text-white/50">
                        {item.product.category}
                      </p>
                      
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center border border-white/10 rounded overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 px-3 hover:bg-white/5 transition-colors"
                          >
                            -
                          </button>
                          <span className="text-xs px-2 w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 px-3 hover:bg-white/5 transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-red-500 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-white/10 p-6 bg-zinc-900/50">
              <div className="flex justify-between text-base font-bold">
                <p className="uppercase font-display tracking-tight">Subtotal</p>
                <p>{formatPrice(subtotal)}</p>
              </div>
              <p className="mt-1 text-xs text-white/40">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="mt-8 space-y-3">
                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="flex w-full items-center justify-center border border-white py-4 text-xs font-bold uppercase tracking-widest transition-all hover:bg-white hover:text-black"
                >
                  View Cart
                </Link>
                <button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="flex w-full items-center justify-center bg-accent py-4 text-xs font-bold uppercase tracking-widest text-accent-foreground transition-all hover:bg-accent/90 focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Opening Checkout..." : "Checkout"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
