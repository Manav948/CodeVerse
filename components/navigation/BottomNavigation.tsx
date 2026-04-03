"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Code2,
  Bookmark,
  FileText,
  Plus,
  CheckSquare,
  PenSquare,
  FilePlus,
  MessageCircleMoreIcon,
  CheckSquare2,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function BottomNavigation() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { icon: Home, path: "/dashboard", label: "Home" },
    { icon: Code2, path: "/snippet", label: "Snippet" },
    { icon: MessageCircleMoreIcon, path: "/qa", label: "Q&A" },
    { icon: Bookmark, path: "/bookmark", label: "Save" },
    { icon: FileText, path: "/article", label: "Article" },
    { icon: CheckSquare2, path: "/task/dashboard", label: "Task" },
  ];

  const actionItems = [
    { icon: CheckSquare, label: "Task", path: "/task/new" },
    { icon: Code2, label: "Snippet", path: "/snippet/new" },
    { icon: FilePlus, label: "Article", path: "/article/new" },
    { icon: PenSquare, label: "Post", path: "/post/new" },
  ];

  const mid = Math.ceil(navItems.length / 2);
  const leftItems = navItems.slice(0, mid);
  const rightItems = navItems.slice(mid);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="fixed bottom-28 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="grid grid-cols-2 gap-4 p-4 bg-black/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
              {actionItems.map((item, i) => (
                <motion.button
                  key={i}
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => {
                    router.push(item.path);
                    setOpen(false);
                  }}
                  className="flex flex-col items-center gap-1 text-white text-xs"
                >
                  <div className="p-3 rounded-xl bg-red-500/20">
                    <item.icon size={18} />
                  </div>
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="mx-auto max-w-md px-3 pb-5">
          <div className="flex items-center justify-between rounded-3xl border border-white/10 bg-black/80 backdrop-blur-xl px-4 py-2 shadow-xl">

            <div className="flex items-center gap-2">
              {leftItems.map((item, i) => (
                <button
                  key={i}
                  onClick={() => router.push(item.path)}
                  className={`flex w-12 flex-col items-center text-[10px] ${pathname === item.path ? "text-red-500" : "text-white/60"
                    }`}
                >
                  <item.icon size={20} />
                  {item.label}
                </button>
              ))}
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setOpen(!open)}
              className="relative -mt-8 flex h-14 w-14 items-center justify-center rounded-full bg-red-500 text-white shadow-lg"
            >
              <motion.div
                animate={{ rotate: open ? 45 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <Plus size={26} />
              </motion.div>
            </motion.button>

            <div className="flex items-center gap-2">
              {rightItems.map((item, i) => (
                <button
                  key={i}
                  onClick={() => router.push(item.path)}
                  className={`flex w-12 flex-col items-center text-[10px] ${pathname === item.path ? "text-red-500" : "text-white/60"
                    }`}
                >
                  <item.icon size={20} />
                  {item.label}
                </button>
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}