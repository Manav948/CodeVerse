"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { UserAvatar } from "@/components/ui/user-avatar";
import { LogOut, Settings } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";

const User = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const logOutHandler = async () => {
    await signOut({ callbackUrl: "/sign-in" });
    toast.success("Logged out successfully");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full ring-2 ring-transparent hover:ring-white/20 transition-all duration-200">
          <UserAvatar
            profileImage={user?.image ?? null}
            username={user?.username ?? null}
            size={36}
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="w-60 rounded-xl border border-white/5 bg-[#111111] p-3 text-white shadow-xl"
      >
        <div className="flex items-center gap-3 p-2 rounded-lg bg-white/2 border border-white/5">
          <UserAvatar
            profileImage={user?.image ?? null}
            username={user?.username ?? null}
            size={36}
          />
          <div className="leading-tight min-w-0 flex-1">
            <p className="text-xs font-semibold text-white/90 truncate">
              {user?.username ?? "Guest"}
            </p>
            <p className="text-[10px] font-mono text-white/30 truncate mt-0.5">
              {user?.email ?? ""}
            </p>
          </div>
        </div>

        <DropdownMenuSeparator className="my-3 bg-white/5" />

        <DropdownMenuItem asChild>
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-xs text-white/70 hover:text-white hover:bg-white  transition cursor-pointer"
          >
            <Settings size={14} className="text-white/40" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={logOutHandler}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-white  transition cursor-pointer"
        >
          <LogOut size={14} className="text-red-500/60" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default User;
