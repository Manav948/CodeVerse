"use client";

import { motion } from "framer-motion";

interface Props {
  title: string;
  value: string | number;
}

const StatCard = ({ title, value }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="
        relative
        rounded-2xl
        border border-white/10
        bg-black
        p-3
        backdrop-blur-xl
        overflow-hidden
        group
      "
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-linear-to-r from-purple-500/10 via-cyan-500/10 to-purple-500/10 blur-xl" />

      <div className="relative z-10">
        <p className="text-sm text-white/50 mb-2 tracking-wide">
          {title}
        </p>

        <h2 className="text-3xl font-bold text-red-500/80 bg-clip-text">
          {value}
        </h2>
      </div>
    </motion.div>
  );
};

export default StatCard;