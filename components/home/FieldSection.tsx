"use client";

import { motion } from "framer-motion";
import { Trophy, Flame, Medal } from "lucide-react";

export default function GamifiedSection() {
  return (
    <section className="relative w-full bg-black text-white py-32 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-175 h-175 bg-red-600/10 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-125 h-125 bg-red-500/10 blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">

        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Gamified{" "}
            <span className="bg-linear-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              Growth
            </span>
          </h2>

          <p className="mt-6 text-white/60 max-w-2xl mx-auto text-lg">
            Turn your development journey into measurable progress.
            Build streaks, earn recognition, and climb the ranks.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">

          <motion.div
            whileHover={{ y: -6 }}
            className="relative rounded-3xl border border-white/10 
                       bg-black backdrop-blur-xl p-8 
                       shadow-2xl shadow-purple-900/20
                       hover:border-purple-500/40 transition"
          >
            <Trophy className="text-yellow-400 mb-6" size={30} />

            <h3 className="text-xl font-semibold mb-8">
              Developer Leaderboard
            </h3>

            <div className="space-y-5 text-sm">
              {[
                ["Rahul Dev", "12,540"],
                ["Ayesha Patel", "11,320"],
                ["Vikram Shah", "10,870"],
              ].map((user, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center bg-white/5 px-4 py-3 rounded-xl"
                >
                  <span className="text-white/80">
                    #{i + 1} {user[0]}
                  </span>
                  <span className="text-red-500 font-medium">
                    {user[1]}
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-8 text-xs text-white/40">
              Compete globally and showcase your consistency.
            </p>
          </motion.div>

          {/* STREAK */}
          <motion.div
            whileHover={{ y: -6 }}
            className="relative rounded-3xl border border-white/10 
                       bg-black  backdrop-blur-xl p-8 
                       shadow-2xl shadow-orange-900/20
                       hover:border-orange-500/40 transition"
          >
            <Flame className="text-orange-400 mb-6" size={30} />

            <h3 className="text-xl font-semibold mb-4">
              Contribution Streak
            </h3>

            <p className="text-5xl font-bold mb-2 bg-linear-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              47
            </p>

            <p className="text-white/60 text-sm mb-8">
              Days of consistent posting & learning.
            </p>

            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 28 }).map((_, i) => (
                <div
                  key={i}
                  className="h-3 w-3 rounded-sm bg-red-500 opacity-80"
                />
              ))}
            </div>

            <p className="mt-8 text-xs text-white/40">
              Don’t break the chain.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -6 }}
            className="relative rounded-3xl border border-white/10 
                       bg-black backdrop-blur-xl p-8 
                       shadow-2xl shadow-green-900/20
                       hover:border-green-500/40 transition"
          >
            <Medal className="text-green-400 mb-6" size={30} />

            <h3 className="text-xl font-semibold mb-8">
              Earn Badges
            </h3>

            <div className="flex gap-6 mb-8">
              {["🏅", "🚀", "💎"].map((badge, i) => (
                <div
                  key={i}
                  className="h-14 w-14 rounded-full 
                             bg-linear-to-br from-purple-500/20 to-cyan-500/20
                             border border-white/10 
                             flex items-center justify-center 
                             text-xl
                             shadow-lg"
                >
                  {badge}
                </div>
              ))}
            </div>

            <p className="text-white/60 text-sm leading-relaxed">
              Unlock achievements by publishing posts, solving
              questions, and maintaining streaks.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}