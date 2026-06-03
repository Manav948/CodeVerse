"use client";

import ViewPost from "@/components/post/ViewPost";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import Loader from "@/components/ui/Loading";
import Header from "@/components/dashboard/Header/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import ViewSnippet from "@/components/snippet/ViewSnippet";

export default function Page() {
  const params = useParams();
  const snippetId = params?.id as string;

  const { data: snippet, isLoading } = useQuery({
    queryKey: ["snippet", snippetId],
    queryFn: async () => {
      const res = await axios.get(`/api/snippet/view?postId=${snippetId}`);
      return res.data;
    },
    enabled: !!snippetId,
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
            ) : !snippet ? (
              <div className="text-center py-20 text-white/50">
                Snippet not found
              </div>
            ) : (
              <ViewSnippet snippet={snippet} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}