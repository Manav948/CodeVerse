"use client";

import React from "react";
import { QuestionWithExtras } from "@/types/question";
import { Separator } from "../ui/separator";
import { CircleX } from "lucide-react";
import QuestionHeader from "./QuestionHeader";
import { useRouter } from "next/navigation";
import { FormattedContent } from "./FormattedContent";

type Props = {
  question: QuestionWithExtras;
};

const ViewQuestion = ({ question }: Props) => {
  const router = useRouter();
  const onClose = () => {
    router.push("/qa");
  };

  return (
    <div className="flex justify-center px-4">
      <div
        className="w-full max-w-3xl rounded-2xl border border-white/10 bg-black text-white
        backdrop-blur-xl p-6 space-y-6"
      >
        <button
          className="absolute top-4 right-4 flex items-center h-9 w-9 rounded-full justify-center text-white/60 hover:text-white transition"
          onClick={onClose}
        >
          <CircleX size={20} />
        </button>

        <div className="space-y-4 mt-10">
          <QuestionHeader user={question.user} />

          <h1 className="text-2xl sm:text-3xl font-semibold leading-tight text-white/95">
            {question.title}
          </h1>

          <p className="text-xs text-white/40">
            Asked on {new Date(question.created_at).toLocaleString()}
          </p>
        </div>

        <Separator className="bg-white/10" />
        
        <div className="py-2">
          <FormattedContent text={question.description} />
        </div>
      </div>
    </div>
  );
};

export default ViewQuestion;