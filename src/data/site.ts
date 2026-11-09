/**
 * Site configuration — profile data, navigation, social links
 * Edit this file to update your personal information throughout the site
 */

export const siteConfig = {
  // ─── Personal Info ─────────────────────────────────────────────
  name: "Your Name",
  tagline: "Bridging Business, Design & Technology",
  bio: "Saya adalah seorang profesional multi-disiplin yang bekerja di persimpangan antara analisis bisnis, desain UX, dan pengembangan sistem. Dengan pendekatan end-to-end, saya membantu organisasi mentransformasi kebutuhan bisnis menjadi solusi digital yang berdampak — dari requirement gathering hingga implementasi sistem.",
  location: "Jakarta, Indonesia",
  availability: "Open for freelance & full-time opportunities",

  // ─── URLs ──────────────────────────────────────────────────────
  url: "https://yourportfolio.vercel.app",
  resumeUrl: "/resume.pdf",

  // ─── Social Links ──────────────────────────────────────────────
  social: {
    linkedin: "https://linkedin.com/in/yourname",
    github: "https://github.com/yourname",
    email: "hello@yourname.com",
    behance: "https://behance.net/yourname",
    dribbble: "https://dribbble.com/yourname",
  },

  // ─── SEO ──────────────────────────────────────────────────────
  seo: {
    title: "Your Name — Business Analysis · UI/UX · Data & System",
    description:
      "Portfolio profesional multi-disiplin yang menggabungkan Business Analysis, UI/UX Design, dan Data & System Development untuk solusi digital end-to-end.",
    keywords: [
      "Business Analyst",
      "UI/UX Designer",
      "Data Developer",
      "Portfolio",
      "Indonesia",
    ],
  },

  // ─── Navigation ───────────────────────────────────────────────
  nav: [
    { label: "Work", href: "/#work" },
    { label: "About", href: "/#about" },
    { label: "Services", href: "/#services" },
    { label: "Journey", href: "/#journey" },
    { label: "Contact", href: "/#contact" },
  ],
};

// ─── Career Timeline ──────────────────────────────────────────────────
export const timeline = [
  {
    year: "2019",
    role: "Business Analyst",
    company: "Consulting Firm",
    description:
      "Memulai karier sebagai Business Analyst, fokus pada requirement gathering, BRD, dan process mapping untuk klien enterprise.",
    categories: ["business-analysis"] as const,
  },
  {
    year: "2020",
    role: "Business Analyst & UX Researcher",
    company: "Tech Startup",
    description:
      "Beralih ke startup teknologi, mulai menggabungkan peran BA dengan UX research. Pertama kali mengelola proses design thinking.",
    categories: ["business-analysis", "ui-ux"] as const,
  },
  {
    year: "2021",
    role: "UI/UX Designer",
    company: "Product Company",
    description:
      "Fokus penuh pada UI/UX design — dari wireframe, prototyping, hingga membangun design system skala perusahaan.",
    categories: ["ui-ux"] as const,
  },
  {
    year: "2022",
    role: "Senior Designer & Data Analyst",
    company: "Digital Agency",
    description:
      "Mulai mengeksplorasi data analytics sebagai ekstensi dari pekerjaan desain — memperkuat keputusan dengan data kuantitatif.",
    categories: ["ui-ux", "data-system"] as const,
  },
  {
    year: "2023",
    role: "Full-Stack Product Developer",
    company: "Freelance & Consulting",
    description:
      "Bergabungkan tiga bidang: memimpin proyek dari analisis bisnis → desain → implementasi sistem secara end-to-end.",
    categories: ["business-analysis", "ui-ux", "data-system"] as const,
  },
  {
    year: "2024",
    role: "Multi-Disciplinary Consultant",
    company: "Independent",
    description:
      "Kini bekerja sebagai konsultan independen, membantu berbagai klien menciptakan solusi digital komprehensif lintas bidang.",
    categories: ["business-analysis", "ui-ux", "data-system"] as const,
  },
];

// ─── Skills by Category ───────────────────────────────────────────────
export const skills = {
  "business-analysis": [
    "Requirement Gathering",
    "Process Mapping",
    "BRD Writing",
    "Stakeholder Management",
    "UML Diagrams",
    "User Story",
    "Gap Analysis",
    "Business Case",
    "BPMN",
    "Workshop Facilitation",
  ],
  "ui-ux": [
    "Wireframing",
    "Prototyping",
    "Design System",
    "User Research",
    "Usability Testing",
    "Information Architecture",
    "Interaction Design",
    "Design Thinking",
    "A/B Testing",
    "Accessibility (WCAG)",
  ],
  "data-system": [
    "Database Design",
    "ERD",
    "REST API",
    "Dashboard Development",
    "Process Automation",
    "Web Development",
    "Data Pipeline",
    "SQL / PostgreSQL",
    "Python",
    "Docker",
  ],
};

// ─── Services ─────────────────────────────────────────────────────────
export const services = [
  {
    id: "business-analysis",
    emoji: "📊",
    title: "Business Analysis",
    description:
      "Menerjemahkan kebutuhan bisnis yang kompleks menjadi spesifikasi yang jelas dan actionable. Dari stakeholder interview hingga BRD yang komprehensif.",
    highlights: [
      "Requirement Gathering & Elicitation",
      "Business Process Mapping (BPMN/UML)",
      "BRD & Functional Specification",
      "Stakeholder Management",
      "User Story & Acceptance Criteria",
      "Gap Analysis & Recommendation",
    ],
  },
  {
    id: "ui-ux",
    emoji: "🎨",
    title: "UI/UX Design",
    description:
      "Merancang pengalaman pengguna yang intuitif, estetis, dan berdampak bisnis — dari riset pengguna hingga handoff ke developer.",
    highlights: [
      "User Research & Persona",
      "Information Architecture",
      "Wireframe & Prototyping",
      "High-Fidelity UI Design",
      "Design System Development",
      "Usability Testing",
    ],
  },
  {
    id: "data-system",
    emoji: "⚙️",
    title: "Data & System Development",
    description:
      "Membangun sistem dan pipeline data yang scalable — dari ERD & arsitektur database hingga dashboard interaktif dan API.",
    highlights: [
      "Database Design & ERD",
      "REST API Development",
      "Data Pipeline & Automation",
      "Interactive Dashboard",
      "Web & App Development",
      "System Integration",
    ],
  },
];
