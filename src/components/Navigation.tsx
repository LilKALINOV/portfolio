"use client";

import { Translation } from "@/lib/i18n";

export function Navigation({ t }: { t: Translation }) {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-40 bg-secondary/50 backdrop-blur-sm border-b border-border/30">
      <div className="container flex items-center justify-between py-3">
        <a href="#" className="mono font-bold text-accent">
          LIL KALINOV
        </a>

        <div className="hidden md:flex gap-6 items-center">
          {[
            { id: "work", label: t.nav.work },
            { id: "about", label: t.nav.about },
            { id: "process", label: t.nav.process },
            { id: "contact", label: t.nav.contact },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="link mono text-sm hover:text-accent transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}