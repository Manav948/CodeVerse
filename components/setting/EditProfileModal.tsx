"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
  user: any;
}

const EditProfileModal = ({ open, setOpen, user }: Props) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { update } = useSession();

  const handleImageChange = (e: any) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleSave = async () => {
    if (!file) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
      );

      const uploadRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
      const imageUrl = uploadRes.data.secure_url;
      await axios.post("/api/user/updateImage", { imageUrl });

      await update({
        name: user.name,
        username: user.name,
        email: user.email,
        image: imageUrl,
      });

      toast.success("Profile updated successfully");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-black border border-white/10 text-white max-w-md">
        <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>

        <div className="flex flex-col items-center gap-6">

          <div className="relative">
            {preview || user?.image ? (
              <Image
                src={preview || user.image}
                alt="profile"
                width={110}
                height={110}
                className="rounded-full object-cover border border-white/10"
              />
            ) : (
              <div className="h-28 w-28 rounded-full bg-linear-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-2xl font-bold">
                {user?.name?.charAt(0)}
              </div>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="text-sm"
          />

          <Button
            onClick={handleSave}
            disabled={loading}
            className="bg-linear-to-r from-purple-500 to-cyan-500 w-full"
          >
            {loading ? "Updating..." : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
