"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Heart, Send } from "lucide-react";
import axios from "axios";
import { QuestionDetails } from "@/types/getQuestion";
import { useState, useRef } from "react";
import AddAnswer from "./Answer";
import AnswerHeader from "./AnswerHeader";
import Loader from "../ui/Loading";
import { FormattedContent } from "../question/FormattedContent";

interface Props {
  questionId: string;
}

const GetQuestionDetails = ({ questionId }: Props) => {
  const queryClient = useQueryClient();
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const answerRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isError, error } =
    useQuery<QuestionDetails>({
      queryKey: ["questionDetails", questionId],
      queryFn: async () => {
        const res = await axios.get(`/api/Question/get/${questionId}`);
        return res.data;
      },
      enabled: !!questionId,
    });

  const { mutate: toggleQuestionLike } = useMutation({
    mutationFn: async () => {
      await axios.post(`/api/Question/likes/${questionId}`);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["questionDetails", questionId],
      });

      const previous = queryClient.getQueryData<QuestionDetails>([
        "questionDetails",
        questionId,
      ]);

      if (previous) {
        queryClient.setQueryData(["questionDetails", questionId], {
          ...previous,
          isLiked: !previous.isLiked,
          likeCount: previous.isLiked
            ? previous.likeCount - 1
            : previous.likeCount + 1,
        });
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
      <div className="py-20 text-center text-white/50">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-20 text-center text-red-400/80 text-[13px]">
        {(error as Error).message}
      </div>
    );
  }

  if (!data) return null;

  const handleAnswerClick = () => {
    setShowAnswerForm(true);
    setTimeout(() => {
      answerRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-8 space-y-6">

       
        <Card className="border border-white/6 bg-[#0d0d0e] rounded-xl p-6 space-y-4 shadow-sm">

          <h2 className="text-[18px] sm:text-[20px] font-bold tracking-tight leading-snug text-white">
            {data.title}
          </h2>

          <div className="py-1">
            <FormattedContent text={data.description} />
          </div>

          <div className="flex items-center justify-between text-[12px] text-white/30">
            <div className="flex items-center gap-2 tabular-nums">
              <span className="text-white/45 font-medium">@{data.user.username}</span>
              <span className="text-white/20">·</span>
              <span>{new Date(data.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</span>
            </div>

            <button
              onClick={() => toggleQuestionLike()}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md transition-all duration-150 cursor-pointer group/like
                ${data.isLiked ? "text-red-500" : "text-white/35 hover:text-red-400"}
              `}
            >
              <div className="p-0.5 rounded-full group-hover/like:bg-red-500/10 transition-colors">
                <Heart
                  size={14}
                  fill={data.isLiked ? "currentColor" : "none"}
                />
              </div>
              <span className="tabular-nums font-medium">{data.likeCount}</span>
            </button>
          </div>

          <button
            onClick={handleAnswerClick}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/8 text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/8 hover:border-white/[0.14] transition-all duration-150 cursor-pointer"
          >
            <Send size={13} />
            Write Answer
          </button>
        </Card>

        {/* Divider with answer count */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-white/5" />
          <span className="text-[11.5px] text-white/30 tabular-nums shrink-0">
            {data.answer.length} {data.answer.length === 1 ? "answer" : "answers"}
          </span>
          <div className="h-px flex-1 bg-white/5" />
        </div>

        {/* Empty state */}
        {data.answer.length === 0 && (
          <div className="py-12 text-center text-[13px] text-white/25">
            No answers yet — be the first to reply.
          </div>
        )}

        {/* Answer list */}
        <div className="space-y-3">
          {data.answer.map((ans) => (
            <Card
              key={ans.id}
              className="border border-white/6 bg-[#0d0d0e] rounded-xl p-5 space-y-3.5 shadow-sm"
            >
              <AnswerHeader user={ans.user} />

              <div className="h-px bg-white/5" />

              <div className="py-1">
                <FormattedContent text={ans.description} />
              </div>

              <div className="flex items-center justify-between text-[11.5px] text-white/25 pt-0.5">
                <span className="tabular-nums">
                  {new Date(ans.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                </span>

                <div
                  className={`flex items-center gap-1.5 ${
                    ans.isLiked ? "text-red-500" : "text-white/25"
                  }`}
                >
                  <Heart
                    size={13}
                    fill={ans.isLiked ? "currentColor" : "none"}
                  />
                  <span className="tabular-nums">{ans.likeCount}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Answer form */}
        {showAnswerForm && (
          <div ref={answerRef}>
            <AddAnswer questionId={questionId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default GetQuestionDetails;
