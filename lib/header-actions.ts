import { Plus, PenSquare, ArrowLeft, PlusCircleIcon } from "lucide-react";

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
  {
    match: (path) => path.startsWith("/task/new"),
    action: {
      label: "Back",
      href: "/task",
      icon: ArrowLeft,
    },
  },
    {
    match: (path) => path.startsWith(`/task/edit`),
    action: {
      label: "Back",
      href: "/task",
      icon: ArrowLeft,
    },
  },
  {
    match: (path) => path.startsWith("/task"),
    action: {
      label: "Add Task",
      href: "/task/new",
      icon: PlusCircleIcon,
    },
  },
];
