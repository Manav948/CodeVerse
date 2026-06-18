"use client";

import Counter from "../ui/Counter";
import { motion } from "framer-motion";
import { CheckCircle, Zap, ArrowRight } from "lucide-react";

const feed = [
  { icon: <CheckCircle size={13} />, text: "Rahul published a new React Post", time: "Just now", color: "text-green-400", bg: "bg-green-500/10 border-green-500/15" },
  { icon: <Zap size={13} />, text: "Ayesha shared a TypeScript Snippet", time: "2m ago", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/15" },
  { icon: <Zap size={13} />, text: "Vikram reached 15 day streak", time: "5m ago", color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/15" },
  { icon: <CheckCircle size={13} />, text: "Priya answered a Q&A thread", time: "8m ago", color: "text-green-400", bg: "bg-green-500/10 border-green-500/15" },
  { icon: <CheckCircle size={13} />, text: "Arjun completed 5 tasks today", time: "12m ago", color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/15" },
];

const stats = [
  { value: 15000, label: "Active Developers", suffix: "+" },
  { value: 3200, label: "Weekly Contributions", suffix: "+" },
  { value: 48, label: "Countries", suffix: "" },
  { value: 94, label: "Satisfaction Rate", suffix: "%" },
];

export default function CommunitySection() {
  return (
    <section className="relative w-full bg-black text-white py-28 px-6 overflow-hidden">
     
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative">

        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 80, damping: 18, mass: 0.8 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <span className="inline-block text-xs font-mono tracking-[0.2em] uppercase text-red-500/70 mb-4">
              Community
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              Join a Thriving{" "}
              <span className="text-red-500">Community</span>
            </h2>
          </div>
          <p className="text-white/40 max-w-sm text-sm leading-relaxed md:text-right">
            Thousands of developers are publishing posts,
            solving problems, and growing publicly inside CodeVerse.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 90, damping: 14, delay: i * 0.08 }}
              className="bg-[#080808] border border-white/[0.07] rounded-2xl px-5 py-5"
            >
              <div className="text-2xl font-black text-white mb-1">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-xs text-white/30">{stat.label}</p>
            </motion.div>
          ))}
        </div>

       
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 70, damping: 18, delay: 0.1 }}
          className="bg-[#080808] border border-white/[0.07] rounded-2xl overflow-hidden"
        >
          <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.05]">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-mono tracking-widest uppercase text-white/30">Live Activity</span>
          </div>

          <div className="divide-y divide-white/[0.04]">
            {feed.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: i * 0.07 }}
                className="flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-lg border flex items-center justify-center flex-shrink-0 ${item.bg} ${item.color}`}>
                    {item.icon}
                  </div>
                  <p className="text-xs text-white/55">{item.text}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-white/20 font-mono flex-shrink-0">{item.time}</span>
                  <ArrowRight size={11} className="text-white/10 group-hover:text-white/30 transition-colors flex-shrink-0" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}