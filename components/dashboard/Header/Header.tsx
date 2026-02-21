"use client";

import { Bell, Plus, Search } from "lucide-react";
import { Button } from "../../ui/button";
import User from "./User";
import SidebarMobile from "@/components/sidebar/SidebarMobile";
import { usePathname, useRouter } from "next/navigation";
import { HeaderAction } from "@/lib/header-actions";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  const matched = HeaderAction.find((item) =>
    item.match(pathname)
  );

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
              className="
                h-10 w-full rounded-xl
                border border-white/10
                bg-white/5
                pl-9 pr-3 text-sm text-white
                placeholder:text-white/40
                focus:outline-none focus:ring-2 focus:ring-cyan-500/40
              "
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          {matched && (
            <Button
              onClick={() => router.push(matched.action.href)}
              className="
                h-10 rounded-xl
                bg-red-500/60 text-white
                px-3 md:px-3 flex items-center gap-2
              "
            >
              <matched.action.icon size={16} />
              <span className="hidden md:inline">
                {matched.action.label}
              </span>
            </Button>
          )}
          <button className="relative rounded-xl p-2 text-white/70 hover:bg-white/10">
            <Bell size={20} />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
          </button>

          <User />
        </div>
      </div>
    </header>
  );
};

export default Header;
