"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  FileText,
  Code2,
  MessageSquare,
  CheckSquare,
} from "lucide-react";

export default function Header() {
  const router = useRouter();

  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="absolute inset-0 -z-10 backdrop-blur-xl bg-black/40 border-b border-white/10" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          {/* left div */}
          <div className="flex items-center gap-10">
            <div
              onClick={() => router.push("/")}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="h-9 w-9 rounded-xl flex items-center justify-center font-bold text-white shadow-lg group-hover:scale-105 transition">
                <img src="./logo2.png" className="rounded-full" />
              </div>

              <span className="text-lg font-semibold tracking-tight text-white transition">
                CodeVerse
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm text-white/70">

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 hover:text-white transition">
                    Products
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="start"
                  className="w-64 rounded-xl border border-white/10 bg-black/80 backdrop-blur-xl text-white shadow-2xl"
                >
                  <DropdownMenuItem
                    className="gap-3 cursor-pointer hover:bg-white/5"
                  >
                    <FileText className="w-4 h-4 text-purple-400" />
                    Posts
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="gap-3 cursor-pointer hover:bg-white/5"
                  >
                    <Code2 className="w-4 h-4 text-cyan-400" />
                    Snippets
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="gap-3 cursor-pointer hover:bg-white/5"
                  >
                    <MessageSquare className="w-4 h-4 text-pink-400" />
                    Questions
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="bg-white/10" />

                  <DropdownMenuItem
                    className="gap-3 cursor-pointer hover:bg-white/5"
                  >
                    <CheckSquare className="w-4 h-4 text-green-400" />
                    Tasks
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <button
                className="hover:text-white transition"
              >
                About
              </button>

              <button
                className="hover:text-white transition"
              >
                Contact
              </button>
            </div>
          </div>
          {/* right div */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/sign-in")}
              className="hidden md:block text-sm text-white/70 hover:text-white transition"
            >
              Sign In
            </button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/sign-up")}
              className="px-5 py-2 rounded-xl bg-red-500/60 text-white text-sm font-medium shadow-lg shadow-red-500/60"
            >
              Sign Up
            </motion.button>
          </div>
        </div>
      </div>
    </header>
  );
}