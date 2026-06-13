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
    <div className="min-h-screen bg-black text-white">

  
      <div className="relative h-40 md:h-52 w-full rounded-2xl overflow-hidden bg-[#0d0d0d] border border-white/[0.06] mb-0">
   
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-transparent to-purple-600/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(239,68,68,0.12),transparent_70%)]" />
     
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      
      <div className="relative px-4 md:px-8 pb-6">
   
        <div className="absolute -top-14 left-6 md:left-8">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-red-500/20 blur-xl scale-110" />
            <UserAvatar
              profileImage={data.image}
              username={data.username}
              size={100}
              className="relative ring-4 ring-black rounded-full"
            />
          </div>
        </div>

        
        <div className="flex items-start justify-end pt-3 mb-14 md:mb-4">
          <button className="px-4 py-1.5 rounded-lg border border-white/[0.12] text-xs text-white/60 hover:text-white hover:border-white/25 transition-colors font-medium">
            Follow
          </button>
        </div>

      
        <div className="mt-2 space-y-2">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              {data.name || data.username}
            </h1>
            <p className="text-sm text-white/40 mt-0.5">@{data.username}</p>
          </div>

          {data.bio && (
            <p className="text-sm text-white/65 leading-relaxed max-w-lg">
              {data.bio}
            </p>
          )}

          
          <div className="flex flex-wrap items-center gap-4 text-xs text-white/35 pt-1">
            <span className="flex items-center gap-1.5">
              <Calendar size={12} />
              Joined {joinDate}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          {[
            { label: "Posts",     value: data._count.posts,     icon: <FileText size={14} />,               color: "text-red-400",    bg: "bg-red-500/8 border-red-500/15" },
            { label: "Snippets",  value: data._count.snippets,  icon: <Code2 size={14} />,                  color: "text-orange-400", bg: "bg-orange-500/8 border-orange-500/15" },
            { label: "Questions", value: data._count.questions, icon: <MessageCircleQuestion size={14} />,  color: "text-blue-400",   bg: "bg-blue-500/8 border-blue-500/15" },
            { label: "Articles",  value: data._count.articles,  icon: <BookOpen size={14} />,               color: "text-purple-400", bg: "bg-purple-500/8 border-purple-500/15" },
          ].map((s) => (
            <div
              key={s.label}
              className={`rounded-xl border ${s.bg} p-4 flex flex-col gap-2`}
            >
              <div className={`${s.color}`}>{s.icon}</div>
              <div className="text-2xl font-bold text-white tabular-nums">
                {s.value}
              </div>
              <div className="text-[11px] text-white/30 uppercase tracking-wider font-mono">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 md:px-8 mt-2">
        <div className="flex gap-1 border-b border-white/[0.06] mb-6">
          {TABS.map((tab) => {
            const count = data._count[tab.key] ?? 0;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                  isActive ? "text-white" : "text-white/35 hover:text-white/70"
                }`}
              >
                <span className={isActive ? "text-red-400" : "text-white/20"}>
                  {tab.icon}
                </span>
                {tab.label}
                <span className={`text-[11px] font-mono px-1.5 py-0.5 rounded-md ${
                  isActive ? "bg-red-500/15 text-red-400" : "bg-white/[0.05] text-white/20"
                }`}>
                  {count}
                </span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        <div className="pb-12">
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
