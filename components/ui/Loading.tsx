import React from "react";
import { cn } from "@/lib/utils";

interface LoaderProps {
  className?: string;
}

const Loader = ({ className }: LoaderProps) => {
  return (
    <div className={cn("flex items-center justify-center p-4", className)}>
      <div className="relative w-full max-w-[290px] sm:max-w-[360px] overflow-hidden rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-md shadow-2xl">
      
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

  
        <div className="flex items-center gap-4">
          <div className="h-11 w-11 shrink-0 rounded-full bg-white/10 animate-pulse-gentle" />

          {/* Pulsing Text Block Skeletons */}
          <div className="flex-1 space-y-2.5">
            <div className="h-3.5 w-2/3 rounded-md bg-white/10 animate-pulse-gentle" />
            <div className="h-2.5 w-full rounded-md bg-white/5 animate-pulse-gentle" />
          </div>
        </div>

        {/* Glowing Tech Accent Dot */}
        <div className="absolute right-5 top-5 h-2 w-2 rounded-full bg-cyan-500/60 shadow-[0_0_8px_rgba(6,182,212,0.6)] animate-pulse" />
      </div>
    </div>
  );
};

export default Loader;
