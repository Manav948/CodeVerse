"use client";

import { LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import OptionSidebar from "./OptionSidebar";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ActiveSection } from "../task/sidebar/SidebarContainer";
import Sidebar from "../task/sidebar/Sidebar";

const SidebarMobile = () => {
  const pathname = usePathname();
  const [active, setActive] =
    useState<ActiveSection>("tasks");

  const isTaskRoute = pathname.startsWith("/task");

  const logoutHandler = async () => {
    await signOut({ callbackUrl: "/sign-in" });
    toast.success("Logout Successfully");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="lg:hidden text-white"
        >
          <Menu size={20} />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className={`flex flex-col border-white/10 bg-black text-white ${
          isTaskRoute ? "w-16 p-0" : "w-72"
        }`}
      >
        {!isTaskRoute && (
          <div className="mb-6 mt-4 flex items-center gap-3 px-4">
            <img
              src="/logo.jpg"
              alt="Code Verse"
              className="h-10 w-10 rounded-xl object-cover"
            />
            <h1 className="text-lg font-bold text-white">
              Code Verse
            </h1>
          </div>
        )}

        <div className={isTaskRoute ? "" : "flex-1 px-3"}>
          {isTaskRoute ? (
            <Sidebar
              active={active}
              setActive={setActive}
            />
          ) : (
            <OptionSidebar />
          )}
        </div>

        {!isTaskRoute && (
          <>
            <div className="my-4 h-px bg-white/10" />
            <div className="px-4 pb-4">
              <Button
                onClick={logoutHandler}
                className="w-full bg-red-500/70 hover:bg-red-500 text-white"
              >
                <LogOut size={18} />
                Logout
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default SidebarMobile;