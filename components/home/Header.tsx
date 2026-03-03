"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, FileText, Code2, MessageSquare, CheckSquare } from "lucide-react";

const Header = () => {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur-xl overflow-hidden">

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <div
            onClick={() => router.push("/")}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-purple-500 to-cyan-500 font-bold text-white shadow-lg">
              CV
            </div>
            <span className="text-lg font-semibold tracking-tight text-white">
              CodeVerse
            </span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 text-sm text-white hover:text-white bg-red-500/60 p-2 rounded-lg transition">
                Products
                <ChevronDown className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="start"
              className="w-64 bg-black border border-white/10 backdrop-blur-xl text-white rounded-xl shadow-2xl"
            >
              <DropdownMenuLabel className="text-white text-xs">
                Explore CodeVerse
              </DropdownMenuLabel>

              <DropdownMenuSeparator className="bg-white/10" />

              <DropdownMenuItem
                className="cursor-pointer gap-3 focus:bg-white"
              >
                <FileText className="w-4 h-4 text-purple-400" />
                Posts
              </DropdownMenuItem>

              <DropdownMenuItem
                className="cursor-pointer gap-3 focus:bg-white"
              >
                <Code2 className="w-4 h-4 text-cyan-400" />
                Snippets
              </DropdownMenuItem>

              <DropdownMenuItem
                className="cursor-pointer gap-3 focus:bg-white"
              >
                <MessageSquare className="w-4 h-4 text-pink-400" />
                Questions
              </DropdownMenuItem>

              <DropdownMenuItem
                className="cursor-pointer gap-3 focus:bg-white"
              >
                <CheckSquare className="w-4 h-4 text-green-400" />
                Tasks
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            onClick={() => router.push("/sign-in")}
            className="text-white hover:bg-red-500/80 hover:text-white bg-red-500/60 "
          >
            Sign In
          </Button>

          <Button
            onClick={() => router.push("/sign-up")}
            className="rounded-lg bg-red-500/60 text-white hover:bg-red-500/80 hover:text-white"
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;