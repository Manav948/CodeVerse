"use client";

import { BookmarkItem } from "@/types/bookmark";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import PostCard from "../post/Post";
import SnippetCard from "../snippet/Snippet";
import Question from "../question/Question";
import Article from "../article/Article";
import Loader from "../ui/Loading";


const tabs = ["all", "post", "snippet", "question", "article"] as const;
type TabType = (typeof tabs)[number];

const BookMarks = () => {
  const [activeTab, setActiveTab] = useState<TabType>("all");

  const { data, isLoading, isError, error } =
    useQuery<BookmarkItem[]>({
      queryKey: ["bookmarks"],
      queryFn: async () => {
        const res = await axios.get("/api/bookmark/get");
        return res.data;
      },
    });

  if (isLoading) {
    return (
      <div className="text-white/60 animate-pulse flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500">
        {(error as Error).message}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-white/50">
        No bookmarks found.
      </div>
    );
  }

  const filtered =
    activeTab === "all"
      ? data
      : data.filter((item) => item.type === activeTab);

  return (
    <div className="space-y-8 mt-5">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">
          Your Bookmarks
        </h2>
        <p className="text-white/50 text-sm mb-5">
          All saved posts, snippets, questions and articles.
        </p>
      </div>
      <Card className="bg-black border border-white/10 rounded-xl p-3">
        <nav className="flex gap-6 text-sm">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`capitalize transition ${
                activeTab === tab
                  ? "text-white font-semibold"
                  : "text-white/50 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </Card>
      <div className="space-y-6 mt-5">
        {filtered.map((item, index) => {
          switch (item.type) {
            case "post":
              return (
                <PostCard
                  key={index}
                  post={item.data}
                />
              );

            case "snippet":
              return (
                <SnippetCard
                  key={index}
                  snippet={item.data}
                />
              );

            case "question":
              return (
                <Question
                  key={index}
                  question={item.data}
                />
              );

            case "article":
              return (
                <Article
                  key={index}
                  article={item.data}
                />
              );

            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default BookMarks;
