"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileCode } from "lucide-react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { QuestionWithExtras } from "@/types/question";
import QuestionHeader from "./QuestionHeader";

type Props = {
  question: QuestionWithExtras;
};

const Question = ({ question }: Props) => {
  const [open, setOpen] = useState(false);

  const copyButton = (e: any) => {
    e.stopPropagation();
    navigator.clipboard.writeText(question.description);
    toast.success("Question copied successfully")
  }
  return (
    <>
      <Card
        onClick={() => setOpen(true)}
        className="
          relative overflow-hidden
          cursor-pointer
          rounded-xl
          bg-black
          p-5
          border-none
          transition-all duration-300
          hover:border-cyan-400/40
        "
      >
        {/* <div className="pointer-events-none absolute inset-0">
          <div
            className="
              absolute right-1 left-55
              h-80 w-80
              rounded-full
              bg-purple-500/20
              blur-3xl
            "
          />
          
          <div
            className="
              absolute bottom-0 right-12
              h-80 w-80
              rounded-full
              bg-cyan-500/20
              blur-3xl
            "
          />
          <div className="absolute inset-0 bg-linear-to-br from-white/5 via-transparent to-transparent" />
        </div> */}

        <div className="relative z-10 flex flex-col gap-3">
          <QuestionHeader user={question.user} />

          <h3 className="text-lg font-semibold text-white line-clamp-1">
            {question.title}
          </h3>

          <p className="text-sm text-white/60 line-clamp-2">
            {question.description}
          </p>
        </div>
      </Card>
      <Separator className="bg-white/20" />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl border-white/10 bg-black text-white">
          <h2 className="text-xl font-semibold">{question.title}</h2>
          <p className="text-sm text-white/60">{question.description}</p>

          <Separator className="my-2 bg-white/10" />


          <Button
            variant="secondary"
            className="mt-3 w-fit"
            onClick={copyButton}
          >
            Copy Question
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Question;
