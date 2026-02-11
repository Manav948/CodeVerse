"use client";

import { useState } from "react";
import { PostWithExtras } from "@/types/post";
import Image from "next/image";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import PostHeader from "./PostHeader";
import { Heart, MessageCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "../ui/dialog";

type Props = {
  post: PostWithExtras;
};

const PostCard = ({ post }: Props) => {
  const [open, setOpen] = useState(false);
  const [likeCount , setLikeCount] = useState(0);
  const Couter = () => {
    setLikeCount(likeCount => likeCount + 1);
  }
  console.log(post)
  return (
    <>
      <Card
        className="
          relative overflow-hidden
          rounded-2xl
          bg-black/60
          backdrop-blur-xl
          transition
          hover:border-cyan-400/30
          mb-5 border-none
        "
      >
        <div className="relative p-5 space-y-4">
          <PostHeader user={post.user} />

          <h3 className="text-lg font-semibold leading-snug text-white">
            {post.title}
          </h3>

          <p className="text-sm text-white/70 leading-relaxed line-clamp-3">
            {post.description}
          </p>

          {post.image.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {post.image.slice(0, 4).map((img, idx) => (
                <div
                  key={idx}
                  className="relative aspect-video overflow-hidden rounded-xl border border-white/10"
                >
                  <Image
                    src={img}
                    alt="Post image"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag.id}
                  className="bg-white/10 text-white/70"
                >
                  #{tag.name}
                </Badge>
              ))}
              {post.tags.length > 3 && (
                <span className="text-xs text-white/40">
                  +{post.tags.length - 3} more
                </span>
              )}
            </div>
          )}

          <Separator className="bg-white/10" />

          <div className="flex items-center justify-between text-xs text-white/50">
            <span>
              {new Date(post.created_at).toLocaleDateString()}
            </span>

            <div className="flex items-center gap-5">
              <button onClick={Couter} className="flex items-center gap-1 hover:text-white">
                <Heart size={16} /> {likeCount}
              </button>
              <button className="flex items-center gap-1 hover:text-white">
                <MessageCircle size={16} /> Comment
              </button>
              <button
                onClick={() => setOpen(true)}
                className="hover:text-white font-medium"
              >
                View →
              </button>
            </div>
          </div>
        </div>
      </Card>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="
            max-w-3xl
            border border-white/10
            bg-black text-white
            backdrop-blur-xl
          "
        >
          <DialogHeader className="space-y-4 mt-5">
            <PostHeader user={post.user} />

            <h2 className="text-2xl font-semibold leading-tight">
              {post.title}
            </h2>

            <p className="text-xs text-white/40">
              Posted on{" "}
              {new Date(post.created_at).toLocaleString()}
            </p>
          </DialogHeader>

          <Separator className="bg-white/10 my-4" />

          <p className="text-sm leading-relaxed text-white/80 whitespace-pre-wrap">
            {post.description}
          </p>
          {post.image.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {post.image.map((img, idx) => (
                <div
                  key={idx}
                  className="relative aspect-video overflow-hidden rounded-xl border border-white/10"
                >
                  <Image
                    src={img}
                    alt="Post image"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-4">
              {post.tags.map((tag) => (
                <Badge
                  key={tag.id}
                  className="bg-white/10 text-white/70"
                >
                  #{tag.name}
                </Badge>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PostCard;
