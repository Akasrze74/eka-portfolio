import type { Config } from "tailwindcss";

const config: Config = {
  // Enable dark mode via class strategy (toggled by next-themes)
  darkMode: "class",

  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      // ─── Font Families ───────────────────────────────────────────────
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },

      // ─── Color Palette ───────────────────────────────────────────────
      colors: {
        // Brand accent – indigo
        accent: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5", // PRIMARY
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
        // Business Analysis – blue
        ba: {
          light: "#dbeafe",
          DEFAULT: "#3b82f6",
          dark: "#1d4ed8",
        },
        // UI/UX – purple/pink
        ux: {
          light: "#fce7f3",
          DEFAULT: "#ec4899",
          dark: "#be185d",
        },
        // Data & System – teal/green
        ds: {
          light: "#ccfbf1",
          DEFAULT: "#14b8a6",
          dark: "#0f766e",
        },
        // Neutral surface
        surface: {
          50: "#fafafa",
          100: "#f4f4f5",
          200: "#e4e4e7",
          800: "#27272a",
          900: "#18181b",
          950: "#09090b",
        },
      },

      // ─── Background Image / Gradients ────────────────────────────────
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "grid-pattern":
          "linear-gradient(to right, rgba(99,102,241,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(99,102,241,0.05) 1px, transparent 1px)",
      },

      backgroundSize: {
        "grid-sm": "24px 24px",
        "grid-md": "40px 40px",
        "grid-lg": "64px 64px",
      },

      // ─── Animation ───────────────────────────────────────────────────
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "float": "float 6s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },

      // ─── Spacing / Sizing ─────────────────────────────────────────────
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },

      // ─── Border Radius ────────────────────────────────────────────────
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },

  plugins: [],
};

export default config;
