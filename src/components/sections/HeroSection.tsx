"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Download, Sparkles } from "lucide-react";
import { siteConfig } from "@/data/site";
import { staggerContainer, staggerItem, slideUp, fadeIn } from "@/lib/animations";

const PILLS = [
  { label: "Business Analysis", color: "pill-ba" },
  { label: "UI/UX Design", color: "pill-ux" },
  { label: "Data & System", color: "pill-ds" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* ── Animated Background ── */}
      <div className="absolute inset-0 bg-grid opacity-50 dark:opacity-30" />

      {/* Gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-accent-400/30 to-purple-500/20 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-tr from-teal-400/20 to-blue-500/20 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-pink-400/10 to-accent-400/10 blur-3xl"
        />
      </div>

      <div className="container relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          {/* ── Availability tag ── */}
          <motion.div variants={staggerItem} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-full text-sm text-green-700 dark:text-green-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              {siteConfig.availability}
            </span>
          </motion.div>

          {/* ── Name ── */}
          <motion.h1
            variants={staggerItem}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-4"
          >
            <span className="text-surface-900 dark:text-surface-50">
              {siteConfig.name.split(" ")[0]}{" "}
            </span>
            <span className="text-gradient dark:text-gradient-dark">
              {siteConfig.name.split(" ").slice(1).join(" ")}
            </span>
          </motion.h1>

          {/* ── Tagline ── */}
          <motion.p
            variants={staggerItem}
            className="text-xl md:text-2xl text-surface-600 dark:text-surface-400 mb-8 font-medium"
          >
            {siteConfig.tagline}
          </motion.p>

          {/* ── Discipline pills ── */}
          <motion.div
            variants={staggerItem}
            className="flex flex-wrap items-center justify-center gap-3 mb-10"
          >
            {PILLS.map((pill) => (
              <span
                key={pill.label}
                className={`badge text-sm px-4 py-1.5 ${pill.color} font-semibold`}
              >
                {pill.label}
              </span>
            ))}
          </motion.div>

          {/* ── CTA Buttons ── */}
          <motion.div
            variants={staggerItem}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/#work" className="btn-primary group">
              View My Work
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href={siteConfig.resumeUrl} download className="btn-secondary group">
              <Download size={18} />
              Download Resume
            </a>
          </motion.div>

          {/* ── Scroll hint ── */}
          <motion.div
            variants={fadeIn}
            className="mt-20 flex flex-col items-center gap-2 text-surface-400"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-0.5 h-12 bg-gradient-to-b from-transparent to-surface-300 dark:to-surface-700"
            />
            <span className="text-xs tracking-widest uppercase">Scroll</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
