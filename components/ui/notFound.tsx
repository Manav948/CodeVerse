"use client";

import { FileX2, Code2, FileText, HelpCircle, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type NotFoundType =
  | "post"
  | "snippet"
  | "article"
  | "question"
  | "bookmark";

interface Props {
  type?: NotFoundType;
}

const config = {
  post: {
    title: "Post not found",
    description: "This post may have been deleted or does not exist.",
    icon: FileText,
  },
  snippet: {
    title: "Snippet not found",
    description: "The code snippet you are looking for is unavailable.",
    icon: Code2,
  },
  article: {
    title: "Article not found",
    description: "This article could not be found.",
    icon: FileX2,
  },
  question: {
    title: "Question not found",
    description: "This question may have been removed or never existed.",
    icon: HelpCircle,
  },
  bookmark: {
    title: "No bookmarks yet",
    description: "You haven’t saved anything yet.",
    icon: Bookmark,
  },
};

const NotFoundState = ({ type = "post" }: Props) => {
  const router = useRouter();
  const { title, description, icon: Icon } = config[type];

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center space-y-6 max-w-md">

        <div className="mx-auto w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
          <Icon size={36} className="text-white/40" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-white">
            {title}
          </h2>
          <p className="text-white/50 text-sm">
            {description}
          </p>
        </div>

        <div className="flex justify-center gap-9">
          <Button
            variant="secondary"
            onClick={() => router.back()}
            className="rounded-xl px-8 py-5"
          >
            Go Back
          </Button>

          <Button
            onClick={() => router.push("/dashboard")}
            className="rounded-xl bg-red-500/60 text-white px-8 py-5"
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundState;
