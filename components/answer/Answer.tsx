"use client";

import { addAnswerSchema, AddAnswerSchema } from "@/schema/addAnswerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Send } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  questionId: string;
}

const AddAnswer = ({ questionId }: Props) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const form = useForm<AddAnswerSchema>({
    resolver: zodResolver(addAnswerSchema),
    defaultValues: {
      questionId,
      description: "",
    },
  });

  const { mutate: addAnswer, isPending } = useMutation({
    mutationFn: async (data: AddAnswerSchema) => {
      const res = await axios.post("/api/answer/add", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Answer submitted successfully");
      form.reset({ questionId, description: "" });
      queryClient.invalidateQueries({
        queryKey: ["questionDetails", questionId],
      });
    },
    onError: () => {
      toast.error("Failed to submit answer");
    },
  });

  const onSubmit = (data: AddAnswerSchema) => {
    addAnswer(data);
  };

  const onClose = () => {
    router.push("/qa");
  };

  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#0d0d0e] p-5 space-y-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-[14px] font-semibold text-white/90 tracking-tight">
          Write Your Answer
        </h3>
        <button
          onClick={onClose}
          className="text-[11px] text-white/30 hover:text-white/60 transition-colors px-2 py-1 rounded-md hover:bg-white/[0.04] cursor-pointer"
        >
          Cancel
        </button>
      </div>

      <div className="h-px bg-white/[0.05]" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[12px] text-white/40 font-medium">
                  Your Answer
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Explain your solution clearly and concisely..."
                    className="min-h-36 resize-none bg-[#070708] border border-white/[0.06] text-white/85 text-[13px] placeholder:text-white/20 focus:border-white/[0.14] focus:ring-0 rounded-lg"
                  />
                </FormControl>
                <FormMessage className="text-[11px] text-red-400/80" />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.06] border border-white/[0.08] text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/[0.09] hover:border-white/[0.14] transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <Send size={13} />
              {isPending ? "Submitting…" : "Submit Answer"}
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddAnswer;
