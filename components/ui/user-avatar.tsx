"use client"
import { User } from "lucide-react"
import Image from "next/image"
import clsx from "clsx"

interface Props {
  size?: number
  className?: string
  profileImage?: string | null
}

export const UserAvatar = ({
  profileImage,
  className,
  size = 40, 
}: Props) => {
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
        <User size={Math.floor(size * 0.6)} /> 
      )}
    </div>
  )
}
