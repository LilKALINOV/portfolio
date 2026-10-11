export interface Project {
  id: string;
  title: { en: string; ru: string };
  category: { en: string; ru: string };
  description: { en: string; ru: string };
  tech: string;
  role: { en: string; ru: string };
  url: string;
  repo?: string;
  image?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "primeproxy",
    title: { en: "PrimeProxy", ru: "PrimeProxy" },
    category: { en: "Network Proxy · Russia", ru: "Сетевой прокси · РФ" },
    description: {
      en:
        "Local MTProto WebSocket proxy with iOS 26-style UI that accelerates Telegram Desktop by routing traffic through encrypted WebSocket tunnels to Telegram DCs. Includes Fake TLS, Cloudflare bypass, auto-updates, and 443+ tests.",
      ru:
        "Локальный MTProto-прокси с WebSocket и iOS 26 UI. Ускоряет Telegram Desktop, маскируя трафик под HTTPS, с обходом DPI через Fake TLS и Cloudflare. Автообновления, 443 теста.",
    },
    tech: "Python · PyInstaller · pywebview · WinDivert · Cloudflare",
    role: {
      en: "Lead Architect & Sole Developer — full-stack from core proxy engine to iOS 26-style glass UI",
      ru: "Ведущий архитектор и sole developer — от MTProto-движка до iOS 26 стекла",
    },
    url: "https://github.com/SpherePrime/PrimeProxy",
    repo: "https://github.com/SpherePrime/PrimeProxy",
    featured: true,
  },
  {
    id: "astra-silero",
    title: { en: "astra-silero", ru: "astra-silero" },
    category: { en: "Voice Plugin · Astra", ru: "Голосовой плагин · Astra" },
    description: {
      en:
        "On-device Russian text-to-speech for Astra using Silero V5 neural models. Fully offline after one-time 140MB download, with 5 voices and bilingual RU/EN UI.",
      ru:
        "Локальный русский TTS для Astra на нейросетях Silero V5. Полностью офлайн после скачивания модели (~140 МБ), 5 голосов, двуязычный интерфейс.",
    },
    tech: "Rust · Python · PyTorch · Silero · Astra Plugin SDK",
    role: {
      en: "Sole Developer — designed cross-process bridge (Rust↔Python), bilingual i18n, worker prefetching",
      ru: "Sole developer — кросс-процессный мост Rust↔Python, двуязычность, prefetch воркера",
    },
    url: "https://github.com/LilKALINOV/astra-silero",
    repo: "https://github.com/LilKALINOV/astra-silero",
    featured: true,
  },
  {
    id: "primeai",
    title: { en: "PrimeAI", ru: "PrimeAI" },
    category: { en: "AI Provider · Astra", ru: "ИИ-провайдер · Astra" },
    description: {
      en:
        "AI provider plugin for Astra using Router API with automatic model routing, vision support, and DuckDuckGo MCP web search. Built together with dwertyfa.",
      ru:
        "AI-провайдер для Astra с автоматической маршрутизацией Router API, поддержкой vision и поиском DuckDuckGo через MCP. Совместная разработка с dwertyfa.",
    },
    tech: "Bun · TypeScript · Astra Plugin SDK · esbuild · Vitest",
    role: {
      en: "Co-author — vision support, web search tool, retry logic",
      ru: "Соавтор — vision, веб-поиск, retry-логика",
    },
    url: "https://github.com/SpherePrime/PrimeAi",
    repo: "https://github.com/SpherePrime/PrimeAi",
    featured: true,
  },
  {
    id: "google-stt",
    title: { en: "Astra-Google-STT", ru: "Astra-Google-STT" },
    category: { en: "Speech Recognition · Astra", ru: "Распознавание речи · Astra" },
    description: {
      en:
        "Keyless speech-to-text plugin using Google's Web Speech API. Supports 38 languages, live streaming with silence detection, and optional custom API keys.",
      ru:
        "Плагин распознавания речи без ключей через Google Web Speech API. 38 языков, стриминг с детекцией молчания, опция своего ключа.",
    },
    tech: "Rust · Google Web Speech API · Astra Plugin SDK",
    role: {
      en: "Sole Developer — full plugin from scratch",
      ru: "Sole developer — плагин с нуля",
    },
    url: "https://github.com/LilKALINOV/Astra-Google-STT",
    repo: "https://github.com/LilKALINOV/Astra-Google-STT",
    featured: true,
  },
  {
    id: "ddg-search",
    title: { en: "astra-websearch-ddg", ru: "astra-websearch-ddg" },
    category: { en: "Search Plugin · Astra", ru: "Поисковый плагин · Astra" },
    description: {
      en:
        "DuckDuckGo web search plugin for Astra with unlimited results, Instant Answer fallback, and localized error messages in EN, RU, UK.",
      ru:
        "Поиск через DuckDuckGo в Astra с неограниченным количеством результатов, fallback на Instant Answer и локализацией на EN, RU, UK.",
    },
    tech: "Python · BeautifulSoup · requests · DuckDuckGo API",
    role: {
      en: "Sole Developer — API integration, HTML parsing, localization",
      ru: "Sole developer — интеграция API, парсинг HTML, локализация",
    },
    url: "https://github.com/LilKALINOV/astra-websearch-ddg",
    repo: "https://github.com/LilKALINOV/astra-websearch-ddg",
    featured: true,
  },
  {
    id: "prime-cli",
    title: { en: "Prime CLI", ru: "Prime CLI" },
    category: { en: "Terminal Agent · SpherePrime", ru: "Терминальный агент · SpherePrime" },
    description: {
      en:
        "Agentic coding assistant for the terminal — LSP-enhanced, MCP-extensible, multi-model, with safe-by-default permissions. 49 commits alongside dwertyfa's 211.",
      ru:
        "Агентный кодинговый ассистент для терминала — с LSP, MCP, множеством моделей и безопасностью по умолчанию. 49 коммитов к 211 dwertyfa.",
    },
    tech: "Go · SQLite · LSP · MCP · mvdan/sh · Taskfile",
    role: {
      en: "Contributor — shell execution layer, task definitions, SQLC schema generation",
      ru: "Контрибьютор — слой выполнения shell, task-определения, sqlc-генерация",
    },
    url: "https://github.com/SpherePrime/CLI",
    repo: "https://github.com/SpherePrime/CLI",
    featured: true,
  },
];

export const getProjects = () => projects.filter((p) => p.featured);