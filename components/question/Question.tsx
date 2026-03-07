"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
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
      <Card
        className="
          relative overflow-hidden
          rounded-2xl
          bg-black/60
          backdrop-blur-xl
          p-6 border-none
          cursor-pointer
        "
      >
        <div className="space-y-4">

          <QuestionHeader user={question.user} />

          <h3 className="text-lg font-semibold text-white line-clamp-1">
            {question.title}
          </h3>

          <p className="text-sm text-white/60 line-clamp-2">
            {question.description}
          </p>

          <Separator className="bg-white/10" />

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-white/50">

            <span>
              Created at : {new Date(question.created_at).toLocaleDateString()}
            </span>

            <div className="flex items-center gap-3 text-sm">
              <button
                disabled={isPending}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike();
                }}
                className={`flex items-center gap-1 transition-all duration-200 cursor-pointer
                  ${question.isLiked
                    ? "text-red-500"
                    : "text-white/60 hover:text-red-400"
                  }
                  ${isPending ? "opacity-50" : ""}
                `}
              >
                <Heart
                  size={18}
                  fill={question.isLiked ? "currentColor" : "none"}
                />
                {question.likeCount}
              </button>
              <button
                onClick={() => toggleBookmark()}
                className={`flex  gap-1 transition cursor-pointer pr-1 ${question.bookmarked
                  ? "text-gray-400"
                  : "hover:text-white"
                  }`}
              >
                <Bookmark
                  size={18}
                  fill={question.bookmarked ? "currentColor" : "none"}
                />
                <span>BookMark</span>
              </button>
              <button
                onClick={replyButton}
                className="flex items-center gap-1 pr-1 text-white/60 hover:text-white cursor-pointer"
              >
                <CornerUpRight size={16} />
                Reply
              </button>

              <button
                onClick={() => router.push(`/qa/question/${question.id}`)}
                className="text-white/60 hover:text-white cursor-pointer"
              >
                View →
              </button>
            </div>
          </div>
        </div>
      </Card>
      <Separator className="bg-white/10" />
    </>
  );
};

export default Question;
