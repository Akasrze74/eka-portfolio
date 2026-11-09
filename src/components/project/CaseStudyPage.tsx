"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, FileText, Calendar, Wrench } from "lucide-react";
import type { Project } from "@/types/project";
import { CATEGORY_META } from "@/types/project";
import { staggerContainer, staggerItem, slideUp, fadeIn } from "@/lib/animations";
import { cn } from "@/lib/utils";

// ─── Metric Card ──────────────────────────────────────────────────────
function MetricCard({
  label,
  before,
  after,
  improvement,
}: {
  label: string;
  before: string;
  after: string;
  improvement: string;
}) {
  const isPositive = improvement.startsWith("+") || improvement.toLowerCase().includes("real") || improvement.toLowerCase().includes("high") || improvement.toLowerCase().includes("instant") || improvement.toLowerCase().includes("launch") || improvement.toLowerCase().includes("more");

  return (
    <div className="card p-5 flex flex-col gap-3">
      <p className="text-xs font-semibold text-surface-500 dark:text-surface-500 uppercase tracking-wider">
        {label}
      </p>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-xs text-surface-400 mb-1">Before</p>
          <p className="text-sm font-semibold text-surface-600 dark:text-surface-400 line-through decoration-red-400">
            {before}
          </p>
        </div>
        <div>
          <p className="text-xs text-surface-400 mb-1">After</p>
          <p className="text-sm font-bold text-surface-900 dark:text-surface-50">{after}</p>
        </div>
      </div>
      <div
        className={cn(
          "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold self-start",
          isPositive
            ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400"
            : "bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400"
        )}
      >
        {improvement}
      </div>
    </div>
  );
}

// ─── Related Project Card ─────────────────────────────────────────────
function RelatedCard({ project }: { project: Project }) {
  return (
    <Link href={`/project/${project.slug}`}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 260 }}
        className="card overflow-hidden group"
      >
        <div className="aspect-video relative bg-surface-100 dark:bg-surface-800">
          {project.thumbnail ? (
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-4xl bg-gradient-to-br from-accent-100 to-purple-100 dark:from-accent-900/20 dark:to-purple-900/20">
              {project.category.includes("ui-ux") ? "🎨" :
               project.category.includes("data-system") ? "⚙️" : "📊"}
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex gap-1 flex-wrap mb-2">
            {project.category.map((cat) => (
              <span key={cat} className={`text-xs px-2 py-0.5 rounded-full font-medium ${CATEGORY_META[cat].bgColor} ${CATEGORY_META[cat].textColor}`}>
                {CATEGORY_META[cat].emoji} {CATEGORY_META[cat].label}
              </span>
            ))}
          </div>
          <h4 className="font-bold text-surface-900 dark:text-surface-50 text-sm group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
            {project.title}
          </h4>
          <p className="text-xs text-surface-500 mt-1">{project.year}</p>
        </div>
      </motion.div>
    </Link>
  );
}

// ─── Main Case Study Component ────────────────────────────────────────
export function CaseStudyPage({
  project,
  relatedProjects,
}: {
  project: Project;
  relatedProjects: Project[];
}) {
  return (
    <article className="pt-24 pb-20">
      {/* ── Hero ── */}
      <div className="relative overflow-hidden bg-surface-50 dark:bg-surface-900 border-b border-surface-200 dark:border-surface-800">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="container relative py-16 md:py-24">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 text-sm font-medium text-surface-500 hover:text-surface-900 dark:hover:text-surface-50 transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Work
            </Link>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            {/* Category pills */}
            <motion.div variants={staggerItem} className="flex flex-wrap gap-2 mb-4">
              {project.category.map((cat) => {
                const meta = CATEGORY_META[cat];
                return (
                  <span
                    key={cat}
                    className={`badge px-3 py-1 font-semibold ${meta.bgColor} ${meta.textColor}`}
                  >
                    {meta.emoji} {meta.label}
                  </span>
                );
              })}
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={staggerItem}
              className="text-4xl md:text-5xl font-black text-surface-900 dark:text-surface-50 leading-tight mb-4"
            >
              {project.title}
            </motion.h1>

            {/* Metadata row */}
            <motion.div
              variants={staggerItem}
              className="flex flex-wrap items-center gap-4 text-sm text-surface-500"
            >
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {project.year}
              </span>
              <span className="flex items-center gap-1.5">
                <Wrench size={14} />
                {project.role}
              </span>
            </motion.div>

            {/* External links */}
            {(project.liveUrl || project.repoUrl || project.caseStudyUrl) && (
              <motion.div variants={staggerItem} className="flex flex-wrap gap-3 mt-6">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">
                    <ExternalLink size={14} />
                    Live Demo
                  </a>
                )}
                {project.repoUrl && (
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm">
                    <Github size={14} />
                    View Code
                  </a>
                )}
                {project.caseStudyUrl && (
                  <a href={project.caseStudyUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm">
                    <FileText size={14} />
                    Full Case Study
                  </a>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      <div className="container mt-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* ── Main content ── */}
          <div className="lg:col-span-2 space-y-12">
            {/* Thumbnail / hero image */}
            {project.thumbnail && (
              <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className="rounded-2xl overflow-hidden aspect-video relative bg-surface-100 dark:bg-surface-800"
              >
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              </motion.div>
            )}

            {/* Problem */}
            <motion.section variants={slideUp} initial="hidden" animate="visible">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-lg">
                  🔍
                </span>
                <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-50">
                  The Problem
                </h2>
              </div>
              <div className="pl-11 prose-portfolio">
                <p>{project.problem}</p>
              </div>
            </motion.section>

            {/* Solution */}
            <motion.section
              variants={slideUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 text-lg">
                  💡
                </span>
                <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-50">
                  The Solution
                </h2>
              </div>
              <div className="pl-11 prose-portfolio">
                <p>{project.solution}</p>
              </div>
            </motion.section>

            {/* Impact */}
            <motion.section
              variants={slideUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-lg">
                  🚀
                </span>
                <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-50">
                  The Impact
                </h2>
              </div>
              <div className="pl-11 prose-portfolio">
                <p>{project.impact}</p>
              </div>
            </motion.section>

            {/* Metrics */}
            {project.metrics.length > 0 && (
              <motion.section
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-50 mb-6">
                  📊 Key Metrics
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {project.metrics.map((metric, i) => (
                    <motion.div key={i} variants={staggerItem}>
                      <MetricCard {...metric} />
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Gallery */}
            {project.gallery.length > 0 && (
              <motion.section variants={slideUp} initial="hidden" animate="visible">
                <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-50 mb-6">
                  🖼️ Gallery
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {project.gallery.map((img, i) => (
                    <div key={i} className="aspect-video relative rounded-xl overflow-hidden bg-surface-100 dark:bg-surface-800">
                      <Image
                        src={img}
                        alt={`${project.title} - image ${i + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
          </div>

          {/* ── Sidebar ── */}
          <aside className="space-y-6">
            {/* Project info card */}
            <div className="card p-6 sticky top-24 space-y-5">
              <h3 className="font-bold text-surface-900 dark:text-surface-50 text-sm uppercase tracking-wider">
                Project Details
              </h3>

              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-xs text-surface-400 mb-1 font-medium uppercase tracking-wider">Role</p>
                  <p className="text-surface-700 dark:text-surface-300 font-medium">{project.role}</p>
                </div>
                <div>
                  <p className="text-xs text-surface-400 mb-1 font-medium uppercase tracking-wider">Year</p>
                  <p className="text-surface-700 dark:text-surface-300 font-medium">{project.year}</p>
                </div>
                <div>
                  <p className="text-xs text-surface-400 mb-2 font-medium uppercase tracking-wider">Categories</p>
                  <div className="flex flex-col gap-2">
                    {project.category.map((cat) => {
                      const meta = CATEGORY_META[cat];
                      return (
                        <span key={cat} className={`badge text-xs w-fit ${meta.bgColor} ${meta.textColor}`}>
                          {meta.emoji} {meta.label}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-surface-400 mb-2 font-medium uppercase tracking-wider">Tools Used</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-2 py-0.5 text-xs bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded text-surface-600 dark:text-surface-400"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Links */}
              <div className="pt-4 border-t border-surface-100 dark:border-surface-800 space-y-2">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary w-full justify-center text-sm">
                    <ExternalLink size={14} />
                    View Live
                  </a>
                )}
                {project.repoUrl && (
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary w-full justify-center text-sm">
                    <Github size={14} />
                    GitHub Repo
                  </a>
                )}
              </div>
            </div>
          </aside>
        </div>

        {/* ── Related Projects ── */}
        {relatedProjects.length > 0 && (
          <motion.section
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mt-20 pt-12 border-t border-surface-200 dark:border-surface-800"
          >
            <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-50 mb-8">
              Related Projects
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedProjects.map((p) => (
                <motion.div key={p.id} variants={staggerItem}>
                  <RelatedCard project={p} />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </article>
  );
}
