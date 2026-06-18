"use client";

import { motion, useScroll, useVelocity, useTransform, useSpring, useMotionTemplate } from "framer-motion";
import { FileText, Code2, MessageCircleQuestion, CheckSquare, ArrowUpRight } from "lucide-react";
import { useCardEffects } from "@/hooks/useCardEffects";

const features = [
  {
    icon: <FileText size={18} />,
    title: "Developer Posts",
    description: "Write structured technical articles and build a public archive that reflects your growth as a developer.",
    tag: "Write & Share",
  },
  {
    icon: <Code2 size={18} />,
    title: "Snippet Library",
    description: "Store reusable components, utilities, and algorithm solutions — access them instantly whenever you need.",
    tag: "Save & Reuse",
  },
  {
    icon: <MessageCircleQuestion size={18} />,
    title: "Community Q&A",
    description: "Ask meaningful questions and collaborate in focused technical discussions with real developers.",
    tag: "Ask & Answer",
  },
  {
    icon: <CheckSquare size={18} />,
    title: "Task Tracking",
    description: "Manage development tasks and track progress with an engineer-focused workflow built for real projects.",
    tag: "Plan & Track",
  },
];

interface FeatureCardProps {
  f: typeof features[number];
  i: number;
  skewY: any;
}

function FeatureCard({ f, i, skewY }: FeatureCardProps) {
  const { ref, rotateX, rotateY, spotlightX, spotlightY, spotlightOpacity, handlers } = useCardEffects(10);
  const spotlightBg = useMotionTemplate`radial-gradient(180px circle at ${spotlightX}px ${spotlightY}px, rgba(239, 68, 68, 0.12), transparent 80%)`;

  return (
    <motion.div
      ref={ref}
      {...handlers}
      initial={{ opacity: 0, y: 30, rotateX: 10, rotateY: -10, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        type: "spring",
        stiffness: 70,
        damping: 16,
        mass: 0.8,
        delay: i * 0.08,
      }}
      style={{
        transformPerspective: 1000,
        rotateX,
        rotateY,
        skewY,
      }}
      whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.25, ease: "easeOut" } }}
      className="group relative bg-[#0a0a0a] border border-white/[0.07] rounded-2xl p-6 flex flex-col gap-4 overflow-hidden cursor-default transition-colors duration-300 hover:border-red-500/20"
    >
      {/* Cursor Spotlight Layer */}
      <motion.div
        style={{ background: spotlightBg, opacity: spotlightOpacity }}
        className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300"
      />

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-red-500/5 via-transparent to-transparent rounded-2xl" />

      <div className="flex items-center justify-between">
        <div className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-red-400 group-hover:bg-red-500/10 group-hover:border-red-500/20 transition-all duration-300">
          {f.icon}
        </div>
        <ArrowUpRight size={14} className="text-white/15 group-hover:text-red-400/60 transition-colors" />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-white/85 mb-2 group-hover:text-white transition-colors">
          {f.title}
        </h3>
        <p className="text-xs text-white/35 leading-relaxed">
          {f.description}
        </p>
      </div>

      <div className="mt-auto pt-2 border-t border-white/[0.05]">
        <span className="text-[10px] font-mono tracking-widest uppercase text-white/20 group-hover:text-red-500/50 transition-colors">
          {f.tag}
        </span>
      </div>
    </motion.div>
  );
}

export default function FeatureGrid() {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const skewY = useTransform(scrollVelocity, [-2000, 2000], [-5, 5]);
  const skewYSpring = useSpring(skewY, { stiffness: 120, damping: 22 });

  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {features.map((f, i) => (
          <FeatureCard key={i} f={f} i={i} skewY={skewYSpring} />
        ))}
      </div>
    </div>
  );
}