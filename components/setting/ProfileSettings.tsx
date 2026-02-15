"use client";

import { useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import EditProfileModal from "./EditProfileModal";

const ProfileSettings = () => {
  const [open, setOpen] = useState(false);

  // Replace with session data
  const user = {
    name: "Manav Valani",
    username: "manavvalani",
    image: null,
    email: "example@gmail.com",
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      <h2 className="text-2xl font-semibold">Profile Details</h2>

      <Card className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-6">

        {/* Avatar Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="relative">
              {user.image ? (
                <Image
                  src={user.image}
                  alt="profile"
                  width={80}
                  height={80}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-2xl font-bold">
                  {user.name.charAt(0)}
                </div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-medium">{user.name}</h3>
              <p className="text-sm text-white/60">@{user.username}</p>
            </div>
          </div>

          <Button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2"
          >
            <Pencil size={14} />
            Edit Profile
          </Button>
        </div>

        <div className="border-t border-white/10 pt-4 text-sm text-white/60">
          {user.email}
        </div>
      </Card>

      <EditProfileModal open={open} setOpen={setOpen} user={user} />
    </div>
  );
};

export default ProfileSettings;
