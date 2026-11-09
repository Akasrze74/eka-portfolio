# 🗂️ Portfolio — Multi-Disciplinary Professional Portfolio

> Built with **Next.js 14** (App Router) · **Tailwind CSS** · **Framer Motion** · **TypeScript**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open http://localhost:3000
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (fonts, SEO, ThemeProvider)
│   ├── page.tsx                # Home page (assembles all sections)
│   ├── globals.css             # Global styles + Tailwind directives
│   ├── not-found.tsx           # Custom 404 page
│   ├── sitemap.ts              # Auto-generated sitemap.xml
│   ├── robots.ts               # Auto-generated robots.txt
│   └── project/
│       └── [slug]/
│           └── page.tsx        # Dynamic case study page
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Responsive nav + dark mode toggle
│   │   └── Footer.tsx          # Footer + CTA banner
│   ├── providers/
│   │   └── ThemeProvider.tsx   # next-themes wrapper
│   ├── sections/
│   │   ├── HeroSection.tsx     # Animated hero
│   │   ├── AboutSection.tsx    # About + Venn diagram + skills
│   │   ├── ServicesSection.tsx # 3 service cards
│   │   ├── PortfolioSection.tsx # Filterable project grid
│   │   ├── TimelineSection.tsx # Career timeline
│   │   ├── ContactSection.tsx  # Contact form + social
│   │   └── index.ts            # Barrel exports
│   └── project/
│       └── CaseStudyPage.tsx   # Full case study view
│
├── data/
│   ├── projects.ts             # ⭐ ALL PROJECTS DATA (add new projects here!)
│   └── site.ts                 # Personal info, nav, timeline, services
│
├── types/
│   └── project.ts              # TypeScript types + category metadata
│
└── lib/
    ├── utils.ts                # cn() utility
    └── animations.ts           # Framer Motion variants
```

---

## ✨ How to Add a New Project

> **Adding a project takes ~2 minutes!** Just add one object to the array.

Open [`src/data/projects.ts`](./src/data/projects.ts) and append a new object:

```typescript
{
  id: "7",                        // Unique ID
  title: "My New Project",
  slug: "my-new-project",         // Used for URL: /project/my-new-project
  year: 2025,
  thumbnail: "/images/projects/new-project-thumb.jpg",
  gallery: [
    "/images/projects/new-project-1.jpg",
    "/images/projects/new-project-2.jpg",
  ],
  category: ["ui-ux", "business-analysis"],  // Pick 1-3 categories
  role: "UI/UX Designer & Business Analyst",
  tools: ["Figma", "Miro", "Jira"],
  problem: "Describe the problem here...",
  solution: "Describe how you solved it...",
  impact: "Describe the business impact...",
  metrics: [
    { label: "Conversion Rate", before: "2%", after: "5%", improvement: "+3%" },
  ],
  featured: true,                // Show in "Featured" section
  liveUrl: "https://example.com",
  repoUrl: "",
  caseStudyUrl: "",
}
```

**That's it!** The project will automatically appear in:
- ✅ Portfolio grid (`/`)
- ✅ Filter tabs (with correct count)
- ✅ Case study page (`/project/my-new-project`)
- ✅ Related projects on other case studies
- ✅ Sitemap (`/sitemap.xml`)

---

## 🎨 Category Colors

| Category | ID | Color |
|---|---|---|
| Business Analysis | `business-analysis` | 🔵 Blue |
| UI/UX Design | `ui-ux` | 🩷 Pink/Purple |
| Data & System | `data-system` | 🩵 Teal/Green |

---

## 🌗 Dark Mode

Dark mode is powered by [next-themes](https://github.com/pacocoursey/next-themes). The toggle is in the Navbar. It respects the user's OS preference by default.

---

## 🖼️ Adding Images

Put project images in `/public/images/projects/`:

```
public/
└── images/
    └── projects/
        ├── my-project-thumb.jpg   # Main card thumbnail (16:9 or 4:3)
        ├── my-project-1.jpg       # Gallery image 1
        └── my-project-2.jpg       # Gallery image 2
```

Use paths like: `"/images/projects/my-project-thumb.jpg"` in `projects.ts`.

---

## ✏️ Personalization Checklist

Edit [`src/data/site.ts`](./src/data/site.ts) to update:

- [ ] `name` — Your full name
- [ ] `tagline` — Your personal tagline
- [ ] `bio` — Your bio paragraph
- [ ] `location` — Your city
- [ ] `social.*` — All social links
- [ ] `resumeUrl` — Path to your PDF resume (put it in `/public/resume.pdf`)
- [ ] `timeline` — Your career milestones
- [ ] `skills.*` — Your skills per category
- [ ] `siteConfig.url` — Your live Vercel URL

---

## 🚢 Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or push to GitHub and connect your repo to [vercel.com](https://vercel.com).

---

## 🛠️ Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| Next.js | 14.x | Framework (App Router) |
| React | 18.x | UI |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 3.4 | Styling |
| Framer Motion | 11.x | Animations |
| next-themes | 0.3 | Dark mode |
| lucide-react | 0.400 | Icons |

---

## 📄 License

MIT — Free to use, modify, and distribute.
