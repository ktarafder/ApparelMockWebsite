"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../../context/CartContext";
import { motion } from "framer-motion";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: "Men" | "Women" | "Accessories";
  description: string;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ProductDetail({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState("M");
  const { addToCart, isInCart } = useCart();

  const handleAddToCart = () => {
    if (!isInCart(product.id)) {
      addToCart({ id: product.id, size: selectedSize });
    }
  };

  return (
    <motion.main
      className="min-h-screen bg-gray-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <motion.div variants={itemVariants}>
          <Link href="/products">
            <span className="text-gray-600 hover:text-teal-500 mb-6 inline-block">
              &larr; Back to Products
            </span>
          </Link>
        </motion.div>
        <motion.div
          className="bg-white rounded-lg shadow-lg overflow-hidden"
          variants={itemVariants}
        >
          <div className="md:flex">
            {/* Left Side: Product Image */}
            <motion.div className="md:w-1/2" variants={itemVariants}>
              <motion.div className="relative w-full h-[500px]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  style={{ scale: 1 }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            </motion.div>
            {/* Right Side: Product Details */}
            <motion.div className="md:w-1/2 p-8 flex flex-col" variants={itemVariants}>
              <h1 className="text-3xl font-extrabold text-gray-900">
                {product.name}
              </h1>
              <p className="mt-2 text-2xl text-gray-600">
                ${product.price.toFixed(2)}
              </p>
              <div className="mt-4">
                <span className="text-gray-700">Category: </span>
                <span className="text-gray-900 font-medium">
                  {product.category}
                </span>
              </div>
              <div className="mt-6">
                <p className="text-gray-700">{product.description}</p>
              </div>
              <div className="mt-8">
                <label
                  htmlFor="size"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Select Size
                </label>
                <select
                  id="size"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-teal-500"
                >
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>
              </div>
              <div className="mt-8">
                <button
                  onClick={handleAddToCart}
                  disabled={isInCart(product.id)}
                  className={`w-full py-3 px-6 rounded-md text-white font-semibold transition ${
                    isInCart(product.id)
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-teal-500 hover:bg-teal-600'
                  }`}
                >
                  {isInCart(product.id) ? 'In Cart' : 'Add to Cart'}
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}
