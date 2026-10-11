"use client";

import { useState, useRef, useEffect } from "react";

export function MagneticButton({
  href,
  label,
  fullWidth = false,
}: {
  href: string;
  label: string;
  fullWidth?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setPosition({ x, y });
    };

    const handleMouseEnter = () => setOpacity(1);
    const handleMouseLeave = () => setOpacity(0);

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const { x, y } = position;
  const size = 100;
  const border = size / 5;

  return (
    <a
      ref={ref}
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className={`btn mono relative isolation-hidden overflow-hidden ${
        fullWidth ? "w-full justify-center" : ""
      }`}
      style={{
        border: `${border}px`,
        "--x": `${x}px`,
        "--y": `${y}px`,
      } as React.CSSProperties}
    >
      <span
        className="absolute inset-0"
        style={{
          background: `radial-gradient(${size}px circle at ${x}px ${y}px , rgba(0,240,255,0.3), transparent 70%)`,
          opacity,
          transition: "opacity 0.3s ease",
        }}
      />
      {label}
    </a>
  );
}