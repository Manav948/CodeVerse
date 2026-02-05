"use client";

import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

import { addSnippetSchema, AddSnippetSchema } from "@/schema/addSnippetSchema";

const AddSnippet = () => {
  const router = useRouter();

  const form = useForm<AddSnippetSchema>({
    resolver: zodResolver(addSnippetSchema),
    defaultValues: {
      title: "",
      description: "",
      code: "",
      language: "JAVASCRIPT",
      visibility: "PUBLIC",
      tags: [],
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: AddSnippetSchema) => {
      await axios.post("/api/snippet/add", data);
    },
    onSuccess: () => {
      toast.success("Snippet created successfully");
      router.push("/snippet");
    },
    onError: (err: AxiosError) => {
      toast.error("Failed to create snippet");
    },
  });

  const onSubmit = (data: AddSnippetSchema) => {
    mutate(data);
  };

  return (
    <div className="mx-auto max-w-3xl py-10">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        {/* ambient gradients */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

        <h1 className="mb-6 text-2xl font-semibold text-white">
          Create Snippet
        </h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Snippet title"
                      {...field}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Short description"
                      {...field}
                      className="bg-white/5 border-white/10 text-white min-h-20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Language */}
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. JAVASCRIPT"
                      {...field}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Code */}
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Paste your code here"
                      {...field}
                      className="bg-black/40 border-white/10 text-white min-h-50 font-mono"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tags */}
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. react, nextjs, prisma"
                      className="bg-white/5 border-white/10 text-white"
                      onChange={(e) =>
                        field.onChange(
                          e.target.value
                            .split(",")
                            .map((t) => t.trim())
                            .filter(Boolean)
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button
              disabled={isPending}
              type="submit"
              className="
                mt-4 h-11 rounded-xl
                bg-linear-to-r from-purple-500 to-cyan-500
                text-white font-semibold
                hover:opacity-90
              "
            >
              {isPending ? "Creating..." : "Create Snippet"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddSnippet;
