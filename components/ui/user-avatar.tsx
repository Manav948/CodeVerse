"use client";

import Image from "next/image";
import clsx from "clsx";
import { useMemo } from "react";

interface Props {
  size?: number;
  className?: string;
  profileImage?: string | null;
  username?: string | null;
}

const avatarGradients = [
  "from-purple-500 to-pink-500",
  "from-cyan-500 to-blue-500",
  "from-emerald-500 to-teal-500",
  "from-orange-500 to-amber-500",
  "from-indigo-500 to-purple-500",
  "from-rose-500 to-pink-500",
];

function getGradient(seed?: string | null) {
  if (!seed) return avatarGradients[0];

  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }

  return avatarGradients[Math.abs(hash) % avatarGradients.length];
}

export const UserAvatar = ({
  profileImage,
  className,
  size = 40,
  username,
}: Props) => {
  const initial = username?.charAt(0).toUpperCase() ?? "U";

  const gradient = useMemo(() => {
    return getGradient(username);
  }, [username]);

  return (
    <div
      className={clsx(
        "relative rounded-full overflow-hidden flex items-center justify-center text-white font-semibold",
        className
      )}
      style={{ width: size, height: size }}
    >
      {profileImage ? (
        <Image
          key={profileImage}
          src={`${profileImage}?t=${Date.now()}`} 
          alt="Profile avatar"
          fill
          className="object-cover"
        />
      ) : (
        <div
          className={clsx(
            "flex items-center justify-center w-full h-full bg-linear-to-br text-white text-lg",
            gradient
          )}
        >
          {initial}
        </div>
      )}
    </div>
  );
};
