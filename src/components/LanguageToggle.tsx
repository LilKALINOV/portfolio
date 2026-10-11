"use client";

import { Translation } from "@/lib/i18n";

export function LanguageToggle({
  t,
  locale,
  onToggle,
}: {
  t: Translation;
  locale: string;
  onToggle: () => void;
}) {
  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="lang-toggle">
        <button
          onClick={onToggle}
          className={`px-3 py-1 text-xs mono transition-all ${
            locale === "ru"
              ? "bg-accent text-primary"
              : "text-textDim hover:text-accent"
          }`}
        >
          {t.lang.ru}
        </button>
        <button
          onClick={onToggle}
          className={`px-3 py-1 text-xs mono transition-all ${
            locale === "en"
              ? "bg-accent text-primary"
              : "text-textDim hover:text-accent"
          }`}
        >
          {t.lang.en}
        </button>
      </div>
    </div>
  );
}