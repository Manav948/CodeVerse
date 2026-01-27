"use client";
import { Bell, Plus, Search } from "lucide-react";
import { Button } from "../../ui/button";
import User from "./User";

const Header = () => {

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

        <div className="relative w-full max-w-sm">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
          />
          <input
            type="text"
            placeholder="Search..."
            className="h-10 w-full rounded-xl border border-white/10 bg-white/5 pl-9 pr-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
          />
        </div>

        <div className="flex items-center gap-5">

          <Button className="h-10 gap-2 rounded-xl bg-linear-to-r from-purple-500 to-cyan-500 text-white hover:opacity-90">
            <Plus size={16} />
            Create
          </Button>

          <button className="relative rounded-xl p-2 text-white/70 hover:bg-white/10">
            <Bell size={18} />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
          </button>

          <User />
        </div>
      </div>
    </header>
  );
};

export default Header;
