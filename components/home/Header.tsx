"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
  Menu,
  X,
} from "lucide-react";

const NAV_LINKS = [
  { label: "About", href: "#" },
  { label: "Contact", href: "#" },
];

const PRODUCTS = [
  { label: "Posts", icon: <FileText className="w-4 h-4 text-red-400" />, href: "/post" },
  { label: "Snippets", icon: <Code2 className="w-4 h-4 text-orange-400" />, href: "/snippet" },
  { label: "Questions", icon: <MessageSquare className="w-4 h-4 text-blue-400" />, href: "/question" },
  { label: "Tasks", icon: <CheckSquare className="w-4 h-4 text-green-400" />, href: "/task" },
];

export default function Header() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className="fixed top-0 z-50 w-full transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(0,0,0,0.85)"
            : "transparent",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.06)"
            : "1px solid transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-16 items-center justify-between">

            
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2.5 group"
            >
              <Image
                src="/logo2.png"
                alt="CodeVerse"
                width={34}
                height={34}
                className="rounded-full group-hover:opacity-90 transition-opacity"
              />
              <span className="text-base font-semibold tracking-tight text-white">
                CodeVerse
              </span>
            </button>

         
            <nav className="hidden md:flex items-center gap-7 text-sm text-white/55">

           
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 hover:text-white transition-colors duration-200 outline-none">
                    Products
                    <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="start"
                  sideOffset={12}
                  className="w-56 rounded-xl border border-white/[0.08] bg-[#0d0d0d] text-white shadow-2xl shadow-black/50 p-1.5"
                >
                  {PRODUCTS.map((p) => (
                    <DropdownMenuItem
                      key={p.label}
                      onClick={() => router.push(p.href)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-white/60 hover:text-white hover:bg-white/[0.05] transition-colors text-sm"
                    >
                      {p.icon}
                      {p.label}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator className="my-1.5 bg-white/[0.06]" />
                  <DropdownMenuItem className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-white/25 text-xs font-mono tracking-wider hover:bg-white/[0.03]">
                    More coming soon
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {NAV_LINKS.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="hover:text-white transition-colors duration-200"
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => router.push("/sign-in")}
                className="text-sm text-white/55 hover:text-white transition-colors duration-200 px-3 py-1.5"
              >
                Sign In
              </button>

              <button
                onClick={() => router.push("/sign-up")}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-medium transition-colors duration-200 shadow-lg shadow-red-600/20"
              >
                Get Started
              </button>
            </div>

          
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden text-white/60 hover:text-white transition-colors p-1"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

     
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 pt-20 px-6 md:hidden">
          <nav className="flex flex-col gap-1">
            {PRODUCTS.map((p) => (
              <button
                key={p.label}
                onClick={() => { router.push(p.href); setMobileOpen(false); }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/[0.05] transition-colors text-sm text-left"
              >
                {p.icon}
                {p.label}
              </button>
            ))}
            <div className="h-px bg-white/[0.06] my-3" />
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 text-sm text-white/55 hover:text-white transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <div className="h-px bg-white/[0.06] my-3" />
            <button
              onClick={() => { router.push("/sign-in"); setMobileOpen(false); }}
              className="px-4 py-3 text-sm text-white/55 hover:text-white transition-colors text-left"
            >
              Sign In
            </button>
            <button
              onClick={() => { router.push("/sign-up"); setMobileOpen(false); }}
              className="mt-2 w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-medium transition-colors"
            >
              Get Started
            </button>
          </nav>
        </div>
      )}
    </>
  );
}