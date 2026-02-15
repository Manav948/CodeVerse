"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Pencil, Plus } from "lucide-react";
import Loader from "../ui/Loading";
import EditProfileModal from "./EditProfileModal";

type User = {
  id: string;
  username: string;
  name?: string | null;
  email?: string | null;
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

const Settings = () => {
  const [editing, setEditing] = useState(false);

  const { data: user, isLoading } = useQuery<User>({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const res = await axios.get("/api/user/me");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center ext-white/60 animate-pulse">
        <Loader />
      </div>
    );
  }

  if (!user) return null;

  const username = user.username ?? "user";
  const displayName = user.name ?? username;
  const firstLetter = username.charAt(0).toUpperCase();
  const gradient = getAvatarGradient(username);

  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-0">
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold">
          Account
        </h1>
        <p className="text-white/50 text-sm mt-1">
          Manage your account information.
        </p>
      </div>

      <Card className="bg-black border border-white/10 rounded-2xl p-5 sm:p-8 space-y-8">

        <h2 className="text-base sm:text-lg font-medium text-white/80">
          Profile Details
        </h2>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-6">

            {user.image ? (
              <Image
                src={user.image}
                alt={username}
                width={80}
                height={80}
                className="rounded-full object-cover border border-white/10 w-16 h-16 sm:w-20 sm:h-20"
              />
            ) : (
              <div
                className={`flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-linear-to-br ${gradient} text-xl sm:text-2xl font-semibold text-white`}
              >
                {firstLetter}
              </div>
            )}

            <div className="flex flex-col">
              <span className="text-white font-medium text-base sm:text-lg">
                {displayName}
              </span>
              <span className="text-white/50 text-sm">
                @{username}
              </span>
            </div>
          </div>
          <Button
            variant="secondary"
            className="flex items-center justify-center gap-2 w-full sm:w-auto"
            onClick={() => setEditing(true)}
          >
            <Pencil size={14} />
            Update profile
          </Button>
        </div>

        <div className="border-t border-white/10" />
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <div>
            <p className="text-white font-medium">
              Email address
            </p>
            <p className="text-white/50 text-sm mt-1 break-all">
              {user.email ?? "No email added"}
            </p>
          </div>

          <Button
            variant="ghost"
            className="flex items-center justify-center gap-2 text-white/60 hover:text-black w-full sm:w-auto"
          >
            <Plus size={14} />
            Add email
          </Button>
        </div>

        <div className="border-t border-white/10" />
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <div>
            <p className="text-white font-medium">
              Connected accounts
            </p>
            <p className="text-white/50 text-sm mt-1">
              Connect social login providers.
            </p>
          </div>

          <Button
            variant="ghost"
            className="flex items-center justify-center gap-2 text-white/60 hover:text-black w-full sm:w-auto"
          >
            <Plus size={14} />
            Connect account
          </Button>
        </div>
      </Card>

      <EditProfileModal
        open={editing}
        setOpen={setEditing}
        user={user}
      />
    </div>
  );

};

export default Settings;
