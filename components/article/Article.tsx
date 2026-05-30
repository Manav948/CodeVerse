"use client";

import Image from "next/image";
import { Card } from "../ui/card";
import { Bookmark, Heart } from "lucide-react";
import { ArticleWithExtras } from "@/types/article";
import ArticleHeader from "./ArticleHeader";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostWithExtras } from "@/types/post";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import CommentDropdown from "@/components/comment/CommentDropdown";

type Props = {
  article: ArticleWithExtras;
};

const Article = ({ article }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();

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
              likeCount: p.isLiked ? p.likeCount - 1 : p.likeCount + 1,
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
      const previousArticle = queryClient.getQueryData<ArticleWithExtras[]>(["article"]);
      queryClient.setQueryData<ArticleWithExtras[]>(["article"], (old) =>
        old?.map((s) =>
          s.id === article.id ? { ...s, bookmarked: !s.bookmarked } : s
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

  return (
    <>
      <Card className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-[#0d0d0e] hover:bg-[#111113] hover:border-white/[0.11] transition-all duration-200 mb-3 shadow-sm">
        <div className="p-5 space-y-3.5">

          <ArticleHeader user={article.user} />

          <div className="h-px bg-white/[0.05]" />

          <h3 className="text-[15px] font-semibold leading-snug tracking-tight text-white/95">
            {article.title}
          </h3>

          <p className="text-[13px] text-white/55 leading-relaxed line-clamp-3">
            {article.description}
          </p>

          
          {article.image.length > 0 && (
            <div
              className={`grid gap-1.5 rounded-lg overflow-hidden border border-white/[0.06] bg-[#070708] w-full aspect-[16/9] max-h-[180px] sm:max-h-[220px] ${
                article.image.length === 1
                  ? "grid-cols-1"
                  : article.image.length === 2
                  ? "grid-cols-2"
                  : "grid-cols-2 grid-rows-2"
              }`}
            >
              {article.image.slice(0, 4).map((img, idx) => {
                let cellClass = "relative overflow-hidden bg-white/[0.02]";
                if (article.image.length === 3) {
                  if (idx === 0) cellClass += " row-span-2 col-span-1";
                  else cellClass += " row-span-1 col-span-1";
                }
                return (
                  <div key={idx} className={cellClass}>
                    <Image
                      src={img}
                      alt="Article image"
                      fill
                      className="object-cover hover:scale-[1.02] transition-transform duration-300"
                    />
                  </div>
                );
              })}
            </div>
          )}

       
          {article.articleTags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {article.articleTags.slice(0, 3).map((tag) => (
                <span
                  key={tag.id}
                  className="inline-flex text-[11px] font-medium text-white/45 bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded-md"
                >
                  #{tag.name}
                </span>
              ))}
              {article.articleTags.length > 3 && (
                <span className="text-[11px] text-white/30 self-center">
                  +{article.articleTags.length - 3} more
                </span>
              )}
            </div>
          )}

          
          <div className="pt-1 flex items-center justify-between text-[12px] text-white/30">
            <span className="tabular-nums">
              {new Date(article.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
            </span>

            <div className="flex items-center gap-1">
              
              <button
                disabled={isPending}
                onClick={() => toggleLike()}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md transition-all duration-150 cursor-pointer group/like
                  ${article.isLiked ? "text-red-500" : "text-white/35 hover:text-red-400"}
                  ${isPending ? "opacity-40 cursor-not-allowed" : ""}
                `}
              >
                <div className="p-0.5 rounded-full group-hover/like:bg-red-500/10 transition-colors">
                  <Heart
                    size={14}
                    fill={article.isLiked ? "currentColor" : "none"}
                    className="transition-transform duration-150"
                  />
                </div>
                <span className="tabular-nums font-medium">{article.likeCount}</span>
              </button>

              
              <button
                onClick={() => toggleBookmark()}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md transition-all duration-150 cursor-pointer group/bm
                  ${article.bookmarked ? "text-amber-400" : "text-white/35 hover:text-amber-400"}
                `}
              >
                <div className="p-0.5 rounded-full group-hover/bm:bg-amber-400/10 transition-colors">
                  <Bookmark size={14} fill={article.bookmarked ? "currentColor" : "none"} />
                </div>
                <span className="font-medium">Save</span>
              </button>

              <CommentDropdown
                entityId={article.id}
                entityType="article"
                initialCommentCount={article.commentCount ?? article.comments?.length ?? 0}
              />

              <button
                onClick={() => router.push(`/article/${article.id}`)}
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

export default Article;
