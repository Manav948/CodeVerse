"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import Loader from "../ui/Loading";
import NotFoundState from "../ui/notFound";
import { UserAvatar } from "../ui/user-avatar";
import Image from "next/image";
import {
  Calendar, FileText, Code2, MessageCircleQuestion,
  BookOpen, MapPin, Link2, Layers, Hash
} from "lucide-react";

interface Props {
  userId: string;
}


const TABS = [
  { key: "posts",     label: "Posts",     icon: <FileText size={13} /> },
  { key: "snippets",  label: "Snippets",  icon: <Code2 size={13} /> },
  { key: "questions", label: "Questions", icon: <MessageCircleQuestion size={13} /> },
  { key: "articles",  label: "Articles",  icon: <BookOpen size={13} /> },
];


const Profile = ({ userId }: Props) => {
  const [activeTab, setActiveTab] = useState("posts");

  const { data, isLoading } = useQuery({
    queryKey: ["profile", userId],
    queryFn: async () => {
      const res = await axios.get(`/api/user/profile/${userId}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader />
      </div>
    );
  }

  if (!data) return <NotFoundState type="post" />;

  const joinDate = data.created_at
    ? new Date(data.created_at).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Recent";

  const activeData: any[] = data[activeTab] ?? [];

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 text-white bg-black min-h-screen">
     
      <div className="flex items-center gap-6 md:gap-12 mb-6">
        <div className="relative shrink-0">
          <div className="p-[2.5px] bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-full">
            <UserAvatar
              profileImage={data.image}
              username={data.username}
              size={80}
              className="ring-4 ring-black rounded-full"
            />
          </div>
        </div>
        <div className="flex-1 flex justify-around text-center">
          {[
            { label: "Posts", count: data._count.posts },
            { label: "Snippets", count: data._count.snippets },
            { label: "Questions", count: data._count.questions },
            { label: "Articles", count: data._count.articles },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-base md:text-lg font-bold font-mono tracking-tight">{stat.count}</span>
              <span className="text-[10px] md:text-xs text-white/45 tracking-wide lowercase">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

     
      <div className="space-y-1.5 mb-6">
        <h1 className="text-lg font-bold tracking-tight text-white">{data.name || data.username}</h1>
        <div className="flex items-center gap-2 text-xs text-white/40">
          <span>@{data.username}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar size={11} />
            Joined {joinDate}
          </span>
        </div>
        {data.bio && (
          <p className="text-sm text-white/80 pt-1 leading-relaxed max-w-xl">
            {data.bio}
          </p>
        )}
      </div>

      
      <div className="flex justify-around border-t border-white/[0.08] -mx-4 px-4 md:mx-0 md:px-0">
        {TABS.map((tab) => {
          const count = data._count[tab.key] ?? 0;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 py-4 text-xs font-mono uppercase tracking-widest transition-colors ${
                isActive
                  ? "text-white border-t border-white -mt-[1px]"
                  : "text-white/35 hover:text-white/70"
              }`}
            >
              <span className={isActive ? "text-red-400" : "text-white/20"}>
                {tab.icon}
              </span>
              <span className="hidden sm:inline">{tab.label}</span>
              <span className={`text-[10px] font-mono px-1 rounded ${
                isActive ? "bg-red-500/15 text-red-400" : "bg-white/[0.05] text-white/20"
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="pt-6 pb-12">
        {activeData.length === 0 ? (
          <EmptyState tab={activeTab} />
        ) : (
          <div className="space-y-3">
            {activeTab === "posts"     && activeData.map((item: any) => <PostCard key={item.id} item={item} />)}
            {activeTab === "snippets"  && activeData.map((item: any) => <SnippetCard key={item.id} item={item} />)}
            {activeTab === "questions" && activeData.map((item: any) => <QuestionCard key={item.id} item={item} />)}
            {activeTab === "articles"  && activeData.map((item: any) => <PostCard key={item.id} item={item} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;


const EmptyState = ({ tab }: { tab: string }) => (
  <div className="flex flex-col items-center justify-center py-20 gap-4">
    <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-center">
      <Layers size={22} className="text-white/15" />
    </div>
    <div className="text-center">
      <p className="text-sm font-medium text-white/30">No {tab} yet</p>
      <p className="text-xs text-white/15 mt-1">Nothing published in this section.</p>
    </div>
  </div>
);

const PostCard = ({ item }: { item: any }) => (
  <div className="group bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-5 hover:border-white/[0.12] transition-colors duration-200">
    <div className="flex items-start gap-4">
      
      {item.image?.[0] && (
        <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/[0.07]">
          <Image src={item.image[0]} alt={item.title} fill className="object-cover" />
        </div>
      )}

      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-white/90 leading-snug group-hover:text-white transition-colors line-clamp-2">
          {item.title}
        </h3>
        {item.description && (
          <p className="text-xs text-white/35 mt-1.5 leading-relaxed line-clamp-2">
            {item.description}
          </p>
        )}
        <div className="flex items-center gap-3 mt-3 text-[11px] text-white/20 font-mono">
          <span className="flex items-center gap-1">
            <Calendar size={10} />
            {new Date(item.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </span>
          {item.tags?.slice(0, 2).map((tag: string) => (
            <span key={tag} className="flex items-center gap-0.5 text-white/15">
              <Hash size={9} />{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const SnippetCard = ({ item }: { item: any }) => (
  <div className="group bg-[#0a0a0a] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/[0.12] transition-colors duration-200">
    
    <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.05]">
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 rounded-lg bg-orange-500/10 border border-orange-500/15 flex items-center justify-center">
          <Code2 size={13} className="text-orange-400" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white/90 leading-none">
            {item.title}
          </h3>
          {item.description && (
            <p className="text-[11px] text-white/30 mt-0.5">{item.description}</p>
          )}
        </div>
      </div>
      {item.language && (
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.05] text-white/30 border border-white/[0.06]">
          {item.language}
        </span>
      )}
    </div>
   
    {item.code && (
      <pre className="px-5 py-4 text-[12px] font-mono text-white/50 overflow-x-auto max-h-36 leading-relaxed" style={{ scrollbarWidth: "thin" }}>
        <code>{item.code}</code>
      </pre>
    )}
  </div>
);

const QuestionCard = ({ item }: { item: any }) => (
  <div className="group bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-5 hover:border-white/[0.12] transition-colors duration-200">
    <div className="flex items-start gap-3">
      <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/15 flex items-center justify-center shrink-0 mt-0.5">
        <MessageCircleQuestion size={13} className="text-blue-400" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-white/90 leading-snug group-hover:text-white transition-colors">
          {item.title}
        </h3>
        {item.description && (
          <p className="text-xs text-white/35 mt-1.5 leading-relaxed line-clamp-2">
            {item.description}
          </p>
        )}
        <div className="flex items-center gap-3 mt-3 text-[11px] text-white/20 font-mono">
          <span className="flex items-center gap-1">
            <Calendar size={10} />
            {new Date(item.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </span>
        </div>
      </div>
    </div>
  </div>
);
