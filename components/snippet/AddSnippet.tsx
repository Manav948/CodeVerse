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
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
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

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Header />
      <div className="flex h-[calc(100vh-64px)]">
        <aside className="hidden md:block w-64 shrink-0 border-r border-white/10">
          <Sidebar />
        </aside>

        <main className="relative flex-1 overflow-y-auto overflow-x-hidden">

          <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="relative mx-auto max-w-3xl p-8">
            <div
              className="
                rounded-3xl border border-white/10
                bg-black backdrop-blur-xl
                p-8
              "
            >
              <h1 className="mb-6 text-2xl font-semibold">
                Create Snippet
              </h1>

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
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Snippet title"
                            className="bg-white/5 border-white/10"
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
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Short description"
                            className="min-h-20 bg-white/5 border-white/10"
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
                          <FormLabel>Language</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger className="bg-white/5 border-white/10">
                                <SelectValue placeholder="Select language" />
                              </SelectTrigger>
                              <SelectContent className="bg-black border-white/10">
                                {SNIPPET_LANGUAGES.map((lang) => (
                                  <SelectItem
                                    key={lang}
                                    value={lang}
                                    className="text-white"
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
                          <FormLabel>Visibility</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger className="bg-white/5 border-white/10">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-black border-white/10 text-white p-1">
                                <SelectItem value="PUBLIC">Public</SelectItem>
                                <SelectItem value="PRIVATE">Private</SelectItem>
                                <SelectItem value="SHARED">Shared</SelectItem>
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
                        <FormLabel>Code</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Paste your code here"
                            className="
                              min-h-65
                              bg-black/60
                              border-white/10
                              font-mono text-sm
                            "
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
                        <FormLabel>Tags</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="react, nextjs, prisma"
                            className="bg-white/5 border-white/10"
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

                  <Button
                    type="submit"
                    disabled={isPending}
                    className="
                      h-11 w-full rounded-xl
                      bg-red-500/60
                      font-semibold text-white
                      hover:opacity-90
                    "
                  >
                    {isPending ? "Creating..." : "Create Snippet"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddSnippet;
