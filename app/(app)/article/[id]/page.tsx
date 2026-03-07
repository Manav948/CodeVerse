"use client";

import ViewPost from "@/components/post/ViewPost";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import Loader from "@/components/ui/Loading";
import Header from "@/components/dashboard/Header/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import ViewSnippet from "@/components/snippet/ViewSnippet";
import ViewArticle from "@/components/article/ViewArticle";

export default function Page() {
  const params = useParams();
  const articleId = params?.id as string;

  const { data: article, isLoading } = useQuery({
    queryKey: ["article", articleId],
    queryFn: async () => {
      const res = await axios.get(`/api/article/view?articleId=${articleId}`);
      return res.data;
    },
    enabled: !!articleId,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <Loader />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        article not found
      </div>
    );
  }

  return (
    <div className="h-screen bg-black text-white flex flex-col">

      <Header />
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden md:block w-64 border-r border-white/10">
          <Sidebar />
        </aside>
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-3xl py-10">
           <ViewArticle article={article} />
          </div>
        </main>

      </div>
    </div>
  );
}