"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AppSidebar from "./AppSidebar";
import { cn } from "@/lib/utils";

const SidebarContainer = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "relative hidden md:flex flex-col h-full transition-all duration-300 ease-in-out",
        collapsed ? "w-17" : "w-64"
      )}
    >
      <AppSidebar collapsed={collapsed} />

      <button
        onClick={() => setCollapsed((v) => !v)}
        className={cn(
          "absolute -right-3 top-18 z-10 h-6 w-6 rounded-full border border-white/10 bg-[#0d0d0e] flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 hover:bg-[#1a1a1c] transition-all duration-200 shadow-md shadow-black/40"
        )}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? (
          <ChevronRight size={11} />
        ) : (
          <ChevronLeft size={11} />
        )}
      </button>
    </div>
  );
};

export default SidebarContainer;
