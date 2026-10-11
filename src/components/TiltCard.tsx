"use client";

import { useState, useRef, useEffect } from "react";

export function TiltCard({
  title,
  desc,
  delay = 0,
}: {
  title: string;
  desc: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      setTransform(
        `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      );
    };

    const handleMouseLeave = () => {
      setTransform("perspective(1000px) rotateX(0) rotateY(0)");
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      data-tilt
      data-reveal
      style={{ transform, transitionDelay: `${delay * 150}ms` }}
      className="card p-6 h-full transition-all duration-300"
    >
      <h3 className="display text-xl font-bold mb-3 text-accent">{title}</h3>
      <p className="text-sm text-textDim mono">{desc}</p>
    </div>
  );
}