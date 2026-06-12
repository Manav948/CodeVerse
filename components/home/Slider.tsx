"use client";

const items = [
  "Developer Posts",
  "Snippet Library",
  "Community Q&A",
  "Task Tracking",
  "Build in Public",
  "Public Developer Identity",
  "Share Knowledge",
  "Grow Consistently",
  "Open Source",
  "Code Reviews",
];

export default function Slider() {
  return (
    <section className="relative w-full bg-black py-5 overflow-hidden">
   
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <div className="relative flex overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee gap-0 select-none">
          {[...items, ...items].map((item, index) => (
            <span
              key={index}
              className="flex items-center gap-8 px-8 text-xs font-mono tracking-[0.15em] uppercase text-white/25"
            >
              {item}
              <span className="w-1 h-1 rounded-full bg-red-500/50 flex-shrink-0" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}