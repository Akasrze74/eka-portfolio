"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { siteConfig, skills } from "@/data/site";
import { CATEGORY_META } from "@/types/project";
import { staggerContainer, staggerItem, slideInLeft, slideInRight } from "@/lib/animations";

// ─── Venn Diagram (pure CSS/SVG) ──────────────────────────────────────
function VennDiagram() {
  return (
    <div className="relative w-full max-w-sm mx-auto aspect-square">
      <svg viewBox="0 0 400 400" className="w-full h-full" aria-label="Venn diagram of three disciplines">
        {/* BA circle */}
        <circle cx="170" cy="160" r="120" className="fill-blue-500/20 stroke-blue-500/40" strokeWidth="1.5" />
        {/* UX circle */}
        <circle cx="230" cy="160" r="120" className="fill-pink-500/20 stroke-pink-500/40" strokeWidth="1.5" />
        {/* Data circle */}
        <circle cx="200" cy="230" r="120" className="fill-teal-500/20 stroke-teal-500/40" strokeWidth="1.5" />

        {/* Labels */}
        <text x="120" y="95" textAnchor="middle" className="fill-blue-600 dark:fill-blue-400 text-sm font-bold" fontSize="13" fontWeight="700">Business</text>
        <text x="120" y="112" textAnchor="middle" className="fill-blue-600 dark:fill-blue-400" fontSize="13" fontWeight="700">Analysis</text>

        <text x="280" y="95" textAnchor="middle" className="fill-pink-600 dark:fill-pink-400" fontSize="13" fontWeight="700">UI/UX</text>
        <text x="280" y="112" textAnchor="middle" className="fill-pink-600 dark:fill-pink-400" fontSize="13" fontWeight="700">Design</text>

        <text x="200" y="335" textAnchor="middle" className="fill-teal-600 dark:fill-teal-400" fontSize="13" fontWeight="700">Data &amp;</text>
        <text x="200" y="352" textAnchor="middle" className="fill-teal-600 dark:fill-teal-400" fontSize="13" fontWeight="700">System</text>

        {/* Center label */}
        <text x="200" y="197" textAnchor="middle" fontSize="10" fontWeight="800" fill="currentColor">End-to-End</text>
        <text x="200" y="211" textAnchor="middle" fontSize="10" fontWeight="800" fill="currentColor">Product</text>
        <text x="200" y="225" textAnchor="middle" fontSize="10" fontWeight="800" fill="currentColor">Thinker</text>
      </svg>
    </div>
  );
}

const CATEGORY_IDS = ["business-analysis", "ui-ux", "data-system"] as const;

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section bg-white dark:bg-surface-900/50">
      <div className="container" ref={ref}>
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.p variants={staggerItem} className="section-label">About Me</motion.p>
          <motion.h2 variants={staggerItem} className="section-title">
            Why{" "}
            <span className="text-gradient">Three Disciplines?</span>
          </motion.h2>
          <motion.p variants={staggerItem} className="section-subtitle mx-auto">
            Karena solusi terbaik lahir ketika analisis bisnis, desain yang berpusat pada pengguna, dan eksekusi teknis berjalan beriringan.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left — Venn + bio */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={slideInLeft}
          >
            <VennDiagram />
            <p className="mt-6 text-surface-600 dark:text-surface-400 text-center text-sm italic">
              Persimpangan ketiga lingkaran = &quot;End-to-End Product Thinker&quot;
            </p>
          </motion.div>

          {/* Right — bio text */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={slideInRight}
            className="space-y-5"
          >
            <p className="text-lg text-surface-700 dark:text-surface-300 leading-relaxed">
              {siteConfig.bio}
            </p>
            <p className="text-surface-600 dark:text-surface-400 leading-relaxed">
              Kemampuan lintas bidang ini bukan sekadar keahlian teknis — ini adalah{" "}
              <strong className="text-surface-900 dark:text-surface-50">perspektif yang holistik</strong>. Saya memahami bagaimana sebuah keputusan bisnis berdampak pada desain, dan bagaimana desain yang baik harus didukung oleh sistem yang solid.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="flex items-center gap-2 px-4 py-2 bg-surface-50 dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700">
                <span className="text-2xl">📍</span>
                <span className="text-sm font-medium text-surface-700 dark:text-surface-300">{siteConfig.location}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium text-green-700 dark:text-green-400">Available for work</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Skills per category */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6"
        >
          {CATEGORY_IDS.map((catId) => {
            const meta = CATEGORY_META[catId];
            const catSkills = skills[catId];
            return (
              <motion.div
                key={catId}
                variants={staggerItem}
                className="card p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold mb-4 ${meta.bgColor} ${meta.textColor}`}>
                  <span>{meta.emoji}</span>
                  {meta.label}
                </div>
                <div className="flex flex-wrap gap-2">
                  {catSkills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-xs font-medium bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg text-surface-700 dark:text-surface-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
