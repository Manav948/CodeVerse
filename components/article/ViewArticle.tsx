"use client";

import React from "react";
import { ArticleWithExtras } from "@/types/article";
import ArticleHeader from "./ArticleHeader";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";
import { CircleX } from "lucide-react";

type Props = {
  article: ArticleWithExtras;
};

const ViewArticle = ({ article }: Props) => {
  const router = useRouter()
  const onClose = () => {
    router.push("/article")
  }
  return (
    <div className="flex justify-center px-4">
      <div
        className="w-full max-w-3xl rounded-2xl border border-white/10 bg-black text-white
        backdrop-blur-xl p-6 space-y-6"
      >
        <button
          className="absolute top-4 right-4 flex items-center h-9 w-9 rounded-full justify-center text-white/60 hover:text-white  transition"
          onClick={onClose}>
          <CircleX size={20} />
        </button>
        <div className="space-y-4 mt-10">
          <ArticleHeader user={article.user} />

          <h1 className="text-2xl sm:text-3xl font-semibold leading-tight">
            {article.title}
          </h1>

          <p className="text-xs text-white/40">
            Posted on {new Date(article.created_at).toLocaleString()}
          </p>
        </div>

        <Separator className="bg-white/10" />
        <p className="text-sm sm:text-base leading-relaxed text-white/80 whitespace-pre-wrap">
          {article.description}
        </p>


        {article.image?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {article.image.map((img: string, idx: number) => (
              <div
                key={idx}
                className="relative aspect-video overflow-hidden rounded-xl border border-white/10"
              >
                <Image
                  src={img}
                  alt="Article image"
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
        {article.articleTags?.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {article.articleTags.map((tag: any) => (
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

export default ViewArticle;