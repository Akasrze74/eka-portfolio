"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/site";
import { CATEGORY_META } from "@/types/project";
import type { CategoryId } from "@/types/project";
import { staggerContainer, staggerItem } from "@/lib/animations";

const SERVICE_COLORS: Record<string, string> = {
  "business-analysis": "from-blue-500/10 to-blue-600/5 border-blue-200 dark:border-blue-900 hover:border-blue-400 dark:hover:border-blue-600",
  "ui-ux": "from-pink-500/10 to-pink-600/5 border-pink-200 dark:border-pink-900 hover:border-pink-400 dark:hover:border-pink-600",
  "data-system": "from-teal-500/10 to-teal-600/5 border-teal-200 dark:border-teal-900 hover:border-teal-400 dark:hover:border-teal-600",
};

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="section">
      <div className="container" ref={ref}>
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.p variants={staggerItem} className="section-label">What I Do</motion.p>
          <motion.h2 variants={staggerItem} className="section-title">
            Services &{" "}
            <span className="text-gradient">Expertise</span>
          </motion.h2>
          <motion.p variants={staggerItem} className="section-subtitle mx-auto">
            Dari analisis kebutuhan bisnis hingga implementasi sistem — saya dapat membantu di setiap tahap siklus produk digital Anda.
          </motion.p>
        </motion.div>

        {/* Service cards */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6"
        >
          {services.map((service) => {
            const meta = CATEGORY_META[service.id as CategoryId];
            return (
              <motion.div
                key={service.id}
                variants={staggerItem}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`card p-8 bg-gradient-to-br border-2 transition-all duration-300 cursor-default ${SERVICE_COLORS[service.id]}`}
              >
                {/* Icon */}
                <div className="text-5xl mb-5">{service.emoji}</div>

                {/* Title */}
                <h3 className="text-xl font-bold text-surface-900 dark:text-surface-50 mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-surface-600 dark:text-surface-400 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Highlights list */}
                <ul className="space-y-2.5">
                  {service.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-surface-700 dark:text-surface-300">
                      <span className={`mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                        service.id === "business-analysis" ? "bg-blue-500" :
                        service.id === "ui-ux" ? "bg-pink-500" : "bg-teal-500"
                      }`} />
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Category badge */}
                <div className={`mt-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${meta.bgColor} ${meta.textColor}`}>
                  {meta.emoji} {meta.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-surface-500 dark:text-surface-500 mb-4 text-sm">
            Butuh kombinasi dari beberapa service di atas?
          </p>
          <a href="/#contact" className="btn-primary group">
            Diskusikan Project Anda
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
