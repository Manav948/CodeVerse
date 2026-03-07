"use client";

import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { SnippetWithExtras } from "@/types/snippet";
import PostHeader from "../post/PostHeader";
import { Copy, Check, CircleX } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Props = {
  snippet: SnippetWithExtras;
};

const ViewSnippet = ({ snippet }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(snippet.code);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
    toast.success("Snippet copied")
  };
  const router = useRouter()
  const onClose = () => {
    router.push("/snippet")
  }

  return (
    <div className="flex justify-center px-4">
      <div
        className="w-full max-w-3xl rounded-2xl border border-white/10 bg-black text-white
        backdrop-blur-xl p-6 space-y-4"
      >
        <button
          className="absolute top-4 right-4 flex items-center h-9 w-9 rounded-full justify-center text-white/60 hover:text-white  transition"
          onClick={onClose}>
          <CircleX size={20} />
        </button>
        <div className="space-y-4 mt-10">
          <PostHeader user={snippet.user} />

          <h1 className="text-2xl sm:text-3xl font-semibold leading-tight">
            {snippet.title}
          </h1>

          <p className="text-xs text-white/40">
            Posted on {new Date(snippet.created_at).toLocaleString()}
          </p>
        </div>

        <Separator className="bg-white/10" />

        <p className="text-sm sm:text-base leading-relaxed text-white/80 whitespace-pre-wrap">
          {snippet.description}
        </p>

        <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0f0f0f]">
          <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-black/40">

            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <button
              onClick={handleCopy}
              className="
              flex items-center gap-2
              text-xs
              text-white/70
              hover:text-white
              transition
              "
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <pre className="p-5 text-sm overflow-x-auto font-mono text-white/90 bg-white/10">
            <code>{snippet.code}</code>
          </pre>
        </div>

        {snippet.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {snippet.tags.map((tag) => (
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

export default ViewSnippet;