"use client";

import { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  Send,
  User,
  Loader2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { CommentWithUser } from "@/types/post";

type Props = {
  entityId: string;
  entityType: "post" | "article";
};

const CommentSection = ({ entityId, entityType }: Props) => {
  const [commentText, setCommentText] = useState("");
  const [showAll, setShowAll] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();

  const apiPath =
    entityType === "post"
      ? `/api/comment/post/${entityId}`
      : `/api/comment/article/${entityId}`;

  const queryKey = ["comments", entityType, entityId];

  const { data: comments = [], isLoading } = useQuery<CommentWithUser[]>({
    queryKey,
    queryFn: async () => {
      const res = await axios.get(apiPath);
      return res.data;
    },
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

  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return new Date(date).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
  };

  const displayedComments = showAll ? comments : comments.slice(0, 5);
  const hasMore = comments.length > 5;

  return (
    <div className="mt-8 space-y-5">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <MessageCircle size={16} className="text-blue-400" />
          <h2 className="text-[15px] font-semibold text-white/80">
            {isLoading
              ? "Comments"
              : `${comments.length} Comment${comments.length !== 1 ? "s" : ""}`}
          </h2>
        </div>
        <div className="flex-1 h-px bg-white/5" />
      </div>

      {/* Compose Box */}
      <div className="rounded-xl border border-white/[0.07] bg-[#0d0d0e] p-4 space-y-3 transition-all duration-200 focus-within:border-blue-500/30 focus-within:bg-[#0f0f10]">
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-500/20 to-purple-500/20 border border-white/8 flex items-center justify-center shrink-0">
            <User size={14} className="text-white/40" />
          </div>
          <textarea
            ref={textareaRef}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write a comment..."
            rows={2}
            maxLength={500}
            className="w-full bg-transparent text-[13.5px] text-white/85 placeholder:text-white/25 resize-none outline-none leading-relaxed overflow-y-auto"
            style={{ scrollbarWidth: "none", maxHeight: "120px" }}
          />
        </div>

        <div className="flex items-center justify-between pl-11">
          <span
            className={`text-[11px] tabular-nums transition-colors ${
              commentText.length > 450
                ? commentText.length > 490
                  ? "text-red-400"
                  : "text-amber-400"
                : "text-white/20"
            }`}
          >
            {commentText.length > 0 ? `${commentText.length}/500` : ""}
          </span>
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-white/20 hidden sm:block">
              ⌘+Enter to post
            </span>
            <button
              onClick={handleSubmit}
              disabled={
                !commentText.trim() || isPending || commentText.length > 500
              }
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[12.5px] font-medium transition-all duration-150
                ${
                  commentText.trim() && !isPending && commentText.length <= 500
                    ? "bg-blue-500 hover:bg-blue-400 text-white cursor-pointer shadow-lg shadow-blue-500/20"
                    : "bg-white/5 text-white/25 cursor-not-allowed"
                }
              `}
            >
              {isPending ? (
                <Loader2 size={12} className="animate-spin" />
              ) : (
                <Send size={12} />
              )}
              Post Comment
            </button>
          </div>
        </div>
      </div>

      {/* Comments List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-10">
          <Loader2 size={20} className="animate-spin text-white/25" />
        </div>
      ) : comments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 gap-3">
          <div className="w-12 h-12 rounded-full bg-white/3 border border-white/6 flex items-center justify-center">
            <MessageCircle size={22} className="text-white/15" />
          </div>
          <div className="text-center space-y-1">
            <p className="text-[13px] font-medium text-white/30">
              No comments yet
            </p>
            <p className="text-[12px] text-white/20">
              Be the first to share your thoughts!
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-1">
          {displayedComments.map((comment, idx) => (
            <div
              key={comment.id}
              className="group flex gap-3 p-3.5 rounded-xl hover:bg-white/2 transition-colors duration-150"
              style={{
                animation: `fadeSlideIn 0.2s ease-out ${idx * 0.03}s both`,
              }}
            >
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-white/6 bg-[#0d0d0e]">
                {comment.user.image ? (
                  <Image
                    src={comment.user.image}
                    alt={comment.user.name || "User"}
                    width={32}
                    height={32}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-blue-500/20 to-purple-500/20">
                    <User size={14} className="text-white/40" />
                  </div>
                )}
              </div>

              {/* Comment Body */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-[13px] font-semibold text-white/85">
                    {comment.user.name || comment.user.username || "Anonymous"}
                  </span>
                  {comment.user.username && (
                    <span className="text-[11.5px] text-white/25">
                      @{comment.user.username}
                    </span>
                  )}
                  <span className="text-[11px] text-white/20 ml-auto tabular-nums">
                    {formatRelativeTime(comment.created_at)}
                  </span>
                </div>
                <p className="text-[13px] text-white/65 leading-relaxed mt-1 wrap-break-words whitespace-pre-wrap">
                  {comment.commentText}
                </p>
              </div>
            </div>
          ))}

          {/* Show more / less toggle */}
          {hasMore && (
            <button
              onClick={() => setShowAll((v) => !v)}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 text-[12.5px] text-blue-400/70 hover:text-blue-400 transition-colors mt-1"
            >
              {showAll ? (
                <>
                  <ChevronUp size={14} />
                  Show less
                </>
              ) : (
                <>
                  <ChevronDown size={14} />
                  Show {comments.length - 5} more comment
                  {comments.length - 5 !== 1 ? "s" : ""}
                </>
              )}
            </button>
          )}
        </div>
      )}

    </div>
  );
};

export default CommentSection;
