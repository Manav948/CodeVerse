"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { addSnippetSchema, AddSnippetSchema } from "@/schema/addSnippetSchema";
import { SNIPPET_LANGUAGES, LANGUAGE_LABELS } from "@/lib/snippet-languages";

import Header from "../dashboard/Header/Header";
import Sidebar from "../dashboard/Sidebar";
import { X } from "lucide-react";

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
    mutationFn: (data: AddSnippetSchema) =>
      axios.post("/api/snippet/add", data),
    onSuccess: () => {
      toast.success("Snippet created");
      router.push("/snippet");
    },
    onError: () => toast.error("Failed to create snippet"),
  });

  const onClose = () => {
    router.push("/snippet")
  }
  return (
    <div className="min-h-screen bg-[#090909] text-white overflow-hidden">
      <Header />
      <div className="flex h-[calc(100vh-64px)]">
        <Sidebar />

        <main className="relative flex-1 overflow-y-auto overflow-x-hidden p-6 sm:p-8 bg-[#090909]">
          <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-red-500/5 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-red-500/5 blur-3xl" />
          <div className="relative mx-auto max-w-3xl">
            <div className="relative p-6 sm:p-8 bg-[#111111] border border-white/5 rounded-2xl shadow-2xl space-y-8 text-white">

              <div className="space-y-2">
                <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-white/95">
                  Create Snippet
                </h1>
                <p className="text-xs sm:text-sm text-white/40 font-normal leading-relaxed">
                  Share your code snippets cleanly with the CodeVerse developer community.
                </p>
                <button
                  type="button"
                  className="top-6 absolute right-6 flex items-center h-8 w-8 rounded-lg justify-center text-white/30 hover:text-white/80 hover:bg-white/5 border border-white/5 transition cursor-pointer"
                  onClick={onClose}
                >
                  <X size={15} />
                </button>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit((data) => mutate(data))}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-mono uppercase tracking-wider text-white/45">Title</FormLabel>
                        <FormControl>
                          <input
                            {...field}
                            placeholder="Snippet title"
                            className="w-full bg-[#090909] border border-white/5 rounded-xl px-4 py-2.5 text-white focus:border-red-500/30 outline-none transition-colors text-sm placeholder-white/20 focus:ring-0"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-mono uppercase tracking-wider text-white/45">Description</FormLabel>
                        <FormControl>
                          <textarea
                            {...field}
                            placeholder="Short description"
                            rows={3}
                            className="w-full bg-[#090909] border border-white/5 rounded-xl px-4 py-2.5 text-white focus:border-red-500/30 outline-none transition-colors text-sm placeholder-white/20 focus:ring-0 resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="language"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-mono uppercase tracking-wider text-white/45">Language</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger className="bg-[#090909] border border-white/5 p-3 rounded-xl text-white text-sm focus:border-red-500/30 focus:ring-0 h-10 select-trigger">
                                <SelectValue placeholder="Select language" />
                              </SelectTrigger>
                              <SelectContent className="bg-[#111111] text-white border border-white/5 shadow-2xl rounded-lg">
                                {SNIPPET_LANGUAGES.map((lang) => (
                                  <SelectItem
                                    key={lang}
                                    value={lang}
                                    className="cursor-pointer hover:bg-white/5  text-xs py-2 text-white"
                                  >
                                    {LANGUAGE_LABELS[lang] ?? lang}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="visibility"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-mono uppercase tracking-wider text-white/45">Visibility</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger className="bg-[#090909] border border-white/5 p-3 rounded-xl text-white text-sm focus:border-red-500/30 focus:ring-0 h-10 select-trigger">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-[#111111] text-white border border-white/5 shadow-2xl rounded-lg p-1">
                                <SelectItem value="PUBLIC" className="cursor-pointer hover:bg-white/5 text-xs py-2 text-white">Public</SelectItem>
                                <SelectItem value="PRIVATE" className="cursor-pointer hover:bg-white/5  text-xs py-2 text-white">Private</SelectItem>
                                <SelectItem value="SHARED" className="cursor-pointer hover:bg-white/5  text-xs py-2 text-white">Shared</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-mono uppercase tracking-wider text-white/45">Code</FormLabel>
                        <FormControl>
                          <textarea
                            {...field}
                            placeholder="Paste your code here"
                            className="w-full min-h-65 bg-[#090909] border border-white/5 rounded-xl px-4 py-2.5 text-white focus:border-red-500/30 outline-none transition-colors font-mono text-sm placeholder-white/20 focus:ring-0 resize-y"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-mono uppercase tracking-wider text-white/45">Tags</FormLabel>
                        <FormControl>
                          <input
                            placeholder="react, nextjs, prisma"
                            className="w-full bg-[#090909] border border-white/5 rounded-xl px-4 py-2.5 text-white focus:border-red-500/30 outline-none transition-colors text-sm placeholder-white/20 focus:ring-0"
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
                      </FormItem>
                    )}
                  />

                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full h-11 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium shadow-[0_0_20px_rgba(239,68,68,0.15)] transition-all cursor-pointer flex items-center justify-center gap-1.5 text-sm disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {isPending ? "Creating..." : "Create Snippet"}
                  </button>
                </form>
              </Form>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
};

export default AddSnippet;
