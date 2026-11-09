/**
 * ============================================================
 *  PROJECTS DATA — The Single Source of Truth
 * ============================================================
 *  To add a new project: append one object to this array.
 *  It will AUTOMATICALLY appear in:
 *    ✅  Portfolio grid (/)
 *    ✅  Filter tabs
 *    ✅  Category tags
 *    ✅  Related projects on detail page
 *    ✅  Sitemap (/sitemap.xml)
 *    ✅  OG image meta per project
 *
 *  Schema reference → src/types/project.ts
 * ============================================================
 */

import type { Project } from "@/types/project";

export const projects: Project[] = [
  // ─── PROJECT 1 ────────────────────────────────────────────────────
  {
    id: "1",
    title: "E-Commerce Platform Redesign",
    slug: "ecommerce-platform-redesign",
    year: 2024,
    thumbnail: "/images/projects/ecommerce-thumb.jpg",
    gallery: [
      "/images/projects/ecommerce-1.jpg",
      "/images/projects/ecommerce-2.jpg",
      "/images/projects/ecommerce-3.jpg",
    ],
    category: ["ui-ux", "business-analysis"],
    role: "UI/UX Designer & Business Analyst",
    tools: ["Figma", "Miro", "Jira", "Hotjar", "Google Analytics"],
    problem:
      "Platform e-commerce klien mengalami drop konversi 34% dalam 6 bulan. Checkout flow yang kompleks (7 langkah) menyebabkan cart abandonment rate mencapai 78%, jauh di atas rata-rata industri 69%.",
    solution:
      "Melakukan user research (interview 12 user, analisis heatmap & session recording), kemudian redesain checkout flow dari 7 langkah menjadi 3 langkah dengan pendekatan progressive disclosure. Dibuat pula design system komprehensif untuk konsistensi di seluruh halaman.",
    impact:
      "Checkout rate naik signifikan, user satisfaction meningkat, dan team development lebih cepat mengimplementasikan UI baru berkat design system yang terdokumentasi.",
    metrics: [
      { label: "Cart Abandonment", before: "78%", after: "51%", improvement: "-27%" },
      { label: "Checkout Completion", before: "22%", after: "49%", improvement: "+27%" },
      { label: "NPS Score", before: "32", after: "67", improvement: "+35" },
      { label: "Dev Handoff Time", before: "5 days", after: "1.5 days", improvement: "-70%" },
    ],
    featured: true,
    liveUrl: "https://example.com",
    repoUrl: "",
    caseStudyUrl: "",
  },

  // ─── PROJECT 2 ────────────────────────────────────────────────────
  {
    id: "2",
    title: "HR Management System",
    slug: "hr-management-system",
    year: 2024,
    thumbnail: "/images/projects/hr-thumb.jpg",
    gallery: [
      "/images/projects/hr-1.jpg",
      "/images/projects/hr-2.jpg",
    ],
    category: ["business-analysis", "data-system"],
    role: "Business Analyst & System Developer",
    tools: ["PostgreSQL", "Python", "FastAPI", "React", "Draw.io", "Confluence"],
    problem:
      "Perusahaan manufaktur dengan 800+ karyawan masih mengelola data HR di spreadsheet Excel. Proses penggajian membutuhkan 3 hari kerja, sering terjadi human error, dan tidak ada visibility real-time ke manajemen.",
    solution:
      "Melakukan requirement gathering via workshop dengan 5 departemen, membuat BRD & use-case diagram UML, lalu mengembangkan sistem HR berbasis web dengan database PostgreSQL, REST API FastAPI, dan dashboard React. Termasuk modul payroll otomatis, absensi, dan laporan manajemen.",
    impact:
      "Proses penggajian yang sebelumnya manual dan rawan error kini berjalan otomatis. Manajemen memiliki visibility real-time ke data karyawan, absensi, dan biaya SDM.",
    metrics: [
      { label: "Payroll Processing Time", before: "3 days", after: "2 hours", improvement: "-94%" },
      { label: "Data Error Rate", before: "~12%", after: "< 0.5%", improvement: "-96%" },
      { label: "Report Generation", before: "4 hours", after: "Real-time", improvement: "Instant" },
      { label: "HR Admin Workload", before: "40 hrs/week", after: "12 hrs/week", improvement: "-70%" },
    ],
    featured: true,
    liveUrl: "",
    repoUrl: "https://github.com/example/hr-system",
    caseStudyUrl: "",
  },

  // ─── PROJECT 3 ────────────────────────────────────────────────────
  {
    id: "3",
    title: "Supply Chain Analytics Dashboard",
    slug: "supply-chain-analytics",
    year: 2023,
    thumbnail: "/images/projects/supplychain-thumb.jpg",
    gallery: [
      "/images/projects/supplychain-1.jpg",
      "/images/projects/supplychain-2.jpg",
    ],
    category: ["data-system", "ui-ux"],
    role: "Data Developer & UI Designer",
    tools: ["Python", "Pandas", "SQL", "Power BI", "Figma", "Apache Airflow"],
    problem:
      "Tim supply chain tidak memiliki visibility ke data pipeline secara real-time. Laporan dibuat manual setiap minggu dengan Excel, sehingga keputusan bisnis selalu berdasarkan data yang sudah ketinggalan.",
    solution:
      "Membangun data pipeline otomatis dengan Apache Airflow yang mengintegrasikan 6 sumber data berbeda, lalu merancang dashboard interaktif di Power BI dengan UX yang intuitif berdasarkan user research dengan 8 stakeholder.",
    impact:
      "Tim manajemen kini memiliki akses ke data terkini setiap saat. Kemampuan deteksi anomali supply chain meningkat drastis sehingga potensi kerugian dapat diminimalisir lebih awal.",
    metrics: [
      { label: "Data Freshness", before: "7 days", after: "15 minutes", improvement: "Real-time" },
      { label: "Report Creation", before: "8 hrs/week", after: "Automated", improvement: "-100% manual" },
      { label: "Stockout Incidents", before: "23/quarter", after: "7/quarter", improvement: "-70%" },
      { label: "Decision Speed", before: "3-5 days", after: "Same day", improvement: "-80%" },
    ],
    featured: true,
    liveUrl: "",
    repoUrl: "",
    caseStudyUrl: "",
  },

  // ─── PROJECT 4 ────────────────────────────────────────────────────
  {
    id: "4",
    title: "Healthcare App User Research",
    slug: "healthcare-app-user-research",
    year: 2023,
    thumbnail: "/images/projects/healthcare-thumb.jpg",
    gallery: [
      "/images/projects/healthcare-1.jpg",
    ],
    category: ["business-analysis", "ui-ux"],
    role: "UX Researcher & Business Analyst",
    tools: ["Figma", "Maze", "Notion", "Miro", "Google Forms"],
    problem:
      "Aplikasi konsultasi kesehatan mengalami penurunan pengguna aktif 40% dalam 3 bulan pasca peluncuran fitur baru. Tim product tidak mengetahui root cause yang sesungguhnya.",
    solution:
      "Melakukan mixed-method user research: 15 in-depth interview, usability testing dengan 20 partisipan, analisis behavioral data, dan studi kompetitor. Temuan dirangkum dalam user journey map dan actionable recommendation report.",
    impact:
      "Product team mendapatkan clarity tentang pain points utama. Roadmap Q3 direvisi berdasarkan temuan riset, dan fitur yang tepat diprioritaskan untuk pengembangan.",
    metrics: [
      { label: "User Pain Points Identified", before: "3 assumed", after: "11 validated", improvement: "More clarity" },
      { label: "Feature Priority Accuracy", before: "~40%", after: "~85%", improvement: "+45%" },
      { label: "Research-to-Decision Time", before: "3 weeks", after: "1 week", improvement: "-67%" },
    ],
    featured: false,
    liveUrl: "",
    repoUrl: "",
    caseStudyUrl: "",
  },

  // ─── PROJECT 5 ────────────────────────────────────────────────────
  {
    id: "5",
    title: "Inventory Automation System",
    slug: "inventory-automation-system",
    year: 2023,
    thumbnail: "/images/projects/inventory-thumb.jpg",
    gallery: [
      "/images/projects/inventory-1.jpg",
      "/images/projects/inventory-2.jpg",
    ],
    category: ["data-system", "business-analysis"],
    role: "System Developer & Business Analyst",
    tools: ["Python", "PostgreSQL", "FastAPI", "React", "Docker", "ERD Tool"],
    problem:
      "Retailer dengan 15 cabang tidak memiliki sistem terpadu untuk manajemen inventaris. Tiap cabang pakai sistem berbeda, menyebabkan data silo, overstock di satu tempat dan stockout di tempat lain.",
    solution:
      "Analisis bisnis lintas departemen untuk memetakan proses as-is, desain ERD dan arsitektur sistem terpusat, pengembangan REST API, dan dashboard manajemen stok real-time dengan fitur alert otomatis.",
    impact:
      "Visibilitas stok terpusat memungkinkan redistribusi produk antar cabang secara efisien, mengurangi pemborosan dan meningkatkan service level ke pelanggan.",
    metrics: [
      { label: "Stockout Rate", before: "18%", after: "4%", improvement: "-78%" },
      { label: "Overstock Cost", before: "$45K/mo", after: "$12K/mo", improvement: "-73%" },
      { label: "Inventory Accuracy", before: "72%", after: "98%", improvement: "+26%" },
      { label: "Inter-branch Transfer", before: "Manual/5 days", after: "Automated/1 day", improvement: "-80%" },
    ],
    featured: false,
    liveUrl: "",
    repoUrl: "https://github.com/example/inventory-system",
    caseStudyUrl: "",
  },

  // ─── PROJECT 6 ────────────────────────────────────────────────────
  {
    id: "6",
    title: "FinTech Mobile App Design",
    slug: "fintech-mobile-app-design",
    year: 2024,
    thumbnail: "/images/projects/fintech-thumb.jpg",
    gallery: [
      "/images/projects/fintech-1.jpg",
      "/images/projects/fintech-2.jpg",
      "/images/projects/fintech-3.jpg",
    ],
    category: ["ui-ux"],
    role: "Lead UI/UX Designer",
    tools: ["Figma", "Principle", "Maze", "FigJam", "Zeroheight"],
    problem:
      "Startup FinTech ingin meluncurkan aplikasi tabungan digital untuk segmen usia 18-25 tahun. Tidak ada desain yang ada sebelumnya — dimulai dari nol dengan constraint bahwa UX harus simpel namun trustworthy.",
    solution:
      "End-to-end design process: persona development, competitive analysis, information architecture, wireframing, high-fidelity mockup, prototyping interaktif, dan usability testing iteratif. Dibuat pula design token system untuk handoff ke developer.",
    impact:
      "Aplikasi berhasil diluncurkan ke App Store dan Google Play. Early user feedback sangat positif dengan rating awal 4.6/5, dan onboarding completion rate jauh di atas benchmark industri.",
    metrics: [
      { label: "Onboarding Completion", before: "Benchmark 45%", after: "78%", improvement: "+33%" },
      { label: "App Store Rating", before: "N/A", after: "4.6 / 5", improvement: "Launch success" },
      { label: "Task Success Rate", before: "Usability Test", after: "91%", improvement: "High" },
      { label: "Time to Market", before: "Estimated 6mo", after: "4.5 months", improvement: "-25%" },
    ],
    featured: true,
    liveUrl: "https://apps.apple.com/example",
    repoUrl: "",
    caseStudyUrl: "",
  },
];

// ─── Helper: get all unique categories ────────────────────────────────
export const getAllCategories = (): string[] => {
  const cats = new Set<string>();
  projects.forEach((p) => p.category.forEach((c) => cats.add(c)));
  return Array.from(cats);
};

// ─── Helper: get related projects (same category, exclude self) ────────
export const getRelatedProjects = (
  slug: string,
  categories: string[],
  limit = 3
): Project[] => {
  return projects
    .filter(
      (p) =>
        p.slug !== slug && p.category.some((c) => categories.includes(c))
    )
    .slice(0, limit);
};

// ─── Helper: get featured projects ────────────────────────────────────
export const getFeaturedProjects = (): Project[] => {
  return projects.filter((p) => p.featured);
};

// ─── Helper: get project by slug ──────────────────────────────────────
export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find((p) => p.slug === slug);
};
