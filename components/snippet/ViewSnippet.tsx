"use client";

import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { SnippetWithExtras } from "@/types/snippet";
import PostHeader from "../post/PostHeader";
import { Copy, Check, CircleX, FileCode } from "lucide-react";
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
    toast.success("Snippet copied");
  };

  const router = useRouter();
  const onClose = () => {
    router.push("/snippet");
  };

  return (
    <div className="flex justify-center px-4 py-6">
      <div className="relative w-full max-w-2xl rounded-xl border border-white/6 bg-[#0d0d0e] text-white p-6 sm:p-8 space-y-5 shadow-xl">

      
        <button
          className="absolute top-1 right-4 flex items-center justify-center h-8 w-8 rounded-full text-white/40 hover:text-white hover:bg-white/8 transition-all"
          onClick={onClose}
        >
          <CircleX size={16} />
        </button>

     
        <div className="mt-2">
          <PostHeader user={snippet.user} />
        </div>

        <div className="h-px bg-white/5" />

        
        <div className="space-y-1.5">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight leading-snug text-white">
            {snippet.title}
          </h1>
          <p className="text-[11.5px] text-white/30 tabular-nums">
            Posted on {new Date(snippet.created_at).toLocaleString()}
          </p>
        </div>

        <p className="text-[13.5px] sm:text-[14.5px] leading-relaxed text-white/75 whitespace-pre-wrap">
          {snippet.description}
        </p>


        <div className="rounded-lg overflow-hidden border border-white/6 bg-[#070708]">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-white/1">
            <div className="flex items-center gap-2">
              {/* Red, Yellow, Green mock dots */}
              <div className="flex gap-1.5 mr-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/60"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/60"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]/60"></span>
              </div>
              <FileCode size={13} className="text-white/30" />
              <span className="text-[11px] font-mono text-white/40 font-medium">
                {snippet.language ?? "code"}
              </span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/4 hover:bg-white/8 border border-white/6 text-[11px] text-white/50 hover:text-white transition-all active:scale-95"
            >
              {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
              <span>{copied ? "Copied!" : "Copy"}</span>
            </button>
          </div>
  
          <pre
            style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}
            className="p-5 text-[12px] overflow-x-auto text-white/80 leading-relaxed bg-white/10"
          >
            <code style={{ fontFamily: 'inherit' }}>{snippet.code}</code>
          </pre>
        </div>


        {snippet.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {snippet.tags.map((tag) => (
              <span
                key={tag.id}
                className="inline-flex text-[11px] font-medium text-white/45 bg-white/4 border border-white/6 px-2 py-0.5 rounded-md hover:bg-white/[0.07] transition-colors cursor-default"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewSnippet;