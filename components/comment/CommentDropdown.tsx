"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { MessageCircle, Send, X, User, Loader2 } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { CommentWithUser } from "@/types/post";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useIsMobile } from "@/hooks/use-mobile";

type Props = {
  entityId: string;
  entityType: "post" | "article";
  initialCommentCount?: number;
};

const CommentDropdown = ({ entityId, entityType, initialCommentCount = 0 }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const isMobile = useIsMobile();

  const apiPath = entityType === "post"
    ? `/api/comment/post/${entityId}`
    : `/api/comment/article/${entityId}`;

  const queryKey = ["comments", entityType, entityId];

  const { data: comments = [], isLoading } = useQuery<CommentWithUser[]>({
    queryKey,
    queryFn: async () => {
      const res = await axios.get(apiPath);
      return res.data;
    },
    enabled: isOpen,
    staleTime: 30_000,
  });

  const { mutate: addComment, isPending } = useMutation({
    mutationFn: async (text: string) => {
      const res = await axios.post(apiPath, { commentText: text });
      return res.data;
    },
    onSuccess: (newComment) => {
      queryClient.setQueryData<CommentWithUser[]>(queryKey, (old) =>
        old ? [newComment, ...old] : [newComment]
      );
      // Invalidate the parent list query so comment counts update
      queryClient.invalidateQueries({ queryKey: [entityType] });
      setCommentText("");
    },
  });

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [commentText]);



  const handleSubmit = () => {
    if (!commentText.trim() || isPending) return;
    addComment(commentText.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleSubmit();
    }
  };

  const commentCount = comments.length || initialCommentCount;

  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m`;
    if (hours < 24) return `${hours}h`;
    if (days < 7) return `${days}d`;
    return new Date(date).toLocaleDateString(undefined, { month: "short", day: "numeric" });
  };

  const renderCommentsContent = () => (
    <>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <MessageCircle size={14} className="text-blue-400" />
          <span className="text-[13px] font-semibold text-white/80">
            {isLoading ? "Comments" : `${comments.length} Comment${comments.length !== 1 ? "s" : ""}`}
          </span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="h-6 w-6 rounded-full flex items-center justify-center text-white/30 hover:text-white/70 hover:bg-white/[0.06] transition-colors"
        >
          <X size={12} />
        </button>
      </div>

      {/* Compose */}
      <div className="px-4 py-3 border-b border-white/[0.06] bg-[#0d0d0e]">
        <div className="flex gap-2.5">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 border border-white/[0.08] flex items-center justify-center shrink-0 mt-0.5">
            <User size={13} className="text-white/50" />
          </div>
          <div className="flex-1 min-w-0">
            <textarea
              ref={textareaRef}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add a comment..."
              rows={1}
              maxLength={500}
              className="w-full bg-transparent text-[13px] text-white/85 placeholder:text-white/25 resize-none outline-none leading-relaxed overflow-y-auto"
              style={{ scrollbarWidth: "none", minHeight: "36px", maxHeight: "96px" }}
            />
            <div className="flex items-center justify-between mt-1.5">
              <span className={`text-[11px] tabular-nums transition-colors ${
                commentText.length > 450
                  ? commentText.length > 490 ? "text-red-400" : "text-amber-400"
                  : "text-white/20"
              }`}>
                {commentText.length > 0 ? `${commentText.length}/500` : ""}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-white/20 hidden sm:block">⌘+Enter</span>
                <button
                  onClick={handleSubmit}
                  disabled={!commentText.trim() || isPending || commentText.length > 500}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-medium transition-colors
                    ${commentText.trim() && !isPending && commentText.length <= 500
                      ? "bg-blue-500 hover:bg-blue-400 text-white cursor-pointer"
                      : "bg-white/5 text-white/25 cursor-not-allowed"
                    }
                  `}
                >
                  {isPending ? <Loader2 size={11} className="animate-spin" /> : <Send size={11} />}
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comments list */}
      <div className="max-h-60 overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 size={18} className="animate-spin text-white/30" />
          </div>
        ) : comments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 gap-2">
            <MessageCircle size={22} className="text-white/15" />
            <p className="text-[12px] text-white/25">No comments yet. Be the first!</p>
          </div>
        ) : (
          <div className="divide-y divide-white/[0.04]">
            {comments.map((comment) => (
              <div key={comment.id} className="px-4 py-3 hover:bg-white/[0.02] transition-colors">
                <div className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 border border-white/[0.06] bg-white/[0.04]">
                    {comment.user.image ? (
                      <Image
                        src={comment.user.image}
                        alt={comment.user.name || "User"}
                        width={28}
                        height={28}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User size={13} className="text-white/40" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[12px] font-semibold text-white/80 truncate max-w-[120px]">
                        {comment.user.name || comment.user.username || "Anonymous"}
                      </span>
                      {comment.user.username && (
                        <span className="text-[11px] text-white/25 truncate max-w-[90px]">
                          @{comment.user.username}
                        </span>
                      )}
                      <span className="text-[11px] text-white/20 ml-auto shrink-0">
                        {formatRelativeTime(comment.created_at)}
                      </span>
                    </div>
                    <p className="text-[12.5px] text-white/65 leading-relaxed mt-0.5 break-words">
                      {comment.commentText}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );

  if (isMobile) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md transition-all duration-150 cursor-pointer group/cmt
            ${isOpen ? "text-blue-400 bg-blue-400/10" : "text-white/35 hover:text-blue-400 hover:bg-blue-400/10"}
          `}
        >
          <div className="p-0.5 rounded-full transition-colors">
            <MessageCircle size={14} fill={isOpen ? "currentColor" : "none"} />
          </div>
          <span className="font-medium tabular-nums hidden sm:inline">
            {commentCount > 0 ? commentCount : "Comment"}
          </span>
          {commentCount > 0 && (
            <span className="font-medium tabular-nums sm:hidden">
              {commentCount}
            </span>
          )}
        </button>

        {isOpen && typeof window !== "undefined" && createPortal(
          <>
            {/* Mobile: bottom sheet overlay */}
            <div
              className="fixed inset-0 z-40 bg-black/60"
              onClick={() => setIsOpen(false)}
            />
            <div
              className="fixed bottom-0 left-0 right-0 z-50 border border-white/[0.08] bg-[#0a0a0b] shadow-2xl shadow-black/60 overflow-hidden rounded-t-2xl animate-in fade-in-0 duration-150"
              style={{
                animation: "slideUpFade 0.15s ease-out forwards",
              }}
            >
              {renderCommentsContent()}
            </div>
          </>,
          document.body
        )}
      </div>
    );
  }

  // Desktop/Website using Popover to prevent container clipping
  return (
    <div className="relative">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md transition-all duration-150 cursor-pointer group/cmt
              ${isOpen ? "text-blue-400 bg-blue-400/10" : "text-white/35 hover:text-blue-400 hover:bg-blue-400/10"}
            `}
          >
            <div className="p-0.5 rounded-full transition-colors">
              <MessageCircle size={14} fill={isOpen ? "currentColor" : "none"} />
            </div>
            <span className="font-medium tabular-nums">
              {commentCount > 0 ? commentCount : "Comment"}
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          side="top"
          sideOffset={8}
          className="z-50 w-[360px] rounded-xl border border-white/[0.08] bg-[#0a0a0b] p-0 shadow-2xl shadow-black/60 overflow-hidden outline-none"
        >
          {renderCommentsContent()}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CommentDropdown;
