"use client"
import { User } from "lucide-react"
import Image from "next/image"
import clsx from "clsx"

interface Props {
  size?: number
  className?: string
  profileImage?: string | null
  username?: string | null
}

export const UserAvatar = ({
  profileImage,
  className,
  size = 40,
  username,
}: Props) => {
  const initial = username ? username.charAt(0).toUpperCase() : "U";
  return (
    <div
      className={clsx(
        "relative rounded-full overflow-hidden flex items-center justify-center bg-muted text-muted-foreground",
        className
      )}
      style={{ width: size, height: size }}
    >
      {profileImage ? (
        <Image
          src={profileImage}
          alt="Profile avatar"
          fill
          className="object-cover"
          priority
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-purple-500 to-cyan-500 text-white font-semibold text-lg">
          {initial}
        </div>
      )}
    </div>
  )
}
