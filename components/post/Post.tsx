"use client";

import { useState } from "react";
import { PostWithExtras } from "@/types/post";
import Image from "next/image";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import PostHeader from "./PostHeader";
import { Bookmark, Heart, MessageCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "../ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Props = {
  post: PostWithExtras;
};
const PostCard = ({ post }: Props) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  console.log(post)

  const { mutate: toggleLike, isPending } = useMutation({
    mutationFn: async () => {
      await axios.post(`/api/post/likes/${post.id}`);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["post"] });

      const previousPosts = queryClient.getQueryData<PostWithExtras[]>(["post"]);

      queryClient.setQueryData<PostWithExtras[]>(["post"], (old) =>
        old?.map((p) =>
          p.id === post.id
            ? {
              ...p,
              isLiked: !p.isLiked,
              likeCount: p.isLiked
                ? p.likeCount - 1
                : p.likeCount + 1,
            }
            : p
        ) || []
      );
      router.refresh();

      return { previousPosts };
    },

    onError: (err, variables, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(["post"], context.previousPosts);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
  });

  const { mutate: toggleBookmark } = useMutation({
    mutationFn: async () => {
      await axios.post(`/api/post/bookmark/${post.id}`)
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["post"] })
      const previous = queryClient.getQueryData<PostWithExtras[]>(["post"])
      queryClient.setQueryData<PostWithExtras[]>(
        ["post"],
        (old) => old?.map((p) => p.id === post.id ? { ...p, bookmarked: !p.bookmarked } : p) || []
      )
      return { previous }
    },
    onError: (_, __, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["post"], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
    onSuccess: () => {
      toast.success("BookMarked Successfully")
    }
  })

  return (
    <>
      <Card
        className="
          relative overflow-hidden
          rounded-2xl
          bg-black/60
          backdrop-blur-xl
          transition
          hover:border-cyan-400/30
          mb-5 border-none
        "
      >
        <div className="relative p-5 space-y-4">
          <PostHeader user={post.user} />

          <h3 className="text-lg font-semibold leading-snug text-white">
            {post.title}
          </h3>

          <p className="text-sm text-white/70 leading-relaxed line-clamp-3">
            {post.description}
          </p>

          {post.image.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {post.image.slice(0, 4).map((img, idx) => (
                <div
                  key={idx}
                  className="relative aspect-video overflow-hidden rounded-xl border border-white/10"
                >
                  <Image
                    src={img}
                    alt="Post image"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag.id}
                  className="bg-white/10 text-white/70"
                >
                  #{tag.name}
                </Badge>
              ))}
              {post.tags.length > 3 && (
                <span className="text-xs text-white/40">
                  +{post.tags.length - 3} more
                </span>
              )}
            </div>
          )}

          <Separator className="bg-white/10" />

          <div className="flex items-center justify-between text-xs text-white/50">
            <span>
              {new Date(post.created_at).toLocaleDateString()}
            </span>

            <div className="flex items-center gap-5">
              <button
                disabled={isPending}
                onClick={() => toggleLike()}
                className={`flex items-center gap-1 transition-all duration-200 cursor-pointer
                  ${post.isLiked ? "text-red-500 scale-105" : "hover:text-white"}
                ${isPending ? "opacity-50 cursor-not-allowed" : ""}
  `}
              >
                <Heart
                  size={16}
                  fill={post.isLiked ? "currentColor" : "none"}
                  className="transition-all duration-200 cursor-pointer"
                />
                <span>{post.likeCount}</span>
              </button>

              <button
                onClick={() => toggleBookmark()}
                className={`flex  gap-2 transition cursor-pointer ${post.bookmarked
                  ? "text-gray-400"
                  : "hover:text-black"
                  }`}
              >
                <Bookmark
                  size={18}
                  fill={post.bookmarked ? "currentColor" : "none"}
                />
                <span>BookMark</span>
              </button>

              <button className="flex items-center gap-1 hover:text-white cursor-pointer">
                <MessageCircle size={16} /> Comment
              </button>
              <button
                onClick={() => setOpen(true)}
                className="hover:text-white font-medium cursor-pointer"
              >
                View →
              </button>
            </div>
          </div>
        </div>
      </Card>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="
            max-w-3xl
            border border-white/10
            bg-black text-white
            backdrop-blur-xl
          "
        >
          <DialogHeader className="space-y-4 mt-5">
            <PostHeader user={post.user} />

            <h2 className="text-2xl font-semibold leading-tight">
              {post.title}
            </h2>

            <p className="text-xs text-white/40">
              Posted on{" "}
              {new Date(post.created_at).toLocaleString()}
            </p>
          </DialogHeader>

          <Separator className="bg-white/10 my-4" />

          <p className="text-sm leading-relaxed text-white/80 whitespace-pre-wrap">
            {post.description}
          </p>
          {post.image.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {post.image.map((img, idx) => (
                <div
                  key={idx}
                  className="relative aspect-video overflow-hidden rounded-xl border border-white/10"
                >
                  <Image
                    src={img}
                    alt="Post image"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-4">
              {post.tags.map((tag) => (
                <Badge
                  key={tag.id}
                  className="bg-white/10 text-white/70"
                >
                  #{tag.name}
                </Badge>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PostCard;
