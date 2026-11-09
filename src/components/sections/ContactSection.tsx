"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Linkedin, Github, Mail, Dribbble, Send, MapPin } from "lucide-react";
import { siteConfig } from "@/data/site";
import { staggerContainer, staggerItem } from "@/lib/animations";

const socialCards = [
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.social.email,
    href: `mailto:${siteConfig.social.email}`,
    color: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900 text-red-600 dark:text-red-400",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Connect with me",
    href: siteConfig.social.linkedin,
    color: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-900 text-blue-600 dark:text-blue-400",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "See my code",
    href: siteConfig.social.github,
    color: "bg-surface-50 dark:bg-surface-800 border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-300",
  },
  {
    icon: Dribbble,
    label: "Dribbble",
    value: "See my designs",
    href: siteConfig.social.dribbble,
    color: "bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-900 text-pink-600 dark:text-pink-400",
  },
];

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate sending (replace with actual form submission logic)
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("sent");
  };

  return (
    <section id="contact" className="section">
      <div className="container" ref={ref}>
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.p variants={staggerItem} className="section-label">Contact</motion.p>
          <motion.h2 variants={staggerItem} className="section-title">
            Let&apos;s{" "}
            <span className="text-gradient">Connect</span>
          </motion.h2>
          <motion.p variants={staggerItem} className="section-subtitle mx-auto">
            Punya project menarik? Ingin diskusi tentang kolaborasi? Atau sekadar ingin ngobrol — saya selalu terbuka.
          </motion.p>
          <motion.div variants={staggerItem} className="flex items-center justify-center gap-2 mt-4 text-surface-500 text-sm">
            <MapPin size={14} />
            {siteConfig.location}
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Left — Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="card p-8"
          >
            <h3 className="text-xl font-bold text-surface-900 dark:text-surface-50 mb-6">
              Send a Message
            </h3>

            {status === "sent" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="text-5xl mb-4">🎉</div>
                <h4 className="text-lg font-bold text-surface-900 dark:text-surface-50 mb-2">
                  Message Sent!
                </h4>
                <p className="text-surface-500 text-sm">
                  Terima kasih! Saya akan membalas dalam 24 jam.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="John Doe"
                      className="input"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="john@example.com"
                      className="input"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    required
                    placeholder="Project collaboration, freelance inquiry, etc."
                    className="input"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    placeholder="Ceritakan project Anda..."
                    className="input resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-primary w-full justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Right — Social cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold text-surface-900 dark:text-surface-50 mb-6">
              Or find me here
            </h3>
            {socialCards.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target={s.label !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${s.color}`}
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/50 dark:bg-black/20">
                  <s.icon size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold">{s.label}</p>
                  <p className="text-xs opacity-75">{s.value}</p>
                </div>
                <div className="ml-auto opacity-50">→</div>
              </motion.a>
            ))}

            {/* Response time badge */}
            <div className="mt-6 p-4 bg-accent-50 dark:bg-accent-900/20 border border-accent-200 dark:border-accent-800 rounded-xl">
              <p className="text-sm font-semibold text-accent-700 dark:text-accent-300 mb-1">
                ⚡ Fast Response
              </p>
              <p className="text-xs text-accent-600 dark:text-accent-400">
                Biasanya membalas dalam 24 jam di hari kerja. Untuk urusan urgent, langsung email saja!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
