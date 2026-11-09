"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { timeline } from "@/data/site";
import { CATEGORY_META } from "@/types/project";
import type { CategoryId } from "@/types/project";
import { staggerContainer, staggerItem } from "@/lib/animations";

export function TimelineSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="journey" className="section bg-white dark:bg-surface-900/50">
      <div className="container" ref={ref}>
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.p variants={staggerItem} className="section-label">Journey</motion.p>
          <motion.h2 variants={staggerItem} className="section-title">
            Career{" "}
            <span className="text-gradient">Timeline</span>
          </motion.h2>
          <motion.p variants={staggerItem} className="section-subtitle mx-auto">
            Perjalanan karier yang organik — dari spesialis Business Analysis, merambah UI/UX, hingga menguasai Data & System Development.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Center line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-surface-200 dark:bg-surface-800 md:-translate-x-px" />

          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="space-y-8"
          >
            {timeline.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={`${item.year}-${index}`}
                  variants={staggerItem}
                  className={`relative flex items-start gap-4 md:gap-0 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content box */}
                  <div
                    className={`ml-20 md:ml-0 flex-1 ${
                      isLeft ? "md:pr-12 md:text-right" : "md:pl-12"
                    }`}
                  >
                    <div className="card p-5 hover:shadow-lg transition-shadow duration-300">
                      {/* Year badge */}
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent-50 dark:bg-accent-900/20 border border-accent-200 dark:border-accent-800 rounded-full text-xs font-bold text-accent-700 dark:text-accent-300 mb-3">
                        📅 {item.year}
                      </div>

                      {/* Role */}
                      <h3 className="font-bold text-surface-900 dark:text-surface-50 text-base mb-0.5">
                        {item.role}
                      </h3>
                      <p className="text-xs text-accent-600 dark:text-accent-400 font-semibold mb-3">
                        @ {item.company}
                      </p>

                      {/* Description */}
                      <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed mb-3">
                        {item.description}
                      </p>

                      {/* Category pills */}
                      <div className={`flex flex-wrap gap-1.5 ${isLeft ? "md:justify-end" : ""}`}>
                        {item.categories.map((cat) => {
                          const meta = CATEGORY_META[cat as CategoryId];
                          return (
                            <span
                              key={cat}
                              className={`px-2 py-0.5 text-xs font-medium rounded-full ${meta.bgColor} ${meta.textColor}`}
                            >
                              {meta.emoji} {meta.label}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-accent-600 border-2 border-white dark:border-surface-950 z-10 ring-4 ring-accent-100 dark:ring-accent-900/30 mt-4" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
