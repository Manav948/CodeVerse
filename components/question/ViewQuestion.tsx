"use client";

import React from "react";
import { QuestionWithExtras } from "@/types/question";
import { Separator } from "../ui/separator";
import { CircleX, Copy } from "lucide-react";
import QuestionHeader from "./QuestionHeader";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


type Props = {
  question: QuestionWithExtras;
};

const ViewQuestion = ({ question }: Props) => {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(question.description);
    toast.success("Question copied");
  };

  const router = useRouter()
  const onClose = () => {
    router.push("/qa")
  }
  return (
    <div className="flex justify-center px-4">
      <div
        className="w-full max-w-3xl rounded-2xl border border-white/10 bg-black text-white
        backdrop-blur-xl p-6 space-y-6"
      >
        <button
          className="absolute top-4 right-4 flex items-center h-9 w-9 rounded-full justify-center text-white/60 hover:text-white  transition"
          onClick={onClose}>
          <CircleX size={20} />
        </button>

        <div className="space-y-4 mt-10">
          <QuestionHeader user={question.user} />

          <h1 className="text-2xl sm:text-3xl font-semibold leading-tight">
            {question.title}
          </h1>

          <p className="text-xs text-white/40">
            Asked on {new Date(question.created_at).toLocaleString()}
          </p>
        </div>

        <Separator className="bg-white/10" />
        <div className="rounded-xl border border-white/10 bg-neutral-950 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-black/40">
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 text-xs text-white/60 hover:text-white transition"
            >
              <Copy size={14} />
              Copy
            </button>
          </div>

          <pre className="p-5 text-sm sm:text-base leading-relaxed text-white/80 whitespace-pre-wrap font-mono bg-white/10">
            {question.description}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ViewQuestion;