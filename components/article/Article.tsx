"use client";

import { useState } from "react";
import { PostWithExtras } from "@/types/post";
import Image from "next/image";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Bookmark, Heart, MessageCircle } from "lucide-react";
import { ArticleWithExtras } from "@/types/article";
import ArticleHeader from "./ArticleHeader";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

type Props = {
  article: ArticleWithExtras;
};

const Article = ({ article }: Props) => {
  const queryClient = useQueryClient()
  const { mutate: toggleLike, isPending } = useMutation({
    mutationFn: async () => {
      await axios.post(`/api/article/likes/${article.id}`);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["article"] });

      const previousPosts = queryClient.getQueryData<PostWithExtras[]>(["article"]);

      queryClient.setQueryData<PostWithExtras[]>(["article"], (old) =>
        old?.map((p) =>
          p.id === article.id
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

      return { previousPosts };
    },

    onError: (err, variables, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(["article"], context.previousPosts);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["article"] });
    },
  });

  const { mutate: toggleBookmark, isPending: isBookmarking } = useMutation({
    mutationFn: async () => {
      await axios.post(`/api/article/bookmark/${article.id}`);
    },

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["article"] });

      const previousArticle =
        queryClient.getQueryData<ArticleWithExtras[]>(["article"]);

      queryClient.setQueryData<ArticleWithExtras[]>(["article"], (old) =>
        old?.map((s) =>
          s.id === article.id
            ? { ...s, bookmarked: !s.bookmarked }
            : s
        ) || []
      );

      return { previousArticle };
    },

    onError: (_err, _vars, context) => {
      if (context?.previousArticle) {
        queryClient.setQueryData(["article"], context.previousArticle);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["article"] });
    },

    onSuccess: () => {
      toast.success("Bookmark Successfully");
    },
  });

  console.log(article)
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
          <ArticleHeader user={article.user} />

          <h3 className="text-lg font-semibold leading-snug text-white">
            {article.title}
          </h3>

          <p className="text-sm text-white/70 leading-relaxed line-clamp-3">
            {article.description}
          </p>

          {article.image.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {article.image.slice(0, 4).map((img, idx) => (
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

          {article.articleTags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {article.articleTags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag.id}
                  className="bg-white/10 text-white/70"
                >
                  #{tag.name}
                </Badge>
              ))}
              {article.articleTags.length > 3 && (
                <span className="text-xs text-white/40">
                  +{article.articleTags.length - 3} more
                </span>
              )}
            </div>
          )}

          <Separator className="bg-white/10" />

          <div className="flex items-center justify-between text-xs text-white/50">
            <span>
              {new Date(article.created_at).toLocaleDateString()}
            </span>

            <div className="flex items-center gap-5">
              <button
                disabled={isPending}
                onClick={() => toggleLike()}
                className={`flex items-center gap-1 transition-all duration-200
                  ${article.isLiked ? "text-red-500 scale-105" : "hover:text-white"}
                ${isPending ? "opacity-50 cursor-not-allowed" : ""}
  `}
              >
                <Heart
                  size={16}
                  fill={article.isLiked ? "currentColor" : "none"}
                  className="transition-all duration-200"
                />
                <span>{article.likeCount}</span>
              </button>

              <button
                onClick={() => toggleBookmark()}
                className={`flex items-center gap-2 transition ${article.bookmarked
                  ? "text-yellow-400"
                  : "hover:text-white"
                  }`}
              >
                <Bookmark
                  size={18}
                  fill={article.bookmarked ? "currentColor" : "none"}
                />
                <span>BookMark</span>
              </button>
              <button className="flex items-center gap-1 hover:text-white">
                <MessageCircle size={16} /> Comment
              </button>
              <button
                className="hover:text-white font-medium"
              >
                View →
              </button>
            </div>
          </div>
        </div>
      </Card>

    </>
  );
};

export default Article;
