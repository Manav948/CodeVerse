"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import AppSidebar from "./AppSidebar";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { ActiveSection } from "../task/sidebar/SidebarContainer";
import TaskSidebar from "../task/sidebar/Sidebar";

const SidebarMobile = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeTask, setActiveTask] = useState<ActiveSection>("tasks");

  const isTaskRoute = pathname.startsWith("/task");

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="lg:hidden text-white/60 hover:text-white hover:bg-white/[0.05]"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className={`p-0 border-white/[0.06] bg-[#070708] text-white overflow-hidden ${
          isTaskRoute ? "w-[72px]" : "w-72"
        }`}
      >
        {isTaskRoute ? (
          <TaskSidebar active={activeTask} setActive={setActiveTask} />
        ) : (
          <div className="h-full overflow-y-auto">
            <AppSidebar collapsed={false} />
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default SidebarMobile;