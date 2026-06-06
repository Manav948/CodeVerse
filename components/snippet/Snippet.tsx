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
import { useRouter } from "next/navigation";

type Props = {
  snippet: SnippetWithExtras;
};

const SnippetCard = ({ snippet }: Props) => {
  const router = useRouter();
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


  return (
    <>
      <Card className="relative overflow-hidden rounded-xl border border-white/10 bg-black transition-all duration-200 shadow-sm">
        <div className="p-5 space-y-3.5">

          <SnippetHeader user={snippet.user} />

          <div className="h-px bg-white/10" />

          <h3 className="text-[15px] font-semibold tracking-tight text-white/95">
            {snippet.title}
          </h3>

          <p className="text-[13px] text-white/55 leading-relaxed line-clamp-2">
            {snippet.description}
          </p>

        
          <div
            className="group/code relative rounded-lg border border-white/6  p-4 font-mono text-[11.5px] text-white/70 leading-relaxed overflow-x-auto whitespace-pre-wrap bg-white/5"
          >
            {snippet.code}
          </div>

      
          <div className="flex flex-wrap items-center justify-between gap-3 pt-0.5">

         
            <div className="flex flex-wrap gap-1.5">
              <span className="inline-flex text-[11px] font-semibold text-cyan-400 bg-cyan-400/6 border border-cyan-400/12 px-2 py-0.5 rounded-md">
                {snippet.language}
              </span>
              {snippet.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag.id}
                  className="inline-flex text-[11px] font-medium text-white/40 bg-white/3 border border-white/6 px-2 py-0.5 rounded-md"
                >
                  #{tag.name}
                </span>
              ))}
            </div>

     
            <div className="flex items-center gap-1 text-[12px] text-white/30">

          
              <span className="mr-2 tabular-nums text-white/25 text-[11.5px]">
                {new Date(snippet.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
              </span>

          
              <button
                disabled={isPending}
                onClick={() => toggleLike()}
                className={`flex items-center gap-1.5 px-2 py-1.5 rounded-md transition-all duration-150 cursor-pointer group/like
                  ${snippet.isLiked ? "text-red-500" : "text-white/35 hover:text-red-400"}
                  ${isPending ? "opacity-40 cursor-not-allowed" : ""}
                `}
              >
                <div className="p-0.5 rounded-full group-hover/like:bg-red-500/10 transition-colors">
                  <Heart
                    size={14}
                    fill={snippet.isLiked ? "currentColor" : "none"}
                    className="transition-transform duration-150"
                  />
                </div>
                <span className="tabular-nums font-medium">{snippet.likeCount}</span>
              </button>

              
              <button
                onClick={() => toggleBookmark()}
                className={`flex items-center gap-1.5 px-2 py-1.5 rounded-md transition-all duration-150 cursor-pointer group/bm
                  ${snippet.bookmarked ? "text-amber-400" : "text-white/35 hover:text-amber-400"}
                `}
              >
                <div className="p-0.5 rounded-full group-hover/bm:bg-amber-400/10 transition-colors">
                  <Bookmark size={14} fill={snippet.bookmarked ? "currentColor" : "none"} />
                </div>
                <span className="font-medium">Save</span>
              </button>

              <button
                onClick={() => router.push(`/snippet/${snippet.id}`)}
                className="flex items-center gap-1 px-2 py-1.5 rounded-md text-white/35 hover:text-white/80 transition-all cursor-pointer font-medium"
              >
                View
                <span className="text-white/20">→</span>
              </button>
            </div>
          </div>
        </div>
      </Card>

      <Separator className="bg-white/4 my-3" />
    </>
  );
};

export default SnippetCard;
