"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, Lock } from "lucide-react";

const Community = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 relative p-8">
      
      <div className="pointer-events-none absolute -top-20 -left-20 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />

      <Card className="relative w-full max-w-xl bg-black/60 backdrop-blur-xl border border-white/10 p-10 rounded-3xl text-center space-y-6 shadow-2xl">

        <div className="flex justify-center">
          <div className="flex items-center justify-center bg-linear-to-br from-purple-500 to-cyan-500 mt-5 rounded-xl">
            <Crown className="text-white" size={48} />
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-white">
          Community Access Locked
        </h2>

        <p className="text-sm text-white/60 leading-relaxed">
          This feature is available exclusively for 
          <span className="text-white font-medium"> CodeVerse Special Members</span>.
          Upgrade your membership to join private discussions, exclusive rooms, 
          and collaborate with top developers.
        </p>

        <div className="inline-flex items-center text-xs bg-white/10 text-white/70 px-4 py-2 rounded-full border border-white/10">
          <Lock size={14} />
          Special Members Only
        </div>

        <div className="pt-4">
          <Button
            className="bg-linear-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-xl px-6 h-11 hover:opacity-90"
          >
            Upgrade to Premium
          </Button>
        </div>

      </Card>
    </div>
  );
};

export default Community;
