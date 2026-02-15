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
        className="w-60 rounded-xl border border-white/10 bg-black p-3 text-white shadow-xl backdrop-blur-xl"
      >
        <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
          <UserAvatar
            profileImage={user?.image ?? null}
            username={user?.username ?? null}
            size={40}
          />
          <div className="leading-tight">
            <p className="text-sm font-semibold">
              {user?.username ?? "Guest"}
            </p>
            <p className="text-xs text-white/50 truncate">
              {user?.email ?? ""}
            </p>
          </div>
        </div>

        <DropdownMenuSeparator className="my-3 bg-white/10" />

        <DropdownMenuItem asChild>
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-white/10 transition"
          >
            <Settings size={16} />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={logOutHandler}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-red-400 hover:bg-red-500/10 transition cursor-pointer"
        >
          <LogOut size={16} />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default User;
