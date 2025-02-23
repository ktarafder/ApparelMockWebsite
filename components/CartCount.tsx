// app/components/CartCount.tsx
"use client";

import { useCart } from "../app/context/CartContext";

export default function CartCount() {
  const { cart } = useCart();
  return <span>{cart.length}</span>;
}
