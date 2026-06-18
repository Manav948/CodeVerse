"use client";

import { useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";

export function useCardEffects(maxTilt = 10) {
  const ref = useRef<HTMLDivElement>(null);

  const rotateX = useSpring(0, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 150, damping: 20 });
  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);
  const spotlightOpacity = useSpring(0, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse position relative to the element
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalised position from -0.5 to 0.5
    const normX = x / width - 0.5;
    const normY = y / height - 0.5;

    // Set rotation values (tilt effect)
    rotateX.set(-normY * maxTilt);
    rotateY.set(normX * maxTilt);

    // Set spotlight coordinate values
    spotlightX.set(x);
    spotlightY.set(y);
  };

  const handleMouseEnter = () => {
    spotlightOpacity.set(1);
  };

  const handleMouseLeave = () => {
    // Reset tilt and spotlight opacity
    rotateX.set(0);
    rotateY.set(0);
    spotlightOpacity.set(0);
  };

  return {
    ref,
    rotateX,
    rotateY,
    spotlightX,
    spotlightY,
    spotlightOpacity,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
  };
}
