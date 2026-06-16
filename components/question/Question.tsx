"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Bookmark, CornerUpRight, EllipsisVertical, Heart, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { QuestionWithExtras } from "@/types/question";
import QuestionHeader from "./QuestionHeader";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type Props = {
  question: QuestionWithExtras;
};

const Question = ({ question }: Props) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: toggleLike, isPending } = useMutation({
    mutationFn: async () => {
      await axios.post(`/api/Question/likes/${question.id}`);
    },

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["question"] });

      const previousQuestions =
        queryClient.getQueryData<QuestionWithExtras[]>(["question"]);

      queryClient.setQueryData<QuestionWithExtras[]>(["question"], (old) =>
        old?.map((q) =>
          q.id === question.id
            ? {
              ...q,
              isLiked: !q.isLiked,
              likeCount: q.isLiked
                ? q.likeCount - 1
                : q.likeCount + 1,
            }
            : q
        ) || []
      );

      return { previousQuestions };
    },

    onError: (_err, _vars, context) => {
      if (context?.previousQuestions) {
        queryClient.setQueryData(["questions"], context.previousQuestions);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["question"] });
    },
  });

  const { mutate: toggleBookmark } = useMutation({
    mutationFn: async () => {
      await axios.post(`/api/Question/bookmark/${question.id}`)
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["question"] })
      const previous = queryClient.getQueryData<QuestionWithExtras[]>(["question"])
      queryClient.setQueryData<QuestionWithExtras[]>(
        ["question"],
        (old) => old?.map((p) => p.id === question.id ? { ...p, bookmarked: !p.bookmarked } : p) || []
      )
      return { previous }
    },
    onError: (_, __, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["question"], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["question"] });
    },
    onSuccess: () => {
      toast.success("BookMarked Successfully")
    }
  })

  const copyButton = (e: any) => {
    e.stopPropagation();
    navigator.clipboard.writeText(question.description);
    toast.success("Question copied");
  };

  const replyButton = (e: any) => {
    e.stopPropagation();
    router.push(`/qa/${question.id}`);
  };

  return (
    <>
      <Card className="group relative overflow-hidden rounded-xl border border-white/5 bg-[#0a0a0c]/85 transition-all duration-300 mb-4 shadow-[0_8px_30px_rgb(0,0,0,0.5)] backdrop-blur-md">

        <div className="absolute top-0 inset-x-0 h-0.5 bg-linear-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="p-5 space-y-4">
          <div className="flex justify-between items-start">
            <QuestionHeader user={question.user} />
            <button className="flex h-7 w-7 items-center justify-center rounded-md text-white/30 hover:text-white/70 hover:bg-white/6 transition-all focus:outline-none">
              <EllipsisVertical className="h-4 w-4" />
            </button>
          </div>

          <div className="h-px border-t border-dashed border-white/6" />

          <h3 className="text-[15.5px] font-semibold leading-snug tracking-tight text-white/90 group-hover:text-white transition-colors duration-200">
            {question.title}
          </h3>

          <p className="text-[13px] text-white/50 leading-relaxed line-clamp-2 font-normal">
            {question.description
              ?.replace(/```[a-zA-Z0-9]*\n?/g, "")
              .replace(/`|[*]{3,5}/g, "")
              .trim()}
          </p>

          <div className="pt-1 flex items-center justify-between text-[11.5px] text-white/35">
            <span className="mr-2 tabular-nums text-white/25 text-[11.5px]">
              {new Date(question.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
            </span>

            <div className="flex items-center gap-1.5">
              <button
                disabled={isPending}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike();
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 group/like
                  ${question.isLiked ? "text-rose-500 bg-rose-500/3 border border-rose-500/20" : "text-white/35 hover:text-rose-400 hover:bg-rose-500/4 border border-transparent"}
                  ${isPending ? "opacity-40 cursor-not-allowed" : ""}
                `}
              >
                <div className="p-0.5 rounded-full transition-colors">
                  <Heart
                    size={13.5}
                    fill={question.isLiked ? "currentColor" : "none"}
                    className="transition-transform duration-150"
                  />
                </div>
                <span className="tabular-nums font-mono font-medium">{question.likeCount}</span>
              </button>

              <button
                onClick={() => toggleBookmark()}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 group/bm
                  ${question.bookmarked ? "text-amber-400 bg-amber-400/3 border border-amber-400/20" : "text-white/35 hover:text-amber-400 hover:bg-amber-400/4 border border-transparent"}
                `}
              >
                <div className="p-0.5 rounded-full transition-colors">
                  <Bookmark size={13.5} fill={question.bookmarked ? "currentColor" : "none"} />
                </div>
                <span className="font-mono font-medium text-[11px] hidden sm:inline">Save</span>
              </button>

              <button
                onClick={replyButton}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-white/35 hover:text-white/70 hover:bg-white/4 transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 group/rpl"
              >
                <div className="p-0.5 rounded-full transition-colors">
                  <CornerUpRight size={13.5} />
                </div>
                <span className="font-mono font-medium text-[11px] hidden sm:inline">Reply</span>
              </button>

              <button
                onClick={() => router.push(`/qa/question/${question.id}`)}
                className="group flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/4 bg-white/2 text-white/40 hover:text-white hover:bg-white/6 hover:border-white/8 transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 text-[11px] font-medium"
              >
                <span>View</span>
                <ArrowRight size={12} className="text-white/20 group-hover:translate-x-0.5 transition-transform duration-200" />
              </button>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default Question;
