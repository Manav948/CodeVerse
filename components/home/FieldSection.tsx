"use client";

import { motion } from "framer-motion";
import { Trophy, Flame, Medal, TrendingUp } from "lucide-react";

const leaderboard = [
  { name: "Rahul Dev", score: "12,540", rank: 1, change: "+2" },
  { name: "Ayesha Patel", score: "11,320", rank: 2, change: "+5" },
  { name: "Vikram Shah", score: "10,870", rank: 3, change: "—" },
];

const heatDays = Array.from({ length: 35 }, (_, i) => ({
  active: Math.random() > 0.35,
  intensity: Math.floor(Math.random() * 3) + 1,
}));

const badges = [
  { emoji: "🏅", label: "First Post" },
  { emoji: "🚀", label: "10-Day Streak" },
  { emoji: "💎", label: "Top Contributor" },
  { emoji: "⚡", label: "Speed Coder" },
];

export default function GamifiedSection() {
  return (
    <section className="relative w-full bg-black text-white py-32 px-6 overflow-hidden">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-red-600/6 blur-[180px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative">

        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 15 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-mono tracking-[0.2em] uppercase text-red-500/70 mb-4">
            Progress system
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Gamified{" "}
            <span className="text-red-500">Growth</span>
          </h2>
          <p className="mt-5 text-white/40 max-w-xl mx-auto text-sm leading-relaxed">
            Turn your development journey into measurable progress.
            Build streaks, earn recognition, and climb the ranks.
          </p>
        </motion.div>

       
        <div className="grid md:grid-cols-3 gap-4">

         
          
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="group relative bg-[#080808] border border-white/[0.07] rounded-2xl p-6 overflow-hidden hover:border-white/[0.12] transition-colors duration-300"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent" />

            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
                <Trophy size={15} className="text-yellow-400" />
              </div>
              <h3 className="text-sm font-semibold text-white/80">Developer Leaderboard</h3>
            </div>

            <div className="space-y-2">
              {leaderboard.map((user, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.05] rounded-xl px-4 py-3">
                  <span className="text-xs font-mono text-white/20 w-4">#{user.rank}</span>
                  <span className="flex-1 text-xs text-white/70">{user.name}</span>
                  <span className="text-xs text-red-400 font-medium font-mono">{user.score}</span>
                  <span className="text-[10px] text-white/25 font-mono">{user.change}</span>
                </div>
              ))}
            </div>

            <p className="mt-5 text-[10px] text-white/20 font-mono tracking-widest uppercase">
              Global rankings · Updated daily
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="group relative bg-[#080808] border border-white/[0.07] rounded-2xl p-6 overflow-hidden hover:border-white/[0.12] transition-colors duration-300"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />

            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                <Flame size={15} className="text-orange-400" />
              </div>
              <h3 className="text-sm font-semibold text-white/80">Contribution Streak</h3>
            </div>

            <div className="flex items-end gap-2 mb-1">
              <span className="text-5xl font-black text-white leading-none">47</span>
              <span className="text-sm text-orange-400 mb-1 font-mono">days</span>
            </div>
            <p className="text-xs text-white/30 mb-6">Days of consistent posting & learning.</p>

         
            <div className="grid grid-cols-7 gap-1">
              {heatDays.map((day, i) => (
                <div
                  key={i}
                  className={`h-3 w-full rounded-sm transition-colors ${
                    day.active
                      ? day.intensity === 3
                        ? "bg-red-500"
                        : day.intensity === 2
                        ? "bg-red-500/60"
                        : "bg-red-500/30"
                      : "bg-white/[0.04]"
                  }`}
                />
              ))}
            </div>

            <p className="mt-5 text-[10px] text-white/20 font-mono tracking-widest uppercase">
              Don't break the chain.
            </p>
          </motion.div>

       
          
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="group relative bg-[#080808] border border-white/[0.07] rounded-2xl p-6 overflow-hidden hover:border-white/[0.12] transition-colors duration-300"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />

            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <Medal size={15} className="text-red-400" />
              </div>
              <h3 className="text-sm font-semibold text-white/80">Earn Badges</h3>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {badges.map((badge, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.05] rounded-xl px-3 py-3">
                  <span className="text-xl">{badge.emoji}</span>
                  <span className="text-[11px] text-white/50 leading-tight">{badge.label}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-white/30 leading-relaxed">
              Unlock achievements by publishing posts, solving questions, and maintaining streaks.
            </p>

            <p className="mt-4 text-[10px] text-white/20 font-mono tracking-widest uppercase">
              12 badges available
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
