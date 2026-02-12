import { Plus, PenSquare, ArrowLeft } from "lucide-react";

export type HeaderActionConfig = {
  label: string;
  href: string;
  icon: React.ElementType;
};

export const HeaderAction: {
  match: (pathname: string) => boolean;
  action: HeaderActionConfig;
}[] = [
  {
    match: (path) => path.startsWith("/dashboard"),
    action: {
      label: "Add Post",
      href: "/dashboard/new",
      icon: Plus,
    },
  },
  {
    match: (path) => path.startsWith("/snippet"),
    action: {
      label: "Add Snippet",
      href: "/snippet/new",
      icon: Plus,
    },
  },
  {
    match: (path) => path.startsWith("/article"),
    action: {
      label: "Add Article",
      href: "/article/new",
      icon: PenSquare,
    },
  },
  {
    match: (path) => path.startsWith("/qa"),
    action: {
      label: "Ask Question",
      href: "/qa/new",
      icon: Plus,
    },
  },
  {
    match: (path) => path.startsWith("/bookmark"),
    action: {
      label: "Back",
      href: "/dashboard",
      icon: ArrowLeft,
    },
  },
];
