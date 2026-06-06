"use client";
import Image from "next/image";
import { EllipsisVertical } from "lucide-react";
import { useRouter } from "next/navigation";

type SnippetUser = {
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

const SnippetHeader = ({ user }: { user?: SnippetUser }) => {
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
            width={36}
            height={36}
            className="rounded-full object-cover ring-1 ring-white/10 group-hover/author:ring-white/25 transition"
          />
        ) : (
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br ${gradient} text-[13px] font-semibold text-white ring-1 ring-white/10 group-hover/author:ring-white/25 transition`}
          >
            {firstLetter}
          </div>
        )}

        <div className="flex flex-col leading-none">
          <span className="text-[13.5px] font-semibold text-white/90 group-hover/author:text-white transition truncate">
            {displayName}
          </span>
          <span className="text-[11.5px] text-white/35 truncate mt-0.5">
            @{username}
          </span>
        </div>
      </div>

      <button className="flex h-7 w-7 items-center justify-center rounded-md text-white/30 hover:text-white/70 hover:bg-white/6 transition-all focus:outline-none">
        <EllipsisVertical className="h-4 w-4" />
      </button>
    </div>
  );
};

export default SnippetHeader;
