import React from "react";
import Link from "next/link";
import { Home, FileText, User, Settings } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="sticky top-20 h-full w-64 shrink-0 bg-black border-r border-gray-600 p-5 backdrop-blur-xl">
      <nav className="flex flex-col gap-2">
        <SidebarItem icon={<Home size={18} />} label="Home" href="/dashboard" />
        <SidebarItem
          icon={<FileText size={18} />}
          label="Posts"
          href="/dashboard/posts"
        />
        <SidebarItem
          icon={<User size={18} />}
          label="Profile"
          href="/dashboard/profile"
        />
        <SidebarItem
          icon={<Settings size={18} />}
          label="Settings"
          href="/dashboard/settings"
        />
      </nav>
    </aside>
  );
};

const SidebarItem = ({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
    >
      {icon}
      {label}
    </Link>
  );
};

export default Sidebar;
