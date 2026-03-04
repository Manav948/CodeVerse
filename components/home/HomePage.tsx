"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import { motion, Variants } from "framer-motion";

import Header from "./Header";
import Footer from "./Footer";
import Hero from "./HomeSection";
import FeatureBlock from "./Feature";
import Slider from "./Slider";
import ImageCarousel from "./Carousel";
import GamifiedSection from "./FieldSection";
import CommunitySection from "./CommunitySection";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 70 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const HomePage = () => {

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative w-full min-h-screen bg-black text-white overflow-x-hidden">

      <Header />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <Hero />
      </motion.div>

      <motion.div
        className="mt-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        variants={fadeUp}
      >
        <Slider />
      </motion.div>

      <section className="py-24 px-6">
        <motion.div
          className="max-w-6xl mx-auto text-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={fadeUp}
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Features of CodeVerse
          </h2>

          <p className="mt-6 text-white/60 max-w-2xl mx-auto">
            Everything you need to build your public developer identity —
            from writing posts to managing tasks in one unified ecosystem.
          </p>
        </motion.div>

        <FeatureBlock />
      </section>

      <section className="py-24 px-6">
        <motion.div
          className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={fadeUp}
        >
          <ImageCarousel
            images={[
              "/Post1.png",
              "/Post2.png",
              "/Task4.png",
            ]}
            height="h-80"
          />

          <div>
            <h3 className="text-3xl font-semibold mb-6">
              Write and Publish Developer Posts
            </h3>

            <p className="text-white/60 leading-relaxed text-lg">
              Share your learning journey, publish technical deep-dives,
              and build a structured archive of your development experience.
              CodeVerse gives you a clean and focused environment
              to express your knowledge publicly.
            </p>
          </div>
        </motion.div>
      </section>

      <section className="py-24 px-6">
        <motion.div
          className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={fadeUp}
        >
          <div>
            <h3 className="text-3xl font-semibold mb-6">
              Snippet Library
            </h3>

            <p className="text-white/60 leading-relaxed text-lg">
              Save and organize your most valuable code pieces in one structured
              snippet system. Whether it's reusable components, utility functions,
              or algorithm solutions — access them instantly whenever you need.
            </p>

            <p className="mt-6 text-white/50 leading-relaxed">
              CodeVerse helps you build a personal developer toolkit that grows
              alongside your experience and makes your workflow faster and smarter.
            </p>
          </div>

          <ImageCarousel
            images={[
              "/Snippet1.png",
              "/Snippet2.png",
              "/Task4.png",
            ]}
            height="h-80"
          />
        </motion.div>
      </section>

      <section className="py-24 px-6">
        <motion.div
          className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={fadeUp}
        >
          <ImageCarousel
            images={[
              "/Task1.png",
              "/Task2.png",
              "/Task3.png",
              "/Task4.png",
            ]}
            height="h-80"
          />

          <div>
            <h3 className="text-3xl font-semibold mb-6">
              Task Management for Developers
            </h3>

            <p className="text-white/60 leading-relaxed text-lg">
              Plan your development goals, break down complex features into tasks,
              and track progress with clarity. Stay organized and focused while
              building real-world projects.
            </p>

            <p className="mt-6 text-white/50 leading-relaxed">
              CodeVerse gives you a structured workflow tailored for engineers —
              helping you stay consistent, productive, and goal-driven.
            </p>
          </div>
        </motion.div>
      </section>

      <GamifiedSection />
      <CommunitySection />
      <Footer />
    </main>
  );
};

export default HomePage;