"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface ImageCarouselProps {
  images: string[];
  height?: string;
  interval?: number;
}

export default function ImageCarousel({
  images,
  height = "h-60",
  interval = 4000,
}: ImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || images.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [visible, images.length, interval]);

  if (images.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${height} overflow-hidden rounded-xl border border-white/[0.07] bg-black`}
     
      style={{ transform: "translateZ(0)" }}
    >
      {images.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 flex items-center justify-center p-4"
          style={{
       
            opacity: i === index ? 1 : 0,
            transition: "opacity 600ms ease",
            willChange: "opacity",
            pointerEvents: i === index ? "auto" : "none",
          }}
        >
          <Image
            src={src}
            alt={`carousel image ${i + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain"
            priority={i === 0}
            loading={i === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

     
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className="w-1.5 h-1.5 rounded-full transition-all duration-300"
              style={{
                background: i === index ? "rgba(239,68,68,0.8)" : "rgba(255,255,255,0.2)",
                transform: i === index ? "scale(1.3)" : "scale(1)",
              }}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}