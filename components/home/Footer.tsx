"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Github, Linkedin } from "lucide-react";

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/",
    icon: Github,
    color: "hover:text-[#2ea44f] hover:border-[#2ea44f]/40 hover:shadow-[0_0_15px_rgba(46,164,79,0.2)]",
    bgGlow: "bg-[#2ea44f]/10",
    tooltip: "Explore our repository"
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/",
    icon: XIcon,
    color: "hover:text-white hover:border-white/40 hover:shadow-[0_0_15px_rgba(255,255,255,0.15)]",
    bgGlow: "bg-white/10",
    tooltip: "Follow us on X"
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/",
    icon: Linkedin,
    color: "hover:text-[#0a66c2] hover:border-[#0a66c2]/40 hover:shadow-[0_0_15px_rgba(10,102,194,0.2)]",
    bgGlow: "bg-[#0a66c2]/10",
    tooltip: "Connect on LinkedIn"
  },
];


const word = "CodeVerse";

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const letterVariant: Variants = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Footer() {
  return (
    <footer className="relative w-full bg-black text-white overflow-hidden border-t border-white/10">
      
    
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-size-[60px_60px]" />
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-100 bg-red-500/20 blur-[140px] pointer-events-none" />

      <div className="relative px-10 pt-16 pb-24">
        <div className="flex flex-col md:flex-row justify-between items-start gap-20">
          <div className="space-y-6 max-w-md">
            <h2 className="text-4xl font-semibold tracking-tight leading-tight">
              Build once. <br /> Build right.
            </h2>
            <p className="text-white/60 text-sm leading-relaxed">
              CodeVerse is your place to publish posts, share snippets,
              ask questions and grow publicly as a developer.
            </p>

           
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="relative group">
                    
                  
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-2.5 py-1.5 bg-[#0f0f0f] border border-white/10 text-white text-[10px] font-mono rounded shadow-[0_4px_12px_rgba(0,0,0,0.5)] opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 pointer-events-none whitespace-nowrap z-30">
                      <div className="relative">
                        {item.tooltip}
                        <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#0f0f0f] -mb-1.5" />
                      </div>
                    </div>

                  
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      className={`relative flex items-center justify-center w-10 h-10 rounded-lg bg-[#0d0d0d] border border-white/10 text-white/40 transition-all duration-300 active:scale-95 outline-none cursor-pointer ${item.color}`}
                    >
                     
                      <div className={`absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 ${item.bgGlow} group-hover:opacity-100`} />
                      
                  
                      <span className="relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                      </span>
                    </a>

                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-16 text-sm">
            <div className="space-y-4">
              {[{ label: "Articles", href: "/article" }, { label: "Snippets", href: "/snippet" }, { label: "Questions", href: "/qa" }, { label: "Tasks", href: "/task" }].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative block w-fit"
                >
                  <span className="group-hover:opacity-70 transition">
                    {item.label}
                  </span>
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all group-hover:w-full" />
                </Link>
              ))}
            </div>

            <div className="space-y-4">
              {[{ label: "About", href: "/about" }, { label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" }].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative block w-fit"
                >
                  <span className="group-hover:opacity-70 transition">
                    {item.label}
                  </span>
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all group-hover:w-full" />
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>

      <div className="relative w-full flex justify-center items-end overflow-hidden">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex leading-none font-black tracking-tight text-[22vw] md:text-[14rem] text-white select-none"
        >
          {word.split("").map((char, index) => (
            <span key={index} className="overflow-hidden">
              <motion.span
                variants={letterVariant}
                className="inline-block"
              >
                {char}
              </motion.span>
            </span>
          ))}
        </motion.div>
      </div>

      <div className="relative border-t border-white/10 py-6 px-10 text-sm text-white/40 flex flex-col md:flex-row justify-between items-center gap-4">
        <span>© {new Date().getFullYear()} CodeVerse. All rights reserved.</span>
        <span>Built with passion for developers </span>
      </div>
    </footer>
  );
}
