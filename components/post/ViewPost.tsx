"use client";

import React from "react";
import PostHeader from "./PostHeader";
import { PostWithExtras } from "@/types/post";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { Badge } from "../ui/badge";

type Props = {
  post: PostWithExtras;
};

const ViewPost = ({ post }: Props) => {
  return (
    <div className="flex justify-center px-4 py-10">
      <div
        className="w-full max-w-3xl rounded-2xl border border-white/10 bg-black text-white
        backdrop-blur-xl p-6 space-y-6"
      >
        <div className="space-y-4">
          <PostHeader user={post.user} />

          <h1 className="text-2xl sm:text-3xl font-semibold leading-tight">
            {post.title}
          </h1>

          <p className="text-xs text-white/40">
            Posted on {new Date(post.created_at).toLocaleString()}
          </p>
        </div>

        <Separator className="bg-white/10" />

        <p className="text-sm sm:text-base leading-relaxed text-white/80 whitespace-pre-wrap">
          {post.description}
        </p>

        {post.image?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {post.tags.map((tag) => (
              <Badge
                key={tag.id}
                className="bg-white/10 text-white/70 hover:bg-white/20"
              >
                #{tag.name}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewPost;