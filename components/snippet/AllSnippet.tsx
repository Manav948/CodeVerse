"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SnippetCard from "./Snippet";

const AllSnippet = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["snippets"],
    queryFn: async () => {
      const res = await axios.get("/api/snippet/getAll");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="py-20 text-center text-white/50">
        Loading snippets...
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="py-20 text-center text-white/50">
        No snippets found
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {data.map((snippet: any) => (
        <SnippetCard key={snippet.id} snippet={snippet} />
      ))}
    </div>
  );
};

export default AllSnippet;
