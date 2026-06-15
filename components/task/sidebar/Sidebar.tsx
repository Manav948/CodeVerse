"use client";

import {
  HomeIcon,
  LayoutDashboard,
  CalendarDaysIcon,
  CheckSquare,
} from "lucide-react";
import { ActiveSection } from "./SidebarContainer";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

interface Props {
  active: ActiveSection;
  setActive: (v: ActiveSection) => void;
  isMobile?: boolean;
}

const Sidebar = ({ active, setActive, isMobile = false }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const items = useMemo(
    () => [
      { key: "home", icon: HomeIcon, route: "/task/dashboard" },
      { key: "tasks", icon: CheckSquare, route: "/task" },
      { key: "calendar", icon: CalendarDaysIcon, route: "/calendar" },
      { key: "dashboard", icon: LayoutDashboard, route: "/dashboard" },
    ] as const,
    []
  );

  const currentActive = useMemo(() => {
    const matched = items.find((item) =>
      pathname.startsWith(item.route)
    );
    return matched?.key ?? active;
  }, [pathname, items, active]);

  const handleNavigation = (
    key: ActiveSection,
    route: string
  ) => {
    setActive(key);
    if (pathname !== route) {
      router.push(route);
    }
  };

  return (
    <div
      className={cn(
        "flex h-full flex-col items-center gap-4 bg-[#090909] py-6",
        !isMobile && "border-r border-white/5",
        isMobile ? "w-full" : "w-16"
      )}
    >
      {items.map(({ key, icon: Icon, route }) => {
        const isActive = currentActive === key;

        return (
          <button
            key={key}
            onClick={() =>
              handleNavigation(
                key as ActiveSection,
                route
              )
            }
            className={cn(
              "w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200 cursor-pointer outline-none border border-transparent",
              isActive
                ? "bg-red-500 text-white shadow-[0_0_12px_rgba(239,68,68,0.25)]"
                : "text-white/40 hover:text-white/80 hover:bg-white/5"
            )}
          >
            <Icon size={18} />
          </button>
        );
      })}
    </div>
  );
};

export default Sidebar;