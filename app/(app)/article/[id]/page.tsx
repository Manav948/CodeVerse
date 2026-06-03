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

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-3xl py-10 px-4">
            {isLoading ? (
              <div className="py-20 text-center text-white/50">
                <Loader />
              </div>
            ) : !article ? (
              <div className="text-center py-20 text-white/50">
                article not found
              </div>
            ) : (
              <ViewArticle article={article} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}