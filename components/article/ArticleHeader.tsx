"use client";
import Image from "next/image";
import { EllipsisVertical } from "lucide-react";
import { useRouter } from "next/navigation";

type ArticleUser = {
  id?: string | null;
  username?: string | null;
  name?: string | null;
  image?: string | null;
};

const avatarColors = [
  "from-purple-500 to-pink-500",
  "from-cyan-500 to-blue-500",
  "from-emerald-500 to-teal-500",
  "from-orange-500 to-amber-500",
  "from-indigo-500 to-purple-500",
  "from-rose-500 to-pink-500",
];

function getAvatarGradient(seed?: string) {
  if (!seed) return avatarColors[0];
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return avatarColors[Math.abs(hash) % avatarColors.length];
}

const ArticleHeader = ({ user }: { user?: ArticleUser }) => {
  const router = useRouter();
  const username = user?.username ?? "user";
  const displayName = user?.name ?? username;
  const firstLetter = username.charAt(0).toUpperCase();
  const gradient = getAvatarGradient(username);

  const handleProfileClick = () => {
    router.push(`/profile/${user?.id}`);
  };

  return (
    <div className="flex items-center justify-between">
      <div
        className="flex items-center gap-2.5 cursor-pointer group/author"
        onClick={handleProfileClick}
      >
        {user?.image ? (
          <Image
            src={user.image}
            alt={username}
            width={32}
            height={32}
            className="rounded-full object-cover ring-1 ring-white/[0.08]"
          />
        ) : (
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${gradient} text-[11px] font-semibold text-white shrink-0`}
          >
            {firstLetter}
          </div>
        )}

        <div className="flex flex-col leading-tight min-w-0">
          <span className="text-[13px] font-medium text-white/90 group-hover/author:text-white transition-colors truncate">
            {displayName}
          </span>
          <span className="text-[11px] text-white/35 truncate">
            @{username}
          </span>
        </div>
      </div>

      <button className="flex h-7 w-7 items-center justify-center rounded-md text-white/30 hover:text-white/70 hover:bg-white/[0.06] transition-all focus:outline-none">
        <EllipsisVertical className="h-4 w-4" />
      </button>
    </div>
  );
};

export default ArticleHeader;
