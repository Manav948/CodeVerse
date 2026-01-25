import AuthCard from "@/components/auth/AuthCard";
import React from "react";

const Page = () => {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#020617]">
      
      <div className="absolute inset-0 bg-linear-to-br from-[#0f172a] via-[#020617] to-black" />

      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="relative z-10 w-full max-w-md px-4">
        <AuthCard mode={"signup"} />
      </div>
    </div>
  );
};

export default Page;
