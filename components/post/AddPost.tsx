"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { addPostSchema, AddPostSchema } from "@/schema/addPostSchema";
import { uploadImages } from "@/lib/upload";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { ChipInput } from "../ui/ChipInput";
import { ImageDropZone } from "../ui/Drag-Drop";

import Header from "../dashboard/Header/Header";
import Sidebar from "../dashboard/Sidebar";
import { X } from "lucide-react";

const AddPost = () => {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<AddPostSchema>({
    resolver: zodResolver(addPostSchema),
    defaultValues: {
      title: "",
      description: "",
      image: [],
      links: [],
      tags: [],
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: AddPostSchema) => {
      let imageUrls: string[] = [];

      if (files.length > 0) {
        imageUrls = await uploadImages(files);
      }

      return axios.post("/api/post/add", {
        ...data,
        image: imageUrls,
      });
    },
    onSuccess: () => {
      toast.success("Post created successfully");
      router.push("/dashboard");
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to create post");
    },
  });

  const onClose = () => {
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-[#090909] text-white overflow-hidden">
      <Header />
      <div className="flex h-[calc(100vh-64px)]">
        <Sidebar />
        <main className="relative flex-1 overflow-y-auto overflow-x-hidden p-6 sm:p-8 bg-[#090909]">
          <div className="pointer-events-none absolute -top-32 -left-32 h-80 w-80 rounded-full bg-red-500/5 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-red-500/5 blur-3xl" />
          <div className="relative mx-auto max-w-3xl">
            <div className="relative p-6 sm:p-8 bg-[#111111] border border-white/5 rounded-2xl shadow-2xl space-y-8 text-white">
              
              <div className="space-y-2">
                <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-white/95">
                  Create Post
                </h1>
                <p className="text-xs sm:text-sm text-white/40 font-normal leading-relaxed">
                  Share text, links, and code snippets with the CodeVerse community.
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
                            placeholder="Post title"
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
                            placeholder="Write something about your post"
                            rows={5}
                            className="w-full bg-[#090909] border border-white/5 rounded-xl px-4 py-2.5 text-white focus:border-red-500/30 outline-none transition-colors text-sm placeholder-white/20 focus:ring-0 resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-2">
                    <FormLabel className="text-xs font-mono uppercase tracking-wider text-white/45">Images</FormLabel>
                    <ImageDropZone files={files} setFiles={setFiles} />
                    <p className="text-[10px] font-mono text-white/30">
                      Optional — upload post images
                    </p>
                  </div>

                  <FormField
                    control={form.control}
                    name="links"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-mono uppercase tracking-wider text-white/45">Links</FormLabel>
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
                        <FormLabel className="text-xs font-mono uppercase tracking-wider text-white/45">Tags</FormLabel>
                        <FormControl>
                          <ChipInput
                            {...field}
                            placeholder="Press Enter to add tag"
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
                    {isPending ? "Creating..." : "Create Post"}
                  </button>
                </form>
              </Form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddPost;
