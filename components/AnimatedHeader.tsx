// components/AnimatedHeader.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import CartCount from "./CartCount";
import React from "react";

export default function AnimatedHeader() {
    return (
        <motion.header
            className="bg-white shadow"
            initial="hidden"
            animate="visible"
        >
            <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
                <Link href="/">
                    <h1 className="text-3xl font-extrabold text-gray-800 cursor-pointer">
                        Fashion Hub
                    </h1>
                </Link>
                <nav>
                    <ul className="flex space-x-8">
                        <li>
                            <Link href="/products">
                                <span className="text-gray-800 hover:text-teal-500 transition cursor-pointer">
                                    Shop
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/cart">
                                <span className="text-gray-800 hover:text-teal-500 transition cursor-pointer">
                                    Cart (<CartCount />)
                                </span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </motion.header>
    );
}
