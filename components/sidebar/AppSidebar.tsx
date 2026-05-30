"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  Home,
  MessageCircle,
  Code2,
  FileText,
  Users,
  Bookmark,
  CheckSquare2,
  LogOut,
  Settings,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { UserAvatar } from "@/components/ui/user-avatar";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navItems = [
  {
    label: "Home",
    href: "/dashboard",
    icon: Home,
    match: (p: string) => p === "/dashboard" || p.startsWith("/dashboard/"),
  },
  {
    label: "Q & A",
    href: "/qa",
    icon: MessageCircle,
    match: (p: string) => p.startsWith("/qa"),
  },
  {
    label: "Snippets",
    href: "/snippet",
    icon: Code2,
    match: (p: string) => p.startsWith("/snippet"),
  },
  {
    label: "Articles",
    href: "/article",
    icon: FileText,
    match: (p: string) => p.startsWith("/article"),
  },
  {
    label: "Community",
    href: "/community",
    icon: Users,
    match: (p: string) => p.startsWith("/community"),
  },
  {
    label: "Bookmarks",
    href: "/bookmark",
    icon: Bookmark,
    match: (p: string) => p.startsWith("/bookmark"),
  },
  {
    label: "Tasks",
    href: "/task/dashboard",
    icon: CheckSquare2,
    match: (p: string) => p.startsWith("/task"),
  },
];

type Props = {
  collapsed?: boolean;
};

const AppSidebar = ({ collapsed = false }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const logOutHandler = async () => {
    await signOut({ callbackUrl: "/sign-in" });
    toast.success("Logged out successfully");
  };

  return (
    <TooltipProvider delayDuration={collapsed ? 300 : 9999}>
      <aside
        className={cn(
          "flex flex-col h-full bg-[#070708] border-r border-white/[0.06] transition-all duration-300 ease-in-out",
          collapsed ? "w-[68px]" : "w-64"
        )}
      >
        <div
          className={cn(
            "flex items-center gap-3 px-4 py-5 border-b border-white/[0.06]",
            collapsed && "justify-center px-0"
          )}
        >
          <div className="relative flex-shrink-0">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg shadow-red-500/20">
              <Code2 size={18} className="text-white" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-[#070708]" />
          </div>

          {!collapsed && (
            <div className="min-w-0">
              <h1 className="text-[15px] font-bold tracking-tight text-white leading-none">
                Code<span className="text-red-400">Verse</span>
              </h1>
              <p className="text-[10px] text-white/30 mt-0.5 font-medium">
                Dev Community
              </p>
            </div>
          )}
        </div>

        
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {!collapsed && (
            <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-widest text-white/20">
              Navigation
            </p>
          )}

          {navItems.map(({ label, href, icon: Icon, match }) => {
            const isActive = match(pathname);

            return (
              <Tooltip key={label}>
                <TooltipTrigger asChild>
                  <Link
                    href={href}
                    className={cn(
                      "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-medium transition-all duration-150",
                      isActive
                        ? "bg-white/[0.07] text-white"
                        : "text-white/45 hover:text-white/85 hover:bg-white/[0.04]",
                      collapsed && "justify-center px-0 w-11 mx-auto"
                    )}
                  >
                 
                    {isActive && !collapsed && (
                      <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-gradient-to-b from-red-400 to-orange-400" />
                    )}

                   
                    <span
                      className={cn(
                        "relative flex-shrink-0 transition-colors duration-150",
                        isActive
                          ? "text-red-400"
                          : "text-white/35 group-hover:text-white/70"
                      )}
                    >
                      <Icon size={17} />
                     
                      {isActive && collapsed && (
                        <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-red-400" />
                      )}
                    </span>

              
                    {!collapsed && (
                      <span className="truncate">{label}</span>
                    )}

                  
                    {isActive && !collapsed && (
                      <ChevronRight
                        size={13}
                        className="ml-auto text-white/25 flex-shrink-0"
                      />
                    )}
                  </Link>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right" sideOffset={12}>
                    <span>{label}</span>
                  </TooltipContent>
                )}
              </Tooltip>
            );
          })}
        </nav>


        <div className={cn(
          "border-t border-white/[0.06] p-3",
          collapsed && "p-2"
        )}>
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => router.push("/dashboard/settings")}
                  className="w-full flex justify-center p-1 rounded-xl hover:bg-white/[0.05] transition-colors"
                >
                  <UserAvatar
                    profileImage={user?.image ?? null}
                    username={user?.username ?? null}
                    size={36}
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={12}>
                <span>{user?.username ?? "Profile"}</span>
              </TooltipContent>
            </Tooltip>
          ) : (
            <div className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-white/[0.04] transition-colors group/user">
              <button
                onClick={() => router.push(`/profile/${user?.id}`)}
                className="flex-shrink-0 ring-2 ring-transparent group-hover/user:ring-white/10 rounded-full transition-all duration-200"
              >
                <UserAvatar
                  profileImage={user?.image ?? null}
                  username={user?.username ?? null}
                  size={34}
                />
              </button>

              <div className="flex-1 min-w-0 text-left">
                <p className="text-[12.5px] font-semibold text-white/85 truncate leading-none">
                  {user?.username ?? "Guest"}
                </p>
                <p className="text-[11px] text-white/30 truncate mt-0.5">
                  {user?.email ?? ""}
                </p>
              </div>

              <div className="flex items-center gap-1 flex-shrink-0">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => router.push("/dashboard/settings")}
                      className="h-7 w-7 rounded-lg flex items-center justify-center text-white/25 hover:text-white/70 hover:bg-white/[0.06] transition-all"
                    >
                      <Settings size={13} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Settings</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={logOutHandler}
                      className="h-7 w-7 rounded-lg flex items-center justify-center text-white/25 hover:text-red-400 hover:bg-red-500/10 transition-all"
                    >
                      <LogOut size={13} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Log out</TooltipContent>
                </Tooltip>
              </div>
            </div>
          )}
        </div>
      </aside>
    </TooltipProvider>
  );
};

export default AppSidebar;
