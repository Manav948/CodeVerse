"use client";

import { Button } from "@/components/ui/button";
import {
  HomeIcon,
  LayoutDashboard,
  CalendarDaysIcon,
  CheckSquare,
} from "lucide-react";
import { ActiveSection } from "./SidebarContainer";
import { cn } from "@/lib/utils";

interface Props {
  active: ActiveSection;
  setActive: (v: ActiveSection) => void;
}

const Sidebar = ({ active, setActive }: Props) => {
  const items = [
    { key: "home", icon: HomeIcon },
    { key: "tasks", icon: CheckSquare },
    { key: "calendar", icon: CalendarDaysIcon },
    { key: "dashboard", icon: LayoutDashboard },
  ] as const;

  return (
    <div className="flex w-16 flex-col items-center gap-4 border-r border-white/10 bg-black/50 py-6">
      {items.map(({ key, icon: Icon }) => (
        <Button
          key={key}
          variant="ghost"
          size="icon"
          onClick={() => setActive(key)}
          className={cn(
            "rounded-xl transition-all",
            active === key &&
              "bg-red-500/60 text-white"
          )}
        >
          <Icon size={18} />
        </Button>
      ))}
    </div>
  );
};

export default Sidebar;