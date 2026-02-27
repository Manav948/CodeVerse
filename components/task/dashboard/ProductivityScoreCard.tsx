"use client";

import { motion } from "framer-motion";

interface Props {
  score: number; // 0–100
  streak: number;
}

const ProductivityScoreCard = ({ score, streak }: Props) => {
  const normalizedScore = Math.max(0, Math.min(score, 100));

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="relative rounded-2xl border border-white/10 bg-black p-6 shadow-sm"
    >

      <div className="flex items-center justify-between">
        <h3 className="text-xs font-medium tracking-wider text-white/50 uppercase">
          Productivity Score
        </h3>

        <span className="text-xs text-white/40">
          Last 7 days
        </span>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-semibold text-white">
            {normalizedScore}
          </span>
          <span className="text-sm text-white/40">/ 100</span>
        </div>

        <div className="text-sm text-white/60">
          {streak} day streak
        </div>
      </div>

      <div className="mt-3 text-xs text-white/40">
        Based on completed tasks, consistency, and activity.
      </div>
    </motion.div>
  );
};

export default ProductivityScoreCard;