"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";
import { FILTER_TABS, CATEGORY_META } from "@/types/project";
import type { Project, FilterTabId, CategoryId } from "@/types/project";
import { staggerContainer, staggerItem, scaleIn } from "@/lib/animations";
import { cn } from "@/lib/utils";

// ─── Category Pill ────────────────────────────────────────────────────
function CategoryPill({ categoryId }: { categoryId: CategoryId }) {
  const meta = CATEGORY_META[categoryId];
  return (
    <span className={`badge text-xs px-2 py-0.5 ${meta.bgColor} ${meta.textColor}`}>
      {meta.emoji} {meta.label}
    </span>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      layout
      variants={scaleIn}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      custom={index}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="card group relative overflow-hidden cursor-pointer"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <Link href={`/project/${project.slug}`} className="block h-full">
        {/* ── Thumbnail ── */}
        <div className="relative aspect-[4/3] overflow-hidden bg-surface-100 dark:bg-surface-800">
          {project.thumbnail ? (
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className={cn(
                "object-cover transition-transform duration-700",
                hovered ? "scale-110" : "scale-100"
              )}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            // Placeholder gradient when no image
            <div className={cn(
              "absolute inset-0 flex items-center justify-center text-6xl",
              project.category.includes("ui-ux")
                ? "bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30"
                : project.category.includes("data-system")
                ? "bg-gradient-to-br from-teal-100 to-green-100 dark:from-teal-900/30 dark:to-green-900/30"
                : "bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30"
            )}>
              {project.category.includes("ui-ux") ? "🎨" :
               project.category.includes("data-system") ? "⚙️" : "📊"}
            </div>
          )}

          {/* Hover overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-accent-600/80 backdrop-blur-sm flex items-center justify-center"
          >
            <span className="flex items-center gap-2 text-white font-semibold text-sm bg-white/20 border border-white/30 rounded-xl px-4 py-2">
              View Case Study
              <ArrowRight size={16} />
            </span>
          </motion.div>

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-3 left-3 px-2 py-1 bg-accent-600 text-white text-xs font-bold rounded-lg">
              Featured
            </div>
          )}

          {/* Year */}
          <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 text-white text-xs rounded-lg">
            {project.year}
          </div>
        </div>

        {/* ── Card Body ── */}
        <div className="p-5">
          {/* Category tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.category.map((cat) => (
              <CategoryPill key={cat} categoryId={cat} />
            ))}
          </div>

          {/* Title */}
          <h3 className="font-bold text-surface-900 dark:text-surface-50 text-lg leading-tight mb-2 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
            {project.title}
          </h3>

          {/* Role */}
          <p className="text-xs text-surface-500 dark:text-surface-500 mb-3 font-medium">
            {project.role}
          </p>

          {/* Impact one-liner */}
          <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed line-clamp-2">
            {project.impact}
          </p>

          {/* Tools */}
          <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-surface-100 dark:border-surface-800">
            {project.tools.slice(0, 4).map((tool) => (
              <span
                key={tool}
                className="px-2 py-0.5 text-xs bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded text-surface-600 dark:text-surface-400"
              >
                {tool}
              </span>
            ))}
            {project.tools.length > 4 && (
              <span className="px-2 py-0.5 text-xs text-surface-400">
                +{project.tools.length - 4} more
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

// ─── Portfolio Section ────────────────────────────────────────────────
export function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState<FilterTabId>("all");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const filtered = activeFilter === "all"
    ? projects
    : projects.filter((p) => p.category.includes(activeFilter as CategoryId));

  return (
    <section id="work" className="section bg-surface-50 dark:bg-surface-950">
      <div className="container" ref={ref}>
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.p variants={staggerItem} className="section-label">Portfolio</motion.p>
          <motion.h2 variants={staggerItem} className="section-title">
            Selected{" "}
            <span className="text-gradient">Work</span>
          </motion.h2>
          <motion.p variants={staggerItem} className="section-subtitle mx-auto">
            Proyek-proyek yang menunjukkan pendekatan lintas disiplin — dari analisis bisnis, desain, hingga implementasi sistem.
          </motion.p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-10"
          role="tablist"
          aria-label="Filter projects by category"
        >
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as FilterTabId)}
              role="tab"
              aria-selected={activeFilter === tab.id}
              className={cn(
                "px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border",
                activeFilter === tab.id
                  ? "bg-accent-600 text-white border-accent-600 shadow-lg shadow-accent-600/25"
                  : "bg-white dark:bg-surface-900 text-surface-600 dark:text-surface-400 border-surface-200 dark:border-surface-700 hover:border-accent-300 dark:hover:border-accent-700"
              )}
            >
              {tab.label}
              <span className={cn(
                "ml-2 px-1.5 py-0.5 text-xs rounded-full",
                activeFilter === tab.id
                  ? "bg-white/20 text-white"
                  : "bg-surface-100 dark:bg-surface-800 text-surface-500"
              )}>
                {tab.id === "all"
                  ? projects.length
                  : projects.filter((p) => p.category.includes(tab.id as CategoryId)).length}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Project Grid */}
        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 text-surface-400"
          >
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-lg font-medium">No projects in this category yet</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
