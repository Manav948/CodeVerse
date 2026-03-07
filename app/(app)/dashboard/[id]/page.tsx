"use client";

import ViewPost from "@/components/post/ViewPost";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import Loader from "@/components/ui/Loading";
import Header from "@/components/dashboard/Header/Header";
import Sidebar from "@/components/dashboard/Sidebar";

export default function Page() {
  const params = useParams();
  const postId = params?.id as string;

  const { data: post, isLoading } = useQuery({
    queryKey: ["post", postId],
    queryFn: async () => {
      const res = await axios.get(`/api/post/view?postId=${postId}`);
      return res.data;
    },
    enabled: !!postId,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <Loader />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        Post not found
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
          <div className="mx-auto max-w-3xl px-4 py-10">
            <ViewPost post={post} />
          </div>
        </main>

      </div>
    </div>
  );
}