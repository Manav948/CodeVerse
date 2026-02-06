"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SnippetWithExtras } from "@/types/snippet";
import Image from "next/image";
import { FileCode } from "lucide-react";

type Props = {
  snippet: SnippetWithExtras;
};

const SnippetCard = ({ snippet }: Props) => {
  const [open, setOpen] = useState(false);

  const userInitial =
    snippet.user?.username?.charAt(0).toUpperCase() ?? "U";

  return (
    <>
      {/* CARD */}
      <Card
        onClick={() => setOpen(true)}
        className="
          cursor-pointer
          rounded-2xl
          border border-white/10
          bg-white/5
          p-4
          backdrop-blur-xl
          transition-all
          hover:border-cyan-400/40
          hover:shadow-lg hover:shadow-cyan-500/10
        "
      >
        <div className="flex items-center gap-3">
          {snippet.user?.image ? (
            <Image
              src={snippet.user.image}
              alt="avatar"
              width={36}
              height={36}
              className="rounded-full"
            />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400 font-semibold">
              {userInitial}
            </div>
          )}

          <div className="flex flex-col">
            <span className="text-sm font-medium text-white">
              {snippet.user?.username}
            </span>
            <span className="text-xs text-white/40">
              posted a snippet
            </span>
          </div>
        </div>

        <h3 className="mt-3 text-lg font-semibold text-white line-clamp-1">
          {snippet.title}
        </h3>

     
        <p className="mt-1 text-sm text-white/60 line-clamp-2">
          {snippet.description}
        </p>

      
        <div className="mt-3 rounded-xl bg-black/60 p-3 text-xs text-white/80 line-clamp-3 font-mono">
          {snippet.code}
        </div>

       
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge className="bg-cyan-500/10 text-cyan-400">
            {snippet.language}
          </Badge>

          {snippet.tags.slice(0, 3).map((tag) => (
            <Badge
              key={tag.id}
              className="bg-white/10 text-white/70"
            >
              #{tag.name}
            </Badge>
          ))}

          {snippet.tags.length > 3 && (
            <span className="text-xs text-white/40">
              +{snippet.tags.length - 3} more
            </span>
          )}

          <FileCode className="ml-auto text-white/30" size={16} />
        </div>
      </Card>

  
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl border-white/10 bg-black/95 text-white">
          <h2 className="text-xl font-semibold">{snippet.title}</h2>
          <p className="text-sm text-white/60">{snippet.description}</p>

          <pre className="mt-4 max-h-[60vh] overflow-auto rounded-xl bg-black/70 p-4 text-sm">
            <code>{snippet.code}</code>
          </pre>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SnippetCard;
