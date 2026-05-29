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
      <Card className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-[#0d0d0e] hover:bg-[#111113] hover:border-white/[0.11] transition-all duration-200 mb-3 shadow-sm">
        <div className="p-5 space-y-3.5">

          <PostHeader user={post.user} />

        
          <div className="h-px bg-white/[0.05]" />

        
          <h3 className="text-[15px] font-semibold leading-snug tracking-tight text-white/95">
            {post.title}
          </h3>

       
          <p className="text-[13px] text-white/55 leading-relaxed line-clamp-3">
            {post.description}
          </p>

       
          {post.image.length > 0 && (
            <div
              className={`grid gap-1.5 rounded-lg overflow-hidden border border-white/[0.06] bg-[#070708] w-full aspect-[16/9] max-h-[180px] sm:max-h-[220px] ${
                post.image.length === 1
                  ? "grid-cols-1"
                  : post.image.length === 2
                  ? "grid-cols-2"
                  : "grid-cols-2 grid-rows-2"
              }`}
            >
              {post.image.slice(0, 4).map((img, idx) => {
                let cellClass = "relative overflow-hidden bg-white/[0.02]";
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
                      className="object-cover hover:scale-[1.02] transition-transform duration-300"
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
                  className="inline-flex text-[11px] font-medium text-white/45 bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded-md"
                >
                  #{tag.name}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="text-[11px] text-white/30 self-center">
                  +{post.tags.length - 3} more
                </span>
              )}
            </div>
          )}

        
          <div className="pt-1 flex items-center justify-between text-[12px] text-white/30">
            <span className="tabular-nums">
              {new Date(post.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
            </span>

            <div className="flex items-center gap-1">
             
              <button
                disabled={isPending}
                onClick={() => toggleLike()}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md transition-all duration-150 cursor-pointer group/like
                  ${post.isLiked ? "text-red-500" : "text-white/35 hover:text-red-400"}
                  ${isPending ? "opacity-40 cursor-not-allowed" : ""}
                `}
              >
                <div className="p-0.5 rounded-full group-hover/like:bg-red-500/10 transition-colors">
                  <Heart
                    size={14}
                    fill={post.isLiked ? "currentColor" : "none"}
                    className="transition-transform duration-150"
                  />
                </div>
                <span className="tabular-nums font-medium">{post.likeCount}</span>
              </button>

           
              <button
                onClick={() => toggleBookmark()}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md transition-all duration-150 cursor-pointer group/bm
                  ${post.bookmarked ? "text-amber-400" : "text-white/35 hover:text-amber-400"}
                `}
              >
                <div className="p-0.5 rounded-full group-hover/bm:bg-amber-400/10 transition-colors">
                  <Bookmark size={14} fill={post.bookmarked ? "currentColor" : "none"} />
                </div>
                <span className="font-medium">Save</span>
              </button>

              
              <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-white/35 hover:text-white/70 transition-all cursor-pointer group/cmt">
                <div className="p-0.5 rounded-full group-hover/cmt:bg-white/[0.06] transition-colors">
                  <MessageCircle size={14} />
                </div>
                <span className="font-medium">Comment</span>
              </button>

              <button
                onClick={() => router.push(`/dashboard/${post.id}`)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-white/35 hover:text-white/80 transition-all cursor-pointer font-medium"
              >
                View
                <span className="text-white/20">→</span>
              </button>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default PostCard;
