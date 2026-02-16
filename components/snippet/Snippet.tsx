"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SnippetWithExtras } from "@/types/snippet";
import { Bookmark, FileCode, Heart } from "lucide-react";
import SnippetHeader from "./SnippetHeader";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type Props = {
  snippet: SnippetWithExtras;
};

const SnippetCard = ({ snippet }: Props) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: toggleLike, isPending } = useMutation({
    mutationFn: async () => {
      await axios.post(`/api/snippet/likes/${snippet.id}`);
    },

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["snippets"] });

      const previousSnippets =
        queryClient.getQueryData<SnippetWithExtras[]>(["snippets"]);

      queryClient.setQueryData<SnippetWithExtras[]>(["snippets"], (old) =>
        old?.map((s) =>
          s.id === snippet.id
            ? {
              ...s,
              isLiked: !s.isLiked,
              likeCount: s.isLiked
                ? s.likeCount - 1
                : s.likeCount + 1,
            }
            : s
        ) || []
      );

      return { previousSnippets };
    },

    onError: (_err, _vars, context) => {
      if (context?.previousSnippets) {
        queryClient.setQueryData(["snippets"], context.previousSnippets);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["snippets"] });
    },
  });

  const { mutate: toggleBookmark, isPending: isBookmarking } = useMutation({
    mutationFn: async () => {
      await axios.post(`/api/snippet/bookmark/${snippet.id}`);
    },

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["snippets"] });

      const previousSnippets =
        queryClient.getQueryData<SnippetWithExtras[]>(["snippets"]);

      queryClient.setQueryData<SnippetWithExtras[]>(["snippets"], (old) =>
        old?.map((s) =>
          s.id === snippet.id
            ? { ...s, bookmarked: !s.bookmarked }
            : s
        ) || []
      );

      return { previousSnippets };
    },

    onError: (_err, _vars, context) => {
      if (context?.previousSnippets) {
        queryClient.setQueryData(["snippets"], context.previousSnippets);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["snippets"] });
    },

    onSuccess: () => {
      toast.success("Bookmark updated");
    },
  });


  const copyButton = () => {
    navigator.clipboard.writeText(snippet.code);
    toast.success("Snippet copied");
  };

  return (
    <>
      <Card
        className="
          relative overflow-hidden
          rounded-2xl
          bg-black/60
          backdrop-blur-xl
          p-6 border-none
        "
      >
        <div className="space-y-4">
          <SnippetHeader user={snippet.user} />

          <h3 className="text-lg font-semibold text-white">
            {snippet.title}
          </h3>


          <p className="text-sm text-white/60 line-clamp-2">
            {snippet.description}
          </p>


          <div className="relative rounded-xl bg-white/10 border border-white/10 p-4 font-mono text-xs text-white/80 line-clamp-4">
            {snippet.code}
            <FileCode
              size={16}
              className="absolute right-3 bottom-3 text-white/30"
            />
          </div>


          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">

            <div className="flex flex-wrap gap-2">
              <Badge className="bg-cyan-500/10 text-cyan-400">
                {snippet.language}
              </Badge>

              {snippet.tags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag.id}
                  className="bg-white/10 text-white/70"
                >
                  #{tag.name}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-8 text-sm mt-1.5">

              <span className="text-white">
                {new Date(snippet.created_at).toLocaleDateString()}
              </span>
              <button
                disabled={isPending}
                onClick={() => toggleLike()}
                className={`flex items-center gap-1 transition-all duration-200 cursor-pointer
                  ${snippet.isLiked ? "text-red-500 scale-105" : "hover:text-white text-white"}
                ${isPending ? "opacity-50 cursor-not-allowed" : ""}
  `}
              >
                <Heart
                  size={16}
                  fill={snippet.isLiked ? "currentColor" : "none"}
                  className="transition-all duration-200"
                />
                <span>{snippet.likeCount}</span>
              </button>
              <button
                onClick={() => toggleBookmark()}
                className={`flex items-center gap-1 transition-all duration-200 text-white cursor-pointer ${snippet.bookmarked
                  ? "text-gray-300"
                  : "hover:text-white"
                  }`}
              >
                <Bookmark
                  size={18}
                  fill={snippet.bookmarked ? "currentColor" : "none"}
                />
                <span>BookMark</span>
              </button>

              <button
                onClick={() => setOpen(true)}
                className="text-white/60 hover:text-white cursor-pointer"
              >
                View →
              </button>

            </div>
          </div>
        </div>
      </Card>

      <Separator className="bg-white/10 my-6" />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="
            max-w-4xl
            border border-white/10
            bg-black
            text-white
            backdrop-blur-xl
          "
        >
          <DialogHeader className="mt-15">
            <SnippetHeader user={snippet.user} />
            <h2 className="text-2xl font-semibold">
              {snippet.title}
            </h2>
            <span className="">
              {snippet.description}
            </span>

            <p className="text-xs text-white/40">
              {new Date(snippet.created_at).toLocaleString()}
            </p>
          </DialogHeader>

          <Separator className="my-4 bg-white/10" />

          <pre className="max-h-[60vh] overflow-auto rounded-xl bg-white/10 border border-white/10 p-5 text-sm font-mono">
            <code>{snippet.code}</code>
          </pre>

          <Button
            onClick={copyButton}
            className="mt-4 bg-red-500/60 text-white hover:opacity-90"
          >
            Copy Snippet
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SnippetCard;
