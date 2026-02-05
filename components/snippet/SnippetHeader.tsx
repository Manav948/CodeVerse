"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { Separator } from "../ui/separator";

/**
 * Deterministic color generator from string
 */
const avatarColors = [
  "bg-purple-500",
  "bg-cyan-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-emerald-500",
  "bg-orange-500",
  "bg-rose-500",
];

function getAvatarColor(seed?: string) {
  if (!seed) return "bg-zinc-600";
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return avatarColors[Math.abs(hash) % avatarColors.length];
}

const SnippetHeader = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const username = user?.username ?? "user";
  const firstLetter = username.charAt(0).toUpperCase();
  const avatarColor = getAvatarColor(username);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="relative h-10 w-10">
          {user?.image ? (
            <Image
              src={user.image}
              alt={username}
              fill
              className="rounded-full object-cover border border-white/10"
            />
          ) : (
            <div
              className={`
                flex h-10 w-10 items-center justify-center
                rounded-full text-sm font-semibold text-white
                ${avatarColor}
              `}
            >
              {firstLetter}
            </div>
          )}
        </div>

        <div className="flex flex-col leading-tight">
          <span className="text-sm font-medium text-white">
            {username}
          </span>
          <span className="text-xs text-white/40">
            Posted a snippet
          </span>
        </div>
      </div>

      <Separator className="bg-white/10" />
    </div>
  );
};

export default SnippetHeader;
