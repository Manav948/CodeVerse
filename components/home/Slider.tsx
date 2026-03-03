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
];

export default function Slider() {
  return (
    <section className="relative w-full bg-black py-10 overflow-hidden border-y border-white/10">

      <div className="relative flex overflow-hidden">

        <div className="flex whitespace-nowrap animate-marquee gap-16 text-white/60 text-sm md:text-base font-medium">

          {[...items, ...items].map((item, index) => (
            <span
              key={index}
              className="flex items-center gap-4"
            >
              {item}
              <span className="h-1 w-1 rounded-full bg-white/30" />
            </span>
          ))}

        </div>

      </div>
    </section>
  );
}