"use client";

import { useState } from "react";
import { PostWithExtras } from "@/types/post";
import Image from "next/image";
import { Card } from "../ui/card";
import PostHeader from "./PostHeader";
import { Bookmark, EllipsisVertical, Heart } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import CommentDropdown from "@/components/comment/CommentDropdown";

type Props = {
  post: PostWithExtras;
};

const PostCard = ({ post }: Props) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  console.log(post);

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
      <Card className="group relative overflow-hidden rounded-xl border border-white/10 bg-black transition-all duration-300 mb-4 shadow-[0_8px_30px_rgb(0,0,0,0.5)] backdrop-blur-md">

        <div className="absolute top-0 inset-x-0 h-0.5 bg-linear-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="p-5 space-y-4">
          <div className="flex justify-between items-start">
            <PostHeader user={post.user} />
            <button className="flex h-7 w-7 items-center justify-center rounded-md text-white/30 hover:text-white/70 hover:bg-white/6 transition-all focus:outline-none">
              <EllipsisVertical className="h-4 w-4" />
            </button>
          </div>

          <div className="h-px border-t border-dashed border-white/6" />

          <h3 className="text-[15.5px] font-semibold leading-snug tracking-tight text-white/90 group-hover:text-white transition-colors duration-200">
            {post.title}
          </h3>

          <p className="text-[13px] text-white/50 leading-relaxed line-clamp-3 font-normal">
            {post.description}
          </p>

          {post.image.length > 0 && (
            <div
              className={`grid gap-2 rounded-lg overflow-hidden border border-white/5 bg-[#050506] w-full aspect-video max-h-45 sm:max-h-55 ${post.image.length === 1
                  ? "grid-cols-1"
                  : post.image.length === 2
                    ? "grid-cols-2"
                    : "grid-cols-2 grid-rows-2"
                }`}
            >
              {post.image.slice(0, 4).map((img, idx) => {
                let cellClass = "relative overflow-hidden bg-white/[0.01] group/img";
                if (post.image.length === 3) {
                  if (idx === 0) {
                    cellClass += " row-span-2 col-span-1";
                  } else {
                    cellClass += " row-span-1 col-span-1";
                  }
                }
                return (
                  <div key={idx} className={cellClass}>
                    <Image
                      src={img}
                      alt="Post image"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover hover:scale-[1.03] transition-transform duration-500"
                    />
                  </div>
                );
              })}
            </div>
          )}

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag.id}
                  className="inline-flex text-[10px] font-mono text-white/45 bg-white/3 border border-white/5 px-2 py-0.5 rounded hover:bg-white/6 hover:text-white transition-colors cursor-default"
                >
                  #{tag.name}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="text-[10px] font-mono text-white/30 self-center">
                  +{post.tags.length - 3} more
                </span>
              )}
            </div>
          )}

          <div className="pt-1 flex items-center justify-between text-[11.5px] text-white/35">
              <span className="mr-2 tabular-nums text-white/25 text-[11.5px]">
                {new Date(post.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
              </span>

            <div className="flex items-center gap-1.5">
              <button
                disabled={isPending}
                onClick={() => toggleLike()}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 group/like
                  ${post.isLiked ? "text-rose-500 bg-rose-500/3 border border-rose-500/20" : "text-white/35 hover:text-rose-400 hover:bg-rose-500/4 border border-transparent"}
                  ${isPending ? "opacity-40 cursor-not-allowed" : ""}
                `}
              >
                <div className="p-0.5 rounded-full transition-colors">
                  <Heart
                    size={13.5}
                    fill={post.isLiked ? "currentColor" : "none"}
                    className="transition-transform duration-150"
                  />
                </div>
                <span className="tabular-nums font-mono font-medium">{post.likeCount}</span>
              </button>

              <button
                onClick={() => toggleBookmark()}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 group/bm
                  ${post.bookmarked ? "text-amber-400 bg-amber-400/3 border border-amber-400/20" : "text-white/35 hover:text-amber-400 hover:bg-amber-400/4 border border-transparent"}
                `}
              >
                <div className="p-0.5 rounded-full transition-colors">
                  <Bookmark size={13.5} fill={post.bookmarked ? "currentColor" : "none"} />
                </div>
                <span className="font-mono font-medium text-[11px] hidden sm:inline">Save</span>
              </button>

              <CommentDropdown
                entityId={post.id}
                entityType="post"
                initialCommentCount={post.commentCount ?? post.comments?.length ?? 0}
              />

              <button
                onClick={() => router.push(`/dashboard/${post.id}`)}
                className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-md border border-white/4 bg-white/2 text-white/40 hover:text-white hover:bg-white/6 hover:border-white/8 transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 font-mono text-[11px]"
              >
                <span className="hidden sm:inline">View</span>
                <span className="text-white/20 group-hover:translate-x-0.5 transition-transform duration-200">→</span>
              </button>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default PostCard;
