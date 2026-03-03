"use client";

import { motion } from "framer-motion";

interface FeatureItem {
  title: string;
  description: string;
}

const features: FeatureItem[] = [
  {
    title: "Developer Posts",
    description:
      "Write structured technical articles and build a public archive that reflects your growth.",
  },
  {
    title: "Snippet Library",
    description:
      "Store reusable components and utilities in an organized system built for speed.",
  },
  {
    title: "Community Q&A",
    description:
      "Ask meaningful questions and collaborate in focused technical discussions.",
  },
  {
    title: "Task Tracking",
    description:
      "Manage development tasks and track progress with an engineer-focused workflow.",
  },
];

export default function FeatureTimeline() {
  return (
    <section className="relative w-full bg-black text-white py-20 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-100 h-100 bg-red-600/10 blur-[100px] pointer-events-none" />
      <div className="max-w-5xl mx-auto relative">

        {/*  Vertical Line */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-px bg-white/10" />

        <div className="space-y-4">

          {features.map((feature, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative grid md:grid-cols-2 items-center"
              >
                <div className="hidden md:block absolute left-1/2 -translate-x-1/2">
                  <div className="h-3 w-3 rounded-full bg-white/80" />
                </div>

                <div
                  className={`relative ${
                    isLeft
                      ? "md:pr-14 md:text-right"
                      : "md:col-start-2 md:pl-14"
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="inline-block bg-black border border-white/10 rounded-xl p-6 transition hover:border-purple-500/30"
                  >
                    <h3 className="text-lg font-semibold mb-3">
                      {feature.title}
                    </h3>

                    <p className="text-white/60 text-sm leading-relaxed max-w-sm">
                      {feature.description}
                    </p>
                  </motion.div>
                </div>

                <div className="hidden md:block" />
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}