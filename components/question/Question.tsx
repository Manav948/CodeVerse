"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Bookmark, CornerUpRight, Heart } from "lucide-react";
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
      <Card className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-[#0d0d0e] hover:bg-[#111113] hover:border-white/[0.11] transition-all duration-200 mb-3 shadow-sm">
        <div className="p-5 space-y-3.5">

          <QuestionHeader user={question.user} />

          <div className="h-px bg-white/[0.05]" />

          {/* Title */}
          <h3 className="text-[15px] font-semibold leading-snug tracking-tight text-white/95">
            {question.title}
          </h3>

          {/* Description */}
          <p className="text-[13px] text-white/55 leading-relaxed line-clamp-2">
            {question.description}
          </p>

          {/* Footer row */}
          <div className="pt-1 flex items-center justify-between text-[12px] text-white/30">
            <span className="tabular-nums">
              {new Date(question.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
            </span>

            <div className="flex items-center gap-1">
              {/* Like */}
              <button
                disabled={isPending}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike();
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md transition-all duration-150 cursor-pointer group/like
                  ${question.isLiked ? "text-red-500" : "text-white/35 hover:text-red-400"}
                  ${isPending ? "opacity-40 cursor-not-allowed" : ""}
                `}
              >
                <div className="p-0.5 rounded-full group-hover/like:bg-red-500/10 transition-colors">
                  <Heart
                    size={14}
                    fill={question.isLiked ? "currentColor" : "none"}
                    className="transition-transform duration-150"
                  />
                </div>
                <span className="tabular-nums font-medium">{question.likeCount}</span>
              </button>

              {/* Bookmark */}
              <button
                onClick={() => toggleBookmark()}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md transition-all duration-150 cursor-pointer group/bm
                  ${question.bookmarked ? "text-amber-400" : "text-white/35 hover:text-amber-400"}
                `}
              >
                <div className="p-0.5 rounded-full group-hover/bm:bg-amber-400/10 transition-colors">
                  <Bookmark size={14} fill={question.bookmarked ? "currentColor" : "none"} />
                </div>
                <span className="font-medium">Save</span>
              </button>

              {/* Reply */}
              <button
                onClick={replyButton}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-white/35 hover:text-white/70 transition-all cursor-pointer group/rpl"
              >
                <div className="p-0.5 rounded-full group-hover/rpl:bg-white/[0.06] transition-colors">
                  <CornerUpRight size={14} />
                </div>
                <span className="font-medium">Reply</span>
              </button>

              {/* View */}
              <button
                onClick={() => router.push(`/qa/question/${question.id}`)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-white/35 hover:text-white/80 transition-all cursor-pointer font-medium"
              >
                View
                <span className="text-white/20">→</span>
              </button>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default Question;
