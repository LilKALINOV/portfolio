"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const winHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / winHeight) * 100;
      setScrollY(scrolled);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      id="reading-progress"
      style={{
        transform: `scaleX(${scrollY / 100})`,
        transformOrigin: "0%",
      }}
    />
  );
}