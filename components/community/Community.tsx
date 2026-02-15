"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, Lock, Sparkles, Users, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

const Community = () => {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center px-6 overflow-hidden bg-black">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-2xl"
      >
        <Card className="relative overflow-hidden rounded-3xl bg-black backdrop-blur-2xl border border-white/10 p-10 text-center shadow-[0_0_60px_rgba(168,85,247,0.15)]">

          <div className="absolute inset-0 rounded-3xl border border-purple-500/20 pointer-events-none" />

          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="flex justify-center mb-6"
          >
            <div className="flex items-center justify-center h-20 w-20 rounded-2xl bg-linear-to-br from-purple-500 via-pink-500 to-cyan-500 shadow-xl shadow-purple-500/40">
              <Crown className="text-white" size={40} />
            </div>
          </motion.div>

          <h2 className="text-3xl font-bold bg-linear-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Community Access Locked
          </h2>

          <p className="mt-4 text-white/60 leading-relaxed max-w-md mx-auto">
            Unlock private developer rooms, premium discussions, exclusive
            code reviews, and collaborate with top engineers inside
            <span className="text-white font-semibold"> CodeVerse Pro</span>.
          </p>
          <div className="mt-8 space-y-3 text-sm text-white/70">
            <div className="flex items-center justify-center gap-2">
              <Users size={16} className="text-purple-400" />
              Private Developer Rooms
            </div>
            <div className="flex items-center justify-center gap-2">
              <MessageSquare size={16} className="text-pink-400" />
              Exclusive Discussions
            </div>
            <div className="flex items-center justify-center gap-2">
              <Sparkles size={16} className="text-cyan-400" />
              Premium Learning Resources
            </div>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 text-white/80 px-4 py-2 rounded-full border border-white/10 text-xs">
            <Lock size={14} />
            Special Members Only
          </div>

          <div className="mt-8">
            <Button className="relative overflow-hidden rounded-xl h-12 px-8 font-semibold text-white bg-linear-to-r from-purple-500 via-pink-500 to-cyan-500 hover:opacity-95 transition-all duration-300 shadow-lg shadow-purple-500/30">
              Upgrade to Premium
            </Button>
          </div>

        </Card>
      </motion.div>
    </div>
  );
};

export default Community;
