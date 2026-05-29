"use client";

import { Bell, Search } from "lucide-react";
import { Button } from "../../ui/button";
import User from "./User";
import SidebarMobile from "@/components/sidebar/SidebarMobile";
import { usePathname, useRouter } from "next/navigation";
import { HeaderAction } from "@/lib/header-actions";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Notification from "@/components/notification/Notification";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [lastViewed, setLastViewed] = useState<number>(0);

  const matched = HeaderAction.find((item) =>
    item.match(pathname)
  );

  // Load last viewed timestamp from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("notification_last_viewed");
    if (stored) {
      setLastViewed(Number(stored));
    }
  }, []);

  const { data } = useQuery({
    queryKey: ["notification"],
    queryFn: async () => {
      const res = await axios.get("/api/notification/get");
      return res.data;
    },
  });

  //  Only count NEW notifications
  const newCount =
    data?.filter(
      (n: any) =>
        new Date(n.created_at).getTime() > lastViewed
    ).length || 0;

  const handleOpenChange = (value: boolean) => {
    setOpen(value);

    if (value) {
      const now = Date.now();
      localStorage.setItem(
        "notification_last_viewed",
        now.toString()
      );
      setLastViewed(now);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4">

        <div className="flex flex-1 items-center gap-2">
          <div className="md:hidden">
            <SidebarMobile />
          </div>

          <div className="relative w-full max-w-xs md:max-w-sm">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
            />
            <input
              placeholder="Search..."
              className="h-10 w-full rounded-xl border border-white/10 bg-white/5 pl-9 pr-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">

          {matched && (
            <Button
              onClick={() => router.push(matched.action.href)}
              className="h-10 rounded-xl bg-red-500/60 text-white px-3 flex items-center gap-2"
            >
              <matched.action.icon size={16} />
              <span className="hidden md:inline">
                {matched.action.label}
              </span>
            </Button>
          )}

          <Popover open={open} onOpenChange={handleOpenChange}>
            <PopoverTrigger asChild>
              <button className="relative rounded-lg p-2 text-white/50 hover:text-white/80 hover:bg-white/[0.05] transition-all duration-150">
                <Bell size={18} />

                {newCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-[16px] flex items-center justify-center text-[9px] rounded-full bg-red-500/80 border border-black/60 text-white font-semibold px-[3px] leading-none">
                    {newCount > 9 ? "9+" : newCount}
                  </span>
                )}
              </button>
            </PopoverTrigger>

            <PopoverContent
              align="end"
              sideOffset={8}
              className="w-[380px] p-0 rounded-xl border border-white/[0.08] bg-[#111111] shadow-[0_8px_32px_rgba(0,0,0,0.55)] backdrop-blur-xl overflow-hidden"
            >
              <Notification close={() => setOpen(false)} />
            </PopoverContent>
          </Popover>

          <User />
        </div>
      </div>
    </header>
  );
};

export default Header;