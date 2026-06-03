"use client";

import { BookmarkItem } from "@/types/bookmark";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import PostCard from "../post/Post";
import SnippetCard from "../snippet/Snippet";
import Question from "../question/Question";
import Article from "../article/Article";
import Loader from "../ui/Loading";
import NotFoundState from "../ui/notFound";
import { Bookmark } from "lucide-react";

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
      <div className="py-20 text-center text-white/50">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-400/80 text-[13px] px-1">
        {(error as Error).message}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <NotFoundState type="bookmark" />
      </div>
    );
  }

  const filtered =
    activeTab === "all"
      ? data
      : data.filter((item) => item.type === activeTab);

  return (
    <div className="space-y-6 mt-4">

      {/* Page header */}
      <div className="space-y-1 px-1">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06]">
            <Bookmark size={13} className="text-white/50" />
          </div>
          <h1 className="text-[17px] font-semibold text-white/90 tracking-tight">
            Bookmarks
          </h1>
        </div>
        <p className="text-[12.5px] text-white/35 pl-9">
          Saved posts, snippets, questions and articles.
        </p>
      </div>

      {/* Tab filter bar */}
      <div className="flex items-center gap-0.5 border border-white/[0.06] bg-[#0a0a0b] rounded-lg p-1 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`capitalize text-[12px] font-medium px-3 py-1.5 rounded-md transition-all duration-150
              ${activeTab === tab
                ? "bg-white/[0.08] text-white/90 shadow-sm"
                : "text-white/35 hover:text-white/65 hover:bg-white/[0.04]"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-[11.5px] text-white/25 px-1 tabular-nums">
        {filtered.length} {filtered.length === 1 ? "item" : "items"}
      </p>

      {/* Items list */}
      <div className="space-y-0">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-[13px] text-white/30">
            No saved {activeTab === "all" ? "items" : activeTab + "s"} yet.
          </div>
        ) : (
          filtered.map((item, index) => {
            switch (item.type) {
              case "post":
                return <PostCard key={index} post={item.data} />;
              case "snippet":
                return <SnippetCard key={index} snippet={item.data} />;
              case "question":
                return <Question key={index} question={item.data} />;
              case "article":
                return <Article key={index} article={item.data} />;
              default:
                return null;
            }
          })
        )}
      </div>
    </div>
  );
};

export default BookMarks;
