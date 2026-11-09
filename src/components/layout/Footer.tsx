import Link from "next/link";
import { Linkedin, Github, Mail, Dribbble } from "lucide-react";
import { siteConfig } from "@/data/site";

const socialLinks = [
  { href: siteConfig.social.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: siteConfig.social.github, icon: Github, label: "GitHub" },
  { href: `mailto:${siteConfig.social.email}`, icon: Mail, label: "Email" },
  { href: siteConfig.social.dribbble, icon: Dribbble, label: "Dribbble" },
];

const footerNav = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Journey", href: "/#journey" },
  { label: "Contact", href: "/#contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface-50 dark:bg-surface-900 border-t border-surface-200 dark:border-surface-800">
      {/* ── CTA Banner ── */}
      <div className="bg-gradient-to-r from-accent-600 via-purple-600 to-pink-600 py-16">
        <div className="container text-center">
          <p className="text-accent-200 text-sm font-semibold tracking-wider uppercase mb-3">
            Let&apos;s Build Something
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Let&apos;s collaborate on your next project
          </h2>
          <p className="text-accent-100/80 text-lg mb-8 max-w-xl mx-auto">
            Butuh Business Analyst, UI/UX Designer, atau System Developer?
            Atau ketiganya? Saya siap membantu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`mailto:${siteConfig.social.email}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-accent-700 font-semibold rounded-xl hover:bg-accent-50 transition-colors duration-200"
            >
              <Mail size={18} />
              Get in Touch
            </a>
            <a
              href="/#work"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white/10 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors duration-200"
            >
              View My Work
            </a>
          </div>
        </div>
      </div>

      {/* ── Footer Body ── */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-surface-200 dark:border-surface-800">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-500 to-purple-600 flex items-center justify-center text-white text-xs font-black">
                {siteConfig.name.charAt(0)}
              </span>
              <span className="font-bold text-surface-900 dark:text-surface-50">
                {siteConfig.name}
              </span>
            </div>
            <p className="text-sm text-surface-500 dark:text-surface-500 leading-relaxed max-w-xs">
              Multi-disciplinary professional bridging Business Analysis, UI/UX Design, and Data & System Development.
            </p>
            {/* Availability badge */}
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-full">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-green-700 dark:text-green-400 font-medium">
                {siteConfig.availability}
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-sm font-semibold text-surface-900 dark:text-surface-50 mb-4">
              Navigation
            </p>
            <ul className="space-y-2">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-surface-500 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="text-sm font-semibold text-surface-900 dark:text-surface-50 mb-4">
              Connect
            </p>
            <div className="flex flex-col gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-surface-500 hover:text-accent-600 dark:hover:text-accent-400 transition-colors group"
                >
                  <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-surface-100 dark:bg-surface-800 group-hover:bg-accent-100 dark:group-hover:bg-accent-900/30 transition-colors">
                    <s.icon size={16} />
                  </span>
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-surface-400 dark:text-surface-600">
            © {year} {siteConfig.name}. Built with Next.js & Tailwind CSS.
          </p>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-surface-400">All systems normal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
