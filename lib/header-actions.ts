import { Plus, FileCode, PenSquare, ArrowLeft } from "lucide-react";

export type HeaderAction = {
  label: string;
  href: string;
  icon: React.ElementType;
};

export const HeaderAction: Record<string, HeaderAction> = {
  "/snippet": {
    label: "Add Snippet",
    href: "/snippet",
    icon: Plus,
  },
  "/articles": {
    label: "Add Article",
    href: "/article",
    icon: PenSquare,
  },
  "/Q & A": {
    label: "Ask Question",
    href: "/qa",
    icon: Plus,
  },
  "/": {
    label: "Add Post",
    href: "/post",
    icon: Plus,
  },
   "/Bookmark": {
    label: "Back",
    href: "/dashboard",
    icon: ArrowLeft,
  },
};
