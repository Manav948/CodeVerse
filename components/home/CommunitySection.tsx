"use client";

import Counter from "../ui/Counter";
import { CheckCircle, Zap } from "lucide-react";

export default function CommunitySection() {
  return (
    <section className="relative w-full bg-black text-white py-28 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-start">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Join a Thriving{" "}
            <span className="text-red-500">Community</span>
          </h2>
          <p className="mt-6 text-white/60 max-w-md leading-relaxed">
            Thousands of developers are publishing posts,
            solving problems, and growing publicly inside CodeVerse.
            Track your progress alongside serious builders.
          </p>
          <div className="flex gap-6 mt-10 flex-wrap">

            <div className="bg-white/5 border border-white/10 rounded-xl px-8 py-6 min-w-45">
              <h3 className="text-3xl font-bold">
                <Counter value={15000} suffix="+" />
              </h3>
              <p className="text-white/50 text-sm mt-2">
                Active Developers
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl px-8 py-6 min-w-45">
              <h3 className="text-3xl font-bold">
                <Counter value={3200} suffix="+" />
              </h3>
              <p className="text-white/50 text-sm mt-2">
                Weekly Contributions
              </p>
            </div>

          </div>
        </div>
        <div className="space-y-5">

          {[
            {
              icon: <CheckCircle size={18} />,
              text: "Rahul published a new React Post",
              highlight: "Just now",
              color: "text-green-400",
            },
            {
              icon: <CheckCircle size={18} />,
              text: "Ayesha shared a Snippet",
              highlight: "2 min ago",
              color: "text-green-400",
            },
            {
              icon: <Zap size={18} />,
              text: "Vikram reached 15 day streak",
              highlight: "5 min ago",
              color: "text-orange-400",
            },
            {
              icon: <CheckCircle size={18} />,
              text: "Priya answered a Q&A",
              highlight: "8 min ago",
              color: "text-green-400",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-black border border-white/10 rounded-xl px-6 py-4 flex items-center justify-between backdrop-blur-md"
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-full bg-white/10 ${item.color}`}>
                  {item.icon}
                </div>
                <p className="text-sm text-white/70">
                  {item.text}
                </p>
              </div>

              <span className="text-xs text-white/40">
                {item.highlight}
              </span>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}