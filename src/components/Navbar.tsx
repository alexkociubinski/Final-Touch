"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Shop", href: "/shop" },
    { name: "About", href: "/about" },
    { name: "Join The Team", href: "/athletes" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex flex-1">
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/BlackLogo.png"
              alt="Final Touch Logo"
              width={44}
              height={32}
              className="object-contain"
              priority
            />
            <span className="font-display text-xl font-bold uppercase tracking-tight hidden xs:block">
              Final Touch
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex md:gap-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium hover-underline transition-colors hover:text-accent"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex flex-1 items-center justify-end gap-x-4">
          <button
            onClick={() => setIsCartOpen(true)}
            className="group relative flex items-center justify-center p-2 transition-colors hover:text-accent"
            aria-label="Open cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground animate-in zoom-in-50">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 transition-colors hover:text-accent"
            aria-label="Toggle menu"
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
              {isMenuOpen ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-white/10 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="space-y-1 px-4 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block text-lg font-medium py-2 hover:text-accent transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
