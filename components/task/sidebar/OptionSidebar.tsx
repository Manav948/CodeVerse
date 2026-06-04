"use client";

import { ActiveSection } from "./SidebarContainer";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import ShowInSidebar from "../ShowInSidebar";

interface Props {
  active: ActiveSection;
}

const OptionSidebar = ({ active }: Props) => {
  const router = useRouter();

  return (
    <div className="w-64 h-full border-r border-white/5 bg-[#090909] p-6 text-white flex flex-col space-y-6">
      <h1 className="text-xs font-mono uppercase tracking-wider text-white/40">
        {active}
      </h1>

      {active === "tasks" && (
        <div className="space-y-6">
          <button
            className="w-full h-9 rounded-lg bg-red-500 hover:bg-red-600 text-white flex items-center justify-center gap-2 text-xs font-medium shadow-[0_0_15px_rgba(239,68,68,0.1)] transition-all cursor-pointer border border-transparent outline-none"
            onClick={() =>
              router.push("/task/new")
            }
          >
            <Plus size={14} />
            <span>New Task</span>
          </button>

          <Separator className="bg-white/5" />

          <div className="space-y-2 text-sm text-white/70">
           <ShowInSidebar />
          </div>
        </div>
      )}

      {active === "dashboard" && (
        <div className="space-y-2 text-xs text-white/60">
          <button
            onClick={() =>
              router.push("/dashboard/analytics")
            }
            className="block w-full text-left py-2 px-3 rounded-lg hover:text-white hover:bg-white/5 transition-all cursor-pointer border border-transparent outline-none"
          >
            Overview
          </button>

          <button className="block w-full text-left py-2 px-3 rounded-lg hover:text-white hover:bg-white/5 transition-all cursor-pointer border border-transparent outline-none">
            Productivity
          </button>

          <button className="block w-full text-left py-2 px-3 rounded-lg hover:text-white hover:bg-white/5 transition-all cursor-pointer border border-transparent outline-none">
            Activity
          </button>
        </div>
      )}

      {active === "home" && (
        <div className="text-xs font-mono text-white/40">
          Welcome Home
        </div>
      )}
    </div>
  );
};

export default OptionSidebar;