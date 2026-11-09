/**
 * Project type definitions
 * Schema for every portfolio project object
 */

export type CategoryId = "business-analysis" | "ui-ux" | "data-system";

export interface Metric {
  label: string;
  before: string;
  after: string;
  improvement: string;
}

export interface Project {
  // ─── Identity ─────────────────────────────────────
  id: string;
  title: string;
  slug: string; // used for URL: /project/[slug]
  year: number;

  // ─── Media ────────────────────────────────────────
  thumbnail: string; // main card image
  gallery: string[]; // images for case study page

  // ─── Classification ───────────────────────────────
  category: CategoryId[]; // 1+ categories
  role: string; // "Business Analyst / UI Designer"
  tools: string[]; // ["Figma", "SQL", ...]

  // ─── Narrative ────────────────────────────────────
  problem: string;
  solution: string;
  impact: string;
  metrics: Metric[];

  // ─── Links ────────────────────────────────────────
  liveUrl?: string;
  repoUrl?: string;
  caseStudyUrl?: string;

  // ─── Display Flags ────────────────────────────────
  featured: boolean;
}

// Category metadata — display name, color, icon
export const CATEGORY_META: Record<
  CategoryId,
  { label: string; color: string; bgColor: string; borderColor: string; textColor: string; emoji: string }
> = {
  "business-analysis": {
    label: "Business Analysis",
    color: "ba",
    bgColor: "bg-ba-light dark:bg-blue-900/30",
    borderColor: "border-ba",
    textColor: "text-ba-dark dark:text-ba",
    emoji: "📊",
  },
  "ui-ux": {
    label: "UI/UX Design",
    color: "ux",
    bgColor: "bg-ux-light dark:bg-pink-900/30",
    borderColor: "border-ux",
    textColor: "text-ux-dark dark:text-ux",
    emoji: "🎨",
  },
  "data-system": {
    label: "Data & System",
    color: "ds",
    bgColor: "bg-ds-light dark:bg-teal-900/30",
    borderColor: "border-ds",
    textColor: "text-ds-dark dark:text-ds",
    emoji: "⚙️",
  },
};

// Filter tab definitions
export const FILTER_TABS = [
  { id: "all", label: "All Work" },
  { id: "business-analysis", label: "Business Analysis" },
  { id: "ui-ux", label: "UI/UX Design" },
  { id: "data-system", label: "Data & System" },
] as const;

export type FilterTabId = (typeof FILTER_TABS)[number]["id"];
