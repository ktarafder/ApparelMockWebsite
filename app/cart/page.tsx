"use client";

import { useCart } from "../context/CartContext";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

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
      // Sample transaction id; replace with your own logic as needed.
      const trans_id = Date.now();
      const trans_amt = totalPrice;
      const trans_type = "Apparel";
      const redirectUrl = "/order-complete";

      const res = await fetch(`/api/pay?redirect=${encodeURIComponent(redirectUrl)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trans_id,
          trans_amt,
          trans_type,
        }),
      });

      if (!res.ok) {
        throw new Error("Payment failed");
      }

      // On successful payment, redirect to the order complete page.
      router.push(redirectUrl);
    } catch (error) {
      console.error(error);
      alert("There was an error processing your payment. Please try again.");
    }
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
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-32 h-32 object-cover rounded-lg"
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
                  onClick={handlePayment}
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
    </motion.main>
  );
}
