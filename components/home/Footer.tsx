"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";

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
      
      {/* grid */}
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
          </div>
          
          <div className="grid grid-cols-2 gap-16 text-sm">
            <div className="space-y-4">
              {["Posts", "Snippets", "Questions", "Tasks"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="group relative block w-fit"
                >
                  <span className="group-hover:opacity-70 transition">
                    {item}
                  </span>
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all group-hover:w-full" />
                </Link>
              ))}
            </div>

            <div className="space-y-4">
              {["About", "Privacy", "Terms", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="group relative block w-fit"
                >
                  <span className="group-hover:opacity-70 transition">
                    {item}
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