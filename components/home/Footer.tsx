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
    <footer className="w-full bg-black text-white overflow-hidden">
      <div className="px-10 pt-12 pb-20">
        <div className="flex flex-col md:flex-row justify-between items-start gap-20">
          <div className="space-y-6 max-w-md">
            <h2 className="text-4xl font-medium tracking-tight">
              Build once. Build right.
            </h2>
            <p className="text-white/60 text-sm leading-relaxed">
              CodeVerse is your place to publish posts, share snippets,
              ask questions and grow publicly as a developer.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-16 text-sm">
            <div className="space-y-4">
              <Link href="/post" className="block hover:opacity-50 transition">
                Posts
              </Link>
              <Link href="/snippet" className="block hover:opacity-50 transition">
                Snippets
              </Link>
              <Link href="/question" className="block hover:opacity-50 transition">
                Questions
              </Link>
              <Link href="/task" className="block hover:opacity-50 transition">
                Tasks
              </Link>
            </div>

            <div className="space-y-4">
              <Link href="/about" className="block hover:opacity-50 transition">
                About
              </Link>
              <Link href="/privacy" className="block hover:opacity-50 transition">
                Privacy
              </Link>
              <Link href="/terms" className="block hover:opacity-50 transition">
                Terms
              </Link>
              <Link href="/contact" className="block hover:opacity-50 transition">
                Contact
              </Link>
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
          className="flex leading-none font-black tracking-tight text-[22vw] md:text-[14rem]"
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
    </footer>
  );
}