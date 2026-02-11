"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {  } from "@/schema/addPostSchema";
import { uploadImages } from "@/lib/upload";

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
import { ChipInput } from "../ui/ChipInput";
import { ImageDropZone } from "../ui/Drag-Drop";

import Header from "../dashboard/Header/Header";
import Sidebar from "../dashboard/Sidebar";
import { addArticleSchema, AddArticleSchema } from "@/schema/addArticleSchema";

const AddArticle = () => {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<AddArticleSchema>({
    resolver: zodResolver(addArticleSchema),
    defaultValues: {
      title: "",
      description: "",
      image: [],
      links: [],
      tags: [],
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: AddArticleSchema) => {
      let imageUrls: string[] = [];

      if (files.length > 0) {
        imageUrls = await uploadImages(files);
      }

      return axios.post("/api/article/add", {
        ...data,
        image: imageUrls,
      });
    },
    onSuccess: () => {
      toast.success("article created successfully");
      router.push("/article");
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to create article");
    },
  });

  return (
    <div className="h-screen bg-black text-white overflow-hidden">
      <Header />
      <div className="flex h-[calc(100vh-64px)]">
        <aside className="hidden md:block w-64 shrink-0 border-r border-white/10">
          <Sidebar />
        </aside>
        <main className="relative flex-1 overflow-y-auto overflow-x-hidden">
          <div className="pointer-events-none absolute -top-32 -left-32 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="relative mx-auto max-w-3xl px-4 py-10">
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
              <h1 className="mb-6 text-2xl font-semibold">
                Create Article
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
                            placeholder="Post title"
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
                            placeholder="Write something about your post"
                            className="min-h-30 bg-white/5 border-white/10"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-2">
                    <FormLabel>Images</FormLabel>
                    <ImageDropZone files={files} setFiles={setFiles} />
                    <p className="text-xs text-white/40">
                      Optional — upload post images
                    </p>
                  </div>

                  <FormField
                    control={form.control}
                    name="links"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Links</FormLabel>
                        <FormControl>
                          <ChipInput
                            {...field}
                            placeholder="Press Enter to add link"
                          />
                        </FormControl>
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
                          <ChipInput
                            {...field}
                            placeholder="Press Enter to add tag"
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
                      bg-linear-to-r from-purple-500 to-cyan-500
                      font-semibold text-white
                      hover:opacity-90
                    "
                  >
                    {isPending ? "Creating..." : "Create Article"}
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

export default AddArticle;
