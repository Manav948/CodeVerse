"use client";

import { Bell, Search } from "lucide-react";
import { Button } from "../../ui/button";
import User from "./User";
import SidebarMobile from "@/components/sidebar/SidebarMobile";
import { usePathname, useRouter } from "next/navigation";
import { HeaderAction } from "@/lib/header-actions";
import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Notification from "@/components/notification/Notification";
import clsx from "clsx";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const matched = HeaderAction.find((item) =>
    item.match(pathname)
  );

  const { data } = useQuery({
    queryKey: ["notification"],
    queryFn: async () => {
      const res = await axios.get("/api/notification/get");
      return res.data;
    },
  });

  const unreadCount =
    data?.filter((n: any) => !n.isRead).length || 0;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

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

        <div className="flex items-center gap-3 relative" ref={dropdownRef}>

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

          <button
            onClick={() => setOpen((prev) => !prev)}
            className="relative rounded-xl p-2 text-white/70 hover:bg-white/10 transition"
          >
            <Bell size={20} />

            {unreadCount > 0 && (
              <span
                className={clsx(
                  "absolute -top-1 -right-1 min-w-4 h-4",
                  "flex items-center justify-center text-[10px]",
                  "rounded-full bg-red-500 text-white font-semibold px-1"
                )}
              >
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          <User />

          {open && (
            <div className="absolute right-0 top-14 w-80 max-h-125 overflow-y-auto rounded-2xl border border-white/10 bg-black/90 backdrop-blur-xl shadow-2xl z-50">
              <Notification close={() => setOpen(false)} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;