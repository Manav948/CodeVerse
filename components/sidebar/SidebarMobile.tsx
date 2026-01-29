"use client";

import { LogOut, Menu, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import OptionSidebar from "./OptionSidebar";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

const SidebarMobile = () => {
  const signInHandler = () => {
    window.location.href = "/dashboard/settings";
  };
  
  const logoutHandler = async () => {
    await signOut({ callbackUrl: "/sign-in" });
    toast.success("Logout SuccessFully")
  };

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
        className="flex w-72 flex-col border-white/10 bg-black text-white"
      >
        <div className="mb-6 mt-4 flex items-center gap-3 px-4">
          <img
            src="/logo.jpg"
            alt="Code Verse"
            className="h-10 w-10 rounded-xl object-cover"
          />
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

        <div className="flex-1 px-3">
          <OptionSidebar />
        </div>

        <div className="my-4 h-px bg-white/10" />

        <div className="px-4 pb-4">
          <div className="flex flex-col gap-3">
            <Button
              onClick={signInHandler}
              className="
                group relative flex items-center gap-3
                rounded-xl px-4 py-2.5
                bg-linear-to-r from-purple-500/20 to-cyan-500/20
                text-white
                border border-white/10
                hover:from-purple-500/30 hover:to-cyan-500/30
                transition-all
              "
            >
              <span className="absolute inset-0 rounded-xl bg-linear-to-r from-purple-500 to-cyan-500 opacity-0 blur-lg transition-opacity group-hover:opacity-20" />
              <Settings size={18} className="relative z-10" />
              <span className="relative z-10 font-medium">Settings</span>
            </Button>

            <Button
              onClick={logoutHandler}
              className="
                group relative flex items-center gap-3
                rounded-xl px-4 py-2.5
                bg-linear-to-r from-rose-500/20 to-red-500/20
                text-red-400
                border border-red-500/20
                hover:from-rose-500/30 hover:to-red-500/30
                transition-all
              "
            >
              <span className="absolute inset-0 rounded-xl bg-linear-to-r from-rose-500 to-red-500 opacity-0 blur-lg transition-opacity group-hover:opacity-25" />
              <LogOut size={18} className="relative z-10" />
              <span className="relative z-10 font-medium">Logout</span>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarMobile;
