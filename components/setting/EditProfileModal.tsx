"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "@/lib/cropImage";

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
  user: any;
}

const EditProfileModal = ({ open, setOpen, user }: Props) => {
  const { update } = useSession();

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const onCropComplete = useCallback(
    (_: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageSrc(reader.result as string);
    };
  };

  const handleSave = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    try {
      setLoading(true);

      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels
      );

      const blob = await fetch(croppedImage).then((r) => r.blob());

      const formData = new FormData();
      formData.append("file", blob);
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
        ...user,
        image: imageUrl,
      });

      toast.success("Profile updated successfully");
      setOpen(false);
      setImageSrc(null);
    } catch (err) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-black text-white border border-white/10 max-w-md rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
        <div className="text-center space-y-2 mb-6">
          <h3 className="text-2xl font-semibold">
            Edit Profile Picture
          </h3>
          <p className="text-sm text-gray-400">
            Drag and zoom to adjust your photo
          </p>
        </div>

        <div className="flex flex-col items-center gap-6">
          {!imageSrc && (
            <div className="relative w-32 h-32 rounded-full overflow-hidden border border-white/10 shadow-lg bg-white/5">
              {user?.image ? (
                <Image
                  src={user.image}
                  alt="profile"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-white text-black text-3xl font-bold">
                  {user?.name?.charAt(0)}
                </div>
              )}
            </div>
          )}
          {imageSrc && (
            <div className="relative w-64 h-64 bg-black rounded-xl overflow-hidden">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
          )}

          {imageSrc && (
            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) =>
                setZoom(Number(e.target.value))
              }
              className="w-full"
            />
          )}
          <label className="w-full cursor-pointer rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-center text-sm hover:bg-white/10 transition">
            Choose New Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          {imageSrc && (
            <Button
              onClick={handleSave}
              disabled={loading}
              className="w-full rounded-lg bg-white text-black hover:bg-gray-200 transition"
            >
              {loading ? "Updating..." : "Save Changes"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
