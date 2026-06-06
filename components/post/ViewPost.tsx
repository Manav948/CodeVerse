"use client";

import React from "react";
import PostHeader from "./PostHeader";
import { PostWithExtras } from "@/types/post";
import Image from "next/image";
import { CircleX } from "lucide-react";
import { useRouter } from "next/navigation";
import CommentSection from "@/components/comment/CommentSection";

type Props = {
  post: PostWithExtras;
};

const ViewPost = ({ post }: Props) => {
  const router = useRouter();
  const onClose = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex justify-center px-4 py-6">
      <div className="relative w-full max-w-2xl rounded-xl border border-white/6 bg-[#0d0d0e] text-white p-6 sm:p-8 shadow-xl">

        <button
          className="absolute top-1 right-4 flex items-center justify-center h-8 w-8 rounded-full text-white/40 hover:text-white hover:bg-white/8 transition-all z-10"
          onClick={onClose}
        >
          <CircleX size={16} />
        </button>

        <div className="mt-2">
          <PostHeader user={post.user} />
        </div>

        <div className="h-px bg-white/5 my-4" />

       
        <div className="space-y-1.5">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight leading-snug text-white">
            {post.title}
          </h1>
          <p className="text-[11.5px] text-white/30 tabular-nums">
            Posted on {new Date(post.created_at).toLocaleString()}
          </p>
        </div>

       
        <p className="mt-4 text-[13.5px] sm:text-[14.5px] leading-relaxed text-white/75 whitespace-pre-wrap">
          {post.description}
        </p>

     
        {post.image?.length > 0 && (
          <div
            className={`mt-4 grid gap-1.5 rounded-lg overflow-hidden border border-white/6 bg-[#070708] w-full aspect-16/10 max-h-85 sm:max-h-95 ${
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

        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-4">
            {post.tags.map((tag) => (
              <span
                key={tag.id}
                className="inline-flex text-[11px] font-medium text-white/45 bg-white/4 border border-white/6 px-2 py-0.5 rounded-md hover:bg-white/[0.07] transition-colors cursor-default"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}

     
        <CommentSection entityId={post.id} entityType="post" />
      </div>
    </div>
  );
};

export default ViewPost;