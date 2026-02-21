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
import { Button } from "../ui/button";
import { Send } from "lucide-react";

interface Props {
  questionId: string;
}

const AddAnswer = ({ questionId }: Props) => {
  const queryClient = useQueryClient();

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

  return (
    <div className="mt-10">
      <div
        className="
          rounded-2xl
          border border-white/10
          bg-black
          backdrop-blur-xl
          p-6
          space-y-6
        "
      >
        <h3 className="text-lg font-semibold text-white">
          Write Your Answer
        </h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-white">
                    Your Answer
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Explain your solution clearly and concisely..."
                      className="
                        min-h-40
                        resize-none
                        bg-black/40
                        border-white/10
                        text-white
                        focus:ring-2
                        focus:ring-purple-500/40
                        focus:border-purple-400/40
                      "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isPending}
                className="
                  h-11 px-6 rounded-xl
                  bg-red-500/60 
                  font-semibold text-white
                  hover:opacity-90
                  flex items-center gap-2
                "
              >
                <Send size={16} />
                {isPending ? "Submitting..." : "Submit Answer"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddAnswer;
