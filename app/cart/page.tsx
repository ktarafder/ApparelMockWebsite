"use client";

import { useCart } from "../context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: "Men" | "Women" | "Accessories";
  description: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Classic Blazer",
    price: 129.99,
    image: "/clothes1.jpg",
    category: "Men",
    description:
      "A tailored classic blazer that exudes sophistication. Crafted from premium fabric, it perfectly balances tradition with modern design.",
  },
  {
    id: 2,
    name: "Elegant Dress",
    price: 159.99,
    image: "/clothes2.jpg",
    category: "Women",
    description:
      "An elegant dress that combines refined style with a contemporary twist. Perfect for upscale occasions and special events.",
  },
  {
    id: 3,
    name: "Modern Trousers",
    price: 89.99,
    image: "/clothes3.jpg",
    category: "Men",
    description:
      "Modern trousers designed with a slim fit and high-quality fabric, ensuring a comfortable yet stylish look for everyday wear.",
  },
  {
    id: 4,
    name: "Stylish Jacket",
    price: 199.99,
    image: "/clothes4.jpg",
    category: "Men",
    description:
      "A stylish jacket featuring a contemporary cut and versatile design, ideal for both casual outings and formal occasions.",
  },
  {
    id: 5,
    name: "Trendy Shirt",
    price: 69.99,
    image: "/clothes5.jpg",
    category: "Women",
    description:
      "A trendy shirt that combines comfort and style. Its chic design is perfect for updating your everyday wardrobe.",
  },
  {
    id: 6,
    name: "Chic Top",
    price: 49.99,
    image: "/clothes6.jpg",
    category: "Women",
    description:
      "A chic top with a modern edge, designed to bring a touch of sophistication to any outfit.",
  },
  {
    id: 7,
    name: "Designer Jeans",
    price: 109.99,
    image: "/clothes7.jpg",
    category: "Men",
    description:
      "Premium designer jeans crafted with attention to detail. Enjoy the perfect blend of comfort and cutting-edge style.",
  },
  {
    id: 8,
    name: "Casual Hoodie",
    price: 79.99,
    image: "/clothes8.jpg",
    category: "Accessories",
    description:
      "A casual hoodie made from soft, durable fabric. Its relaxed fit and modern design make it a versatile addition to any wardrobe.",
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20, transition: { duration: 0.2 } },
};

export default function CartPage() {
  const { cart, removeFromCart } = useCart();
  const [showEffipayModal, setShowEffipayModal] = useState(false);
  const [effipayEmail, setEffipayEmail] = useState('');
  const [effipayPassword, setEffipayPassword] = useState('');

  const cartProducts = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      if (product) {
        return { ...product, selectedSize: item.size };
      }
      return null;
    })
    .filter(Boolean) as (Product & { selectedSize: string })[];

  const totalPrice = cartProducts.reduce((sum, product) => sum + product.price, 0);

  const handlePayment = async () => {
    try {
      const validationRes = await fetch(
        `http://localhost:3001/api/ingest?email=${encodeURIComponent(effipayEmail)}&password=${encodeURIComponent(effipayPassword)}`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          mode: 'cors',
        }
      );

      if (!validationRes.ok) {
        alert("Account doesn't exist");
        return;
      }

      // If validation successful, clear form and close modal
      setEffipayEmail('');
      setEffipayPassword('');
      setShowEffipayModal(false);

    } catch (error) {
      console.error('Validation error:', error);
      alert("Unable to validate Effipay account. Please ensure the service is running on port 3001.");
    }
  };

  const handleEffipayClick = () => {
    setShowEffipayModal(true);
  };

  return (
    <motion.main
      className="min-h-screen bg-gray-50 py-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={itemVariants}>
          <Link href="/products">
            <span className="text-gray-600 hover:text-teal-500 mb-6 inline-block">
              &larr; Continue Shopping
            </span>
          </Link>
        </motion.div>
        <motion.h1 variants={itemVariants} className="text-3xl font-bold text-gray-900 mb-8">
          My Cart
        </motion.h1>
        {cartProducts.length === 0 ? (
          <motion.p variants={itemVariants} className="text-gray-600">
            Your cart is empty.
          </motion.p>
        ) : (
          <AnimatePresence>
            <div className="space-y-6">
              {cartProducts.map((product) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                  className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow p-4"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={128}
                    height={128}
                    className="object-cover rounded-lg"
                  />
                  <div className="flex-1 mt-4 md:mt-0 md:ml-6">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {product.name}
                    </h2>
                    <p className="text-gray-600 mt-1">
                      Price: ${product.price.toFixed(2)}
                    </p>
                    <p className="text-gray-600 mt-1">
                      Size: <span className="font-medium">{product.selectedSize}</span>
                    </p>
                  </div>
                  <motion.button
                    type="button"
                    onClick={() => removeFromCart(product.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 md:mt-0 p-2 bg-red-600 text-white rounded-full hover:bg-red-500 transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a1 1 0 011 1v2H9V4a1 1 0 011-1z"
                      />
                    </svg>
                  </motion.button>
                </motion.div>
              ))}
              <motion.div
                variants={itemVariants}
                className="flex flex-col items-center bg-white rounded-lg shadow p-6"
              >
                <div className="text-xl text-gray-800 mb-4">
                  Total: ${totalPrice.toFixed(2)}
                </div>
                <motion.button
                  type="button"
                  onClick={handleEffipayClick}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    scale: [1, 1.05, 1],
                    transition: { duration: 1.5, repeat: Infinity, repeatType: "loop" },
                  }}
                  className="px-10 py-4 bg-teal-500 text-white font-bold text-xl rounded-md shadow-2xl hover:bg-teal-600 transition"
                >
                  Pay with <span className="effipay-font">effipay</span>
                </motion.button>
              </motion.div>
            </div>
          </AnimatePresence>
        )}
      </div>
      {/* Effipay Modal */}
      {showEffipayModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Effipay Login</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="effipay-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="effipay-email"
                  value={effipayEmail}
                  onChange={(e) => setEffipayEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter your Effipay email"
                />
              </div>
              <div>
                <label htmlFor="effipay-password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="effipay-password"
                  value={effipayPassword}
                  onChange={(e) => setEffipayPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter your Effipay password"
                />
              </div>
              <div className="flex space-x-4 mt-6">
                <button
                  onClick={() => setShowEffipayModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePayment}
                  className="flex-1 px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition"
                >
                  Pay Now
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.main>
  );
}
