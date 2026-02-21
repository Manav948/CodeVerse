"use client";

import { Button } from "@/components/ui/button";
import {
  HomeIcon,
  LayoutDashboard,
  CalendarDaysIcon,
  CheckSquare,
  MousePointerSquareDashedIcon,
} from "lucide-react";
import { ActiveSection } from "./SidebarContainer";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

interface Props {
  active: ActiveSection;
  setActive: (v: ActiveSection) => void;
}

const Sidebar = ({ active, setActive }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const items = useMemo(
    () => [
      { key: "home", icon: HomeIcon, route: "/task" },
      { key: "tasks", icon: CheckSquare, route: "/task" },
      { key: "calendar", icon: CalendarDaysIcon, route: "/calendar" },
      { key: "dashboard", icon: LayoutDashboard, route: "/dashboard" },
      { key: "media", icon: MousePointerSquareDashedIcon, route: "/media" },
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
    <div className="flex w-16 flex-col items-center gap-4 border-r border-white/10 bg-black py-6">
      {items.map(({ key, icon: Icon, route }) => {
        const isActive = currentActive === key;

        return (
          <Button
            key={key}
            variant="ghost"
            size="icon"
            onClick={() =>
              handleNavigation(
                key as ActiveSection,
                route
              )
            }
            className={cn(
              "rounded-xl transition-all duration-200 hover:bg-muted",
              isActive &&
                "bg-red-500/60 text-primary-foreground shadow-md"
            )}
          >
            <Icon size={18} />
          </Button>
        );
      })}
    </div>
  );
};

export default Sidebar;