"use client";

import Image from "next/image";
import { Separator } from "../ui/separator";
import { EllipsisVertical } from "lucide-react";
import { useRouter } from "next/navigation";

type PostUser = {
  id ?:string | null
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

const AnswerHeader = ({ user }: { user?: PostUser }) => {
  const router = useRouter();

  const username = user?.username ?? "user";
  const displayName = user?.name ?? username;
  const firstLetter = username.charAt(0).toUpperCase();
  const gradient = getAvatarGradient(username);

  const handleProfileClick = () => {
    router.push(`/profile/${user?.id}`);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        
        <div
          onClick={handleProfileClick}
          className="flex items-center gap-4 cursor-pointer group"
        >
          {user?.image ? (
            <Image
              src={user.image}
              alt={username}
              width={40}
              height={40}
              className="
                rounded-full object-cover
                border border-white/10
                transition group-hover:scale-105
              "
            />
          ) : (
            <div
              className={`
                flex h-10 w-10 items-center justify-center
                rounded-full bg-linear-to-br ${gradient}
                text-sm font-semibold text-white
                transition group-hover:scale-105
              `}
            >
              {firstLetter}
            </div>
          )}

          <div className="flex flex-col leading-tight">
            <span className="text-sm font-medium text-white group-hover:text-cyan-400 transition">
              @{username}
            </span>
            <span className="text-xs text-white/40">
              {displayName}
            </span>
          </div>
        </div>
        <button
          className="
            flex h-8 w-8 items-center justify-center
            rounded-md
            text-white/50
            transition
            hover:bg-white/10
            hover:text-white
          "
        >
          <EllipsisVertical className="h-4 w-4" />
        </button>
      </div>

      <Separator className="bg-white/10" />
    </div>
  );
};

export default AnswerHeader;
