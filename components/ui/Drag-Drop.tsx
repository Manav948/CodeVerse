"use client";

import { useRef } from "react";
import { UploadCloud, X } from "lucide-react";

type Props = {
  files: File[];
  setFiles: (files: File[]) => void;
};

export function ImageDropZone({ files, setFiles }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  function onFilesSelected(newFiles: FileList | null) {
    if (!newFiles) return;
    setFiles([...files, ...Array.from(newFiles)]);
  }

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        onFilesSelected(e.dataTransfer.files);
      }}
      onClick={() => inputRef.current?.click()}
      className="
        relative cursor-pointer rounded-2xl
        border border-dashed border-white/20
        bg-white/5 p-8
        text-center transition
        hover:border-cyan-400/40
        hover:bg-white/10
      "
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(e) => onFilesSelected(e.target.files)}
      />

      <UploadCloud className="mx-auto h-10 w-10 text-cyan-400" />
      <p className="mt-3 text-sm text-white/80">
        Drag & drop or <span className="text-cyan-400">click to upload</span>
      </p>
      <p className="text-xs text-white/40">PNG, JPG, WEBP</p>

      {files.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-3">
          {files.map((file, i) => (
            <div key={i} className="relative">
              <img
                src={URL.createObjectURL(file)}
                className="h-20 w-full rounded-lg object-cover"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setFiles(files.filter((_, idx) => idx !== i));
                }}
                className="
                  absolute -top-2 -right-2
                  rounded-full bg-red-500 p-1
                "
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
