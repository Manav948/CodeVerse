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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <Loader />
      </div>
    );
  }

  if (!snippet) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        Snippet not found
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
           <ViewSnippet snippet={snippet} />
          </div>
        </main>

      </div>
    </div>
  );
}