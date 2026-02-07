"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SnippetWithExtras } from "@/types/snippet";
import { FileCode } from "lucide-react";
import SnippetHeader from "./SnippetHeader";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

type Props = {
  snippet: SnippetWithExtras;
};

const SnippetCard = ({ snippet }: Props) => {
  const [open, setOpen] = useState(false);

  const copyButton = (e: any) => {
    e.stopPropagation();
    navigator.clipboard.writeText(snippet.code);
    toast.success("Snippet copied successfully")
  }
  return (
    <>
      <Card
        onClick={() => setOpen(true)}
        className="
          relative overflow-hidden
          cursor-pointer
          rounded-xl
          bg-black
          p-5
          border-none
          transition-all duration-300
          hover:border-cyan-400/40
        "
      >
        {/* <div className="pointer-events-none absolute inset-0">
          <div
            className="
              absolute right-1 left-55
              h-80 w-80
              rounded-full
              bg-purple-500/20
              blur-3xl
            "
          />
          
          <div
            className="
              absolute bottom-0 right-12
              h-80 w-80
              rounded-full
              bg-cyan-500/20
              blur-3xl
            "
          />
          <div className="absolute inset-0 bg-linear-to-br from-white/5 via-transparent to-transparent" />
        </div> */}

        <div className="relative z-10 flex flex-col gap-3">
          <SnippetHeader user={snippet.user} />

          <h3 className="text-lg font-semibold text-white line-clamp-1">
            {snippet.title}
          </h3>

          <p className="text-sm text-white/60 line-clamp-2">
            {snippet.description}
          </p>

          <div
            className="
              relative rounded-xl
              bg-white/5
              p-4
              text-xs text-white/80
              font-mono
              line-clamp-3
            "
          >
            {snippet.code}
            <FileCode
              size={16}
              className="absolute right-3 bottom-3 text-white/30"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
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
          </div>
        </div>
      </Card>
      <Separator className="bg-white/20" />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl border-white/10 bg-black text-white">
          <h2 className="text-xl font-semibold">{snippet.title}</h2>
          <p className="text-sm text-white/60">{snippet.description}</p>

          <Separator className="my-2 bg-white/10" />

          <pre className="mt-2 max-h-[60vh] overflow-auto rounded-xl bg-white/5 p-4 text-sm">
            <code>{snippet.code}</code>
          </pre>

          <Button
            variant="secondary"
            className="mt-3 w-fit"
            onClick={copyButton}
          >
            Copy Snippet
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SnippetCard;
