"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Heart } from "lucide-react";
import axios from "axios";
import { QuestionDetails } from "@/types/getQuestion";
import { LoadingState } from "../ui/LoadingState";
import { Button } from "../ui/button";
import { useState, useRef } from "react";
import AddAnswer from "./Answer";

interface Props {
  questionId: string;
}

const GetQuestionDetails = ({ questionId }: Props) => {
  const queryClient = useQueryClient();
  const [showAnswerForm, setShowAnswerForm] =
    useState(false);
  const answerRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isError, error } =
    useQuery<QuestionDetails>({
      queryKey: ["questionDetails", questionId],
      queryFn: async () => {
        const res = await axios.get(
          `/api/Question/get/${questionId}`
        );
        return res.data;
      },
      enabled: !!questionId,
    });

  const { mutate: toggleQuestionLike } = useMutation({
    mutationFn: async () => {
      await axios.post(
        `/api/Question/likes/${questionId}`
      );
    },
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["questionDetails", questionId],
      });

      const previous =
        queryClient.getQueryData<QuestionDetails>([
          "questionDetails",
          questionId,
        ]);

      if (previous) {
        queryClient.setQueryData(
          ["questionDetails", questionId],
          {
            ...previous,
            isLiked: !previous.isLiked,
            likeCount: previous.isLiked
              ? previous.likeCount - 1
              : previous.likeCount + 1,
          }
        );
      }

      return { previous };
    },
    onError: (_, __, context) => {
      if (context?.previous) {
        queryClient.setQueryData(
          ["questionDetails", questionId],
          context.previous
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["questionDetails", questionId],
      });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <LoadingState />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-black text-red-500 flex items-center justify-center">
        {(error as Error).message}
      </div>
    );
  }

  if (!data) return null;

  const handleAnswerClick = () => {
    setShowAnswerForm(true);

    setTimeout(() => {
      answerRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-3xl px-6 py-10 space-y-10">

        {/* QUESTION CARD */}
        <Card className="border border-white/10 bg-white/5 backdrop-blur-xl p-6 rounded-2xl space-y-5">

          <h2 className="text-2xl text-white font-semibold">
            {data.title}
          </h2>

          <p className="bg-black/40 p-5 rounded-xl text-white/80 whitespace-pre-wrap leading-relaxed">
            {data.description}
          </p>

          <div className="flex items-center justify-between text-xs text-white/50">
            <div className="flex items-center gap-3">
              <span>{data.user.username}</span>
              <span>•</span>
              <span>
                {new Date(
                  data.created_at
                ).toLocaleDateString()}
              </span>
            </div>

            <button
              onClick={() => toggleQuestionLike()}
              className={`flex items-center gap-1 transition-all duration-200 ${
                data.isLiked
                  ? "text-red-500 scale-105"
                  : "hover:text-white"
              }`}
            >
              <Heart
                size={16}
                fill={
                  data.isLiked
                    ? "currentColor"
                    : "none"
                }
              />
              <span>{data.likeCount}</span>
            </button>
          </div>

          <Button
            onClick={handleAnswerClick}
            className="bg-linear-to-r from-purple-500 to-cyan-500"
          >
            Write Answer
          </Button>
        </Card>

        <Separator className="bg-white/10" />

        <div className="space-y-6">
          <h3 className="text-lg font-semibold">
            {data.answer.length} Answers
          </h3>

          {data.answer.length === 0 && (
            <div className="text-white/50 text-sm">
              No answers yet. Be the first one.
            </div>
          )}

          {data.answer.map((ans) => (
            <Card
              key={ans.id}
              className="bg-white/5 border border-white/10 p-5 rounded-xl space-y-3"
            >
              <div className="flex justify-between text-xs text-white/50">
                <div className="flex gap-3">
                  <span>{ans.user.username}</span>
                  <span>•</span>
                  <span>
                    {new Date(
                      ans.created_at
                    ).toLocaleDateString()}
                  </span>
                </div>

                <div
                  className={`flex items-center gap-1 ${
                    ans.isLiked
                      ? "text-red-500"
                      : "text-white/50"
                  }`}
                >
                  <Heart
                    size={14}
                    fill={
                      ans.isLiked
                        ? "currentColor"
                        : "none"
                    }
                  />
                  <span>{ans.likeCount}</span>
                </div>
              </div>

              <p className="text-sm text-white/80 whitespace-pre-wrap leading-relaxed">
                {ans.description}
              </p>
            </Card>
          ))}
        </div>

        {showAnswerForm && (
          <div ref={answerRef} className="mt-5">
            <AddAnswer questionId={questionId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default GetQuestionDetails;
