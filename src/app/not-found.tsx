"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import { slideUp, staggerContainer, staggerItem } from "@/lib/animations";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-50 dark:bg-surface-950">
      <div className="container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center max-w-lg mx-auto"
        >
          {/* 404 */}
          <motion.div variants={staggerItem}>
            <span className="text-9xl font-black text-surface-100 dark:text-surface-900 select-none block">
              404
            </span>
          </motion.div>

          <motion.div variants={staggerItem} className="text-5xl mb-6">
            🔍
          </motion.div>

          <motion.h1
            variants={staggerItem}
            className="text-3xl font-bold text-surface-900 dark:text-surface-50 mb-4"
          >
            Page Not Found
          </motion.h1>

          <motion.p
            variants={staggerItem}
            className="text-surface-500 dark:text-surface-500 mb-8 leading-relaxed"
          >
            Halaman yang Anda cari tidak ditemukan. Mungkin sudah dipindahkan atau URL-nya salah.
          </motion.p>

          <motion.div
            variants={staggerItem}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/" className="btn-primary">
              <Home size={16} />
              Back to Home
            </Link>
            <Link href="/#work" className="btn-secondary">
              <ArrowLeft size={16} />
              View Portfolio
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
