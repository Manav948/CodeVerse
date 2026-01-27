import Link from "next/link";
import React from "react";
import {
  Home,
  MessageCircle,
  Code2,
  FileText,
  Users,
  Bookmark,
} from "lucide-react";

const options = [
  { label: "Home", href: "/", icon: Home },
  { label: "Q & A", href: "/", icon: MessageCircle },
  { label: "Snippets", href: "/", icon: Code2 },
  { label: "Articles", href: "/", icon: FileText },
  { label: "Community", href: "/", icon: Users },
  { label: "Bookmarks", href: "/", icon: Bookmark },
];

const OptionSidebar = () => {
  return (
    <nav className="flex flex-col gap-3">
      {options.map(({ label, href, icon: Icon }) => (
        <Link
          key={label}
          href={href}
          className="group relative flex items-center gap-3 rounded-xl px-4 py-2 text-sm font-medium text-white/90 transition-all
                     hover:bg-white/10 hover:text-white"
        >
          <span className="absolute inset-0 rounded-xl bg-linear-to-r from-purple-500/20 to-cyan-500/20 opacity-0 blur-md transition-opacity group-hover:opacity-100" />

          <Icon size={18} className="relative z-10 text-white/60 group-hover:text-white" />
          <span className="relative z-10">{label}</span>

          <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-linear-to-b from-purple-400 to-cyan-400 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
        </Link>
      ))}
    </nav>
  );
};

export default OptionSidebar;
