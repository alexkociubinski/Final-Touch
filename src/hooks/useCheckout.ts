"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

export function useCheckout() {
  const [isLoading, setIsLoading] = useState(false);
  const { items } = useCart();

  const handleCheckout = async () => {
    if (items.length === 0) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            stripePriceId: item.product.stripePriceId,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Checkout error:", data.error);
        alert(data.error || "Failed to initiate checkout. Please check your Stripe Price IDs.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleCheckout,
    isLoading,
  };
}
