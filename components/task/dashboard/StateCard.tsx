"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface Props {
  title: string;
  value: string | number;
  trend?: string;
  trendDirection?: "up" | "down" | "neutral";
  sparklineData?: number[];
  accentColor?: string;
}

const StatCard = ({
  title,
  value,
  trend,
  trendDirection = "neutral",
  sparklineData = [10, 15, 8, 12, 18, 13, 20],
  accentColor = "#ef4444",
}: Props) => {
  const width = 80;
  const height = 28;

  const getSparklinePath = (points: number[]) => {
    if (!points || points.length < 2) return "";
    const max = Math.max(...points);
    const min = Math.min(...points);
    const range = max - min === 0 ? 1 : max - min;

    return points
      .map((val, i) => {
        const x = (i / (points.length - 1)) * width;
        
        const y = 2 + (height - 4) - ((val - min) / range) * (height - 4);
        return `${i === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");
  };

  const path = getSparklinePath(sparklineData);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden rounded-xl border border-white/5 bg-[#111111] p-5 shadow-sm hover:border-white/10 transition-colors duration-250 flex items-center justify-between"
    >
      <div className="space-y-2.5">
        <p className="text-xs font-medium text-white/40 tracking-tight">
          {title}
        </p>

        <div className="flex items-baseline gap-2">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            {value}
          </h2>
        </div>

        {trend && (
          <div className="flex items-center gap-1.5 mt-1.5">
            <span
              className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium font-mono
                ${
                  trendDirection === "up"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : trendDirection === "down"
                    ? "bg-rose-500/10 text-rose-400"
                    : "bg-white/5 text-white/45"
                }
              `}
            >
              {trendDirection === "up" && <TrendingUp size={10} />}
              {trendDirection === "down" && <TrendingDown size={10} />}
              {trendDirection === "neutral" && <Minus size={10} />}
              {trend}
            </span>
          </div>
        )}
      </div>

      
      {path && (
        <div className="shrink-0 pl-4">
          <svg width={width} height={height} className="overflow-visible">
          
            <defs>
              <linearGradient id={`sparklineGrad-${title.replace(/\s+/g, "")}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={accentColor} stopOpacity={0.15} />
                <stop offset="100%" stopColor={accentColor} stopOpacity={0} />
              </linearGradient>
            </defs>

            
            <path
              d={`${path} L ${width} ${height} L 0 ${height} Z`}
              fill={`url(#sparklineGrad-${title.replace(/\s+/g, "")})`}
              className="opacity-70"
            />

            <path
              d={path}
              fill="none"
              stroke={accentColor}
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </motion.div>
  );
};

export default StatCard;