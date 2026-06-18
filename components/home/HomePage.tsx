"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import { motion, Variants, useScroll, useSpring, useVelocity, useTransform, useMotionTemplate } from "framer-motion";
import {
  FileText, Code2, MessageCircleQuestion, CheckSquare,
  ArrowUpRight, Terminal, Layers, Cpu, Globe
} from "lucide-react";

import Header from "./Header";
import Footer from "./Footer";
import Hero from "./HomeSection";
import FeatureBlock from "./Feature";
import Slider from "./Slider";
import ImageCarousel from "./Carousel";
import GamifiedSection from "./FieldSection";
import CommunitySection from "./CommunitySection";
import { useCardEffects } from "@/hooks/useCardEffects";


const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 15,
      mass: 0.8,
    },
  },
};

const blurFade: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 55,
      damping: 14,
      mass: 0.8,
    },
  },
};

const maskReveal: Variants = {
  hidden: { opacity: 0, y: 40, clipPath: "inset(100% 0 0 0)" },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0 0 0)",
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 14,
      mass: 0.9,
    },
  },
};

const skewIn = (i: number): Variants => ({
  hidden: { opacity: 0, y: 35, skewX: -3, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    skewX: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 16,
      mass: 0.8,
      delay: i * 0.08,
    },
  },
});



const showcaseItems = [
  {
    tag: "01 / Posts",
    heading: "Write and Publish Developer Posts",
    body: "Share your learning journey, publish technical deep-dives, and build a structured archive of your development experience. CodeVerse gives you a clean and focused environment to express your knowledge publicly.",
    sub: "Build your public developer identity one post at a time.",
    images: ["/Post1.png", "/Post2.png", "/Task4.png"],
    accentColor: "text-red-400",
    borderColor: "border-red-500/20",
    icon: <FileText size={16} />,
  },
  {
    tag: "02 / Snippets",
    heading: "Snippet Library",
    body: "Save and organize your most valuable code pieces in one structured snippet system. Whether it's reusable components, utility functions, or algorithm solutions — access them instantly whenever you need.",
    sub: "CodeVerse helps you build a personal developer toolkit that grows alongside your experience.",
    images: ["/Snippet1.png", "/Snippet2.png", "/Task4.png"],
    accentColor: "text-orange-400",
    borderColor: "border-orange-500/20",
    icon: <Code2 size={16} />,
  },
  {
    tag: "03 / Tasks",
    heading: "Task Management for Developers",
    body: "Plan your development goals, break down complex features into tasks, and track progress with clarity. Stay organized and focused while building real-world projects.",
    sub: "Stay consistent, productive, and goal-driven with a workflow built for engineers.",
    images: ["/Task1.png", "/Task2.png", "/Task3.png", "/Task4.png"],
    accentColor: "text-blue-400",
    borderColor: "border-blue-500/20",
    icon: <CheckSquare size={16} />,
  },
];

const whyItems = [
  { icon: <Terminal size={18} />, title: "Built for Developers", desc: "Every feature is designed around how real engineers actually work — not generic productivity tools." },
  { icon: <Layers size={18} />, title: "All-in-One Ecosystem", desc: "Posts, snippets, Q&A, and tasks — stop juggling multiple platforms and build in one place." },
  { icon: <Cpu size={18} />, title: "Public by Default", desc: "Your work is discoverable. Build a reputation by sharing your knowledge openly with the community." },
  { icon: <Globe size={18} />, title: "Global Community", desc: "Connect with developers across 48+ countries who are serious about growing publicly." },
];


const VP = { once: true, margin: "-80px" } as const;

interface ShowcaseCardProps {
  item: typeof showcaseItems[number];
  idx: number;
  skewY: any;
}

function ShowcaseCard({ item, idx, skewY }: ShowcaseCardProps) {
  const { ref, rotateX, rotateY, spotlightX, spotlightY, spotlightOpacity, handlers } = useCardEffects(5); // Gentle tilt for large cards
  
  const glowColor = item.tag.includes("Posts") 
    ? "rgba(239, 68, 68, 0.12)" // Red
    : item.tag.includes("Snippets")
    ? "rgba(249, 115, 22, 0.12)" // Orange
    : "rgba(59, 130, 246, 0.12)"; // Blue

  const spotlightBg = useMotionTemplate`radial-gradient(350px circle at ${spotlightX}px ${spotlightY}px, ${glowColor}, transparent 80%)`;

  return (
    <motion.div
      ref={ref}
      {...handlers}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={fadeUp}
      style={{
        transformPerspective: 1200,
        rotateX,
        rotateY,
        skewY,
      }}
      className="group relative bg-[#080808] border border-white/[0.07] rounded-3xl overflow-hidden hover:border-white/[0.12] transition-colors duration-300"
    >
      {/* Spotlight cursor glow overlay */}
      <motion.div
        style={{ background: spotlightBg, opacity: spotlightOpacity }}
        className="absolute inset-0 pointer-events-none rounded-3xl transition-opacity duration-300"
      />

      <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${item.borderColor.replace("border-", "via-")} to-transparent opacity-60`} />

      <div className={`grid md:grid-cols-2 gap-0 min-h-[340px] ${idx % 2 !== 0 ? "md:[&>*:first-child]:order-2" : ""}`}>

        <div className="flex flex-col justify-center p-10 lg:p-14">
          <span className={`inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] uppercase ${item.accentColor} mb-6`}>
            <span className="flex items-center justify-center w-5 h-5 rounded bg-white/[0.05] border border-white/[0.08]">
              {item.icon}
            </span>
            {item.tag}
          </span>
          <h3 className="text-2xl md:text-3xl font-bold mb-5 leading-snug tracking-tight">{item.heading}</h3>
          <p className="text-sm text-white/45 leading-relaxed mb-4">{item.body}</p>
          <p className="text-xs text-white/25 leading-relaxed italic">{item.sub}</p>
          <button className={`mt-8 self-start flex items-center gap-2 text-xs font-mono tracking-widest uppercase ${item.accentColor} hover:opacity-70 transition-opacity group/btn`}>
            Learn more
            <ArrowUpRight size={13} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        <div className={`relative border-white/[0.05] overflow-hidden ${idx % 2 !== 0 ? "md:border-r" : "md:border-l"}`}>
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="w-full h-full">
              <ImageCarousel images={item.images} height="h-full" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const HomePage = () => {
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scrollVelocity = useVelocity(scrollY);
  const skewY = useTransform(scrollVelocity, [-2500, 2500], [-3, 3]);
  const skewYSpring = useSpring(skewY, { stiffness: 120, damping: 22 });

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      syncTouch: true,
    });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const id = requestAnimationFrame(raf);

    const handleResize = () => {
      lenis.resize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(id);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <main className="relative w-full min-h-screen bg-black text-white overflow-x-hidden">
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-400 via-purple-500 to-red-500 origin-left z-50 pointer-events-none"
      />

      <Header />
      <Hero />
      <Slider />

      <section className="py-24 px-6">
        <motion.div
          className="max-w-6xl mx-auto text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={VP}
          variants={blurFade}
        >
          <span className="inline-block text-xs font-mono tracking-[0.2em] uppercase text-red-500/70 mb-4">
            What you get
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Features of CodeVerse
          </h2>
          <p className="mt-5 text-white/40 max-w-xl mx-auto text-sm leading-relaxed">
            Everything you need to build your public developer identity —
            from writing posts to managing tasks in one unified ecosystem.
          </p>
        </motion.div>

        <FeatureBlock />
      </section>

      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {showcaseItems.map((item, idx) => (
            <ShowcaseCard key={idx} item={item} idx={idx} skewY={skewYSpring} />
          ))}
        </div>
      </section>


      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12 overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={VP}
            variants={maskReveal}
          >
            <span className="inline-block text-xs font-mono tracking-[0.2em] uppercase text-red-500/70 mb-4">
              Why CodeVerse
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Built different, <span className="text-red-500">by design.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {whyItems.map((item, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={skewIn(i)}
                className="group bg-[#080808] border border-white/[0.07] rounded-2xl p-7 hover:border-white/[0.12] transition-colors duration-300"
              >
                <div className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/15 flex items-center justify-center text-red-400 mb-5 group-hover:bg-red-500/15 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-sm font-semibold text-white/85 mb-3">{item.title}</h3>
                <p className="text-xs text-white/35 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <GamifiedSection />
      <CommunitySection />
      <Footer />
    </main>
  );
};

export default HomePage;