"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import OptionSidebar from "./OptionSidebar";


const SidebarMobile = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="md:hidden text-white"
        >
          <Menu size={20} />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-72 border-white/10 bg-[#020617] text-white"
      >
        {/* Brand */}
        <div className="mb-6 flex items-center gap-2">
          <div className="h-10 w-10 rounded-xl bg-linear-to-br from-purple-500 to-cyan-500" />
          <h1
            className="
              text-lg font-bold
              bg-linear-to-r from-purple-400 via-cyan-400 to-purple-400
              bg-size-[200%_200%]
              bg-clip-text text-transparent
              animate-gradient
            "
          >
            Code Verse
          </h1>
        </div>

        <OptionSidebar />
      </SheetContent>
    </Sheet>
  );
};

export default SidebarMobile;
