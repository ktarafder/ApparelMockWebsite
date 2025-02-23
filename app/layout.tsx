// app/layout.tsx
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import React from "react";
import AnimatedHeader from "@/components/AnimatedHeader";

export const metadata = {
  title: "Fashion Hub",
  description: "A modern clothing web store",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <AnimatedHeader />
          <main>{children}</main>
          <footer className="bg-white border-t">
            <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-600">
              © {new Date().getFullYear()} Fashion Hub. All rights reserved.
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
