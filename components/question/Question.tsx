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
          p-6
          border border-white/5
          transition-all duration-300
          hover:border-cyan-400/30
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

          <div className="flex items-center justify-between text-xs text-white/50">

            <span>
              {new Date(question.created_at).toLocaleDateString()}
            </span>

            <div className="flex items-center gap-6 text-sm">
              <button
                disabled={isPending}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike();
                }}
                className={`flex items-center gap-2 transition-all duration-200
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
                className={`flex  gap-2 transition ${question.bookmarked
                  ? "text-yellow-400"
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
                className="flex items-center gap-2 text-white/60 hover:text-white"
              >
                <CornerUpRight size={16} />
                Reply
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(true);
                }}
                className="text-white/60 hover:text-white"
              >
                View →
              </button>

            </div>
          </div>
        </div>
      </Card>

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
          <DialogHeader className="space-y-4">
            <QuestionHeader user={question.user} />

            <h2 className="text-2xl font-semibold">
              {question.title}
            </h2>

            <p className="text-xs text-white/40">
              Posted on{" "}
              {new Date(question.created_at).toLocaleString()}
            </p>
          </DialogHeader>

          <Separator className="my-4 bg-white/10" />

          <p className="text-sm leading-relaxed text-white/80 whitespace-pre-wrap">
            {question.description}
          </p>

          <div className="flex items-center gap-6 mt-6">

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleLike();
              }}
              className={`flex items-center gap-2 ${question.isLiked
                ? "text-red-500"
                : "text-white/60 hover:text-red-400"
                }`}
            >
              <Heart
                size={18}
                fill={question.isLiked ? "currentColor" : "none"}
              />
              {question.likeCount}
            </button>

            <Button
              onClick={replyButton}
              className="bg-linear-to-r from-cyan-500 to-blue-500 hover:opacity-90"
            >
              Reply to Question
            </Button>

            <Button
              variant="secondary"
              onClick={copyButton}
            >
              Copy Question
            </Button>

          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Question;
