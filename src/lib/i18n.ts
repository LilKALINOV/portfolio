export type Locale = "en" | "ru";

export interface Translation {
  hero: {
    title: string;
    subtitle: string;
    tagline: string;
    cta_enter: string;
    cta_scroll: string;
  };
  manifesto: {
    line1: string;
    line2: string;
  };
  work: {
    title: string;
    subtitle: string;
  };
  project: {
    cta: string;
  };
  about: {
    title: string;
    subtitle: string;
    skill1Title: string;
    skill1Desc: string;
    skill2Title: string;
    skill2Desc: string;
    skill3Title: string;
    skill3Desc: string;
  };
  process: {
    title: string;
    step1: string;
    step1Desc: string;
    step2: string;
    step2Desc: string;
    step3: string;
    step3Desc: string;
    step4: string;
    step4Desc: string;
  };
  contact: {
    title: string;
    desc: string;
    telegram: string;
  };
  nav: {
    work: string;
    about: string;
    process: string;
    contact: string;
  };
  lang: {
    ru: string;
    en: string;
  };
}

export const translations: Record<Locale, Translation> = {
  en: {
    hero: {
      title: "Lil KALINOV — Architect of Voice & Code",
      subtitle: "ADMIN . QA . PLUGIN DEVELOPER",
      tagline: "Voice assistants. Network proxies. Terminal agents.",
      cta_enter: "ENTER MY UNIVERSE",
      cta_scroll: "SCROLL TO EXPLORE ↓",
    },
    manifesto: {
      line1: "Design creates feeling.",
      line2: "Code gives it life.",
    },
    work: {
      title: "01 / Selected Work",
      subtitle: "Six projects. Three dimensions of engineering.",
    },
    project: {
      cta: "VIEW PROJECT ↗",
    },
    about: {
      title: "02 / The Mind Behind the Code",
      subtitle: "Curiosity is my engine — I build systems that bridge the physical and digital worlds.",
      skill1Title: "01 / Outer Realm",
      skill1Desc: "Voice interfaces: Astra, Stella, TTS plugins, STT engines. Rust, Python.",
      skill2Title: "02 / Inner Systems",
      skill2Desc: "Proxies & networking: MTProto, WebSocket, DPI bypass. Python, Cloudflare.",
      skill3Title: "03 / Terminal Dimension",
      skill3Desc: "Agentic tools: Go-based CLI, MCP, LSP. For developers who think in code.",
    },
    process: {
      title: "03 / Project Trajectory",
      step1: "Immersion",
      step1Desc: "I dig into your stack, docs, and pain points.",
      step2: "Concept",
      step2Desc: "Architecture shaped around your constraints.",
      step3: "Development",
      step3Desc: "Clean code, tests-first, iterative feedback.",
      step4: "Launch",
      step4Desc: "Shipped, measured, refined until it works.",
    },
    contact: {
      title: "04 / Let's Connect",
      desc: "Have a project in mind? I build things that work. Drop a line.",
      telegram: "Write on Telegram",
    },
    nav: {
      work: "Work",
      about: "About",
      process: "Process",
      contact: "Contact",
    },
    lang: {
      ru: "Русский",
      en: "English",
    },
  },
  ru: {
    hero: {
      title: "Lil KALINOV — Архитектор голоса и кода",
      subtitle: "АДМИН . QA . ПЛАГИН-РАЗРАБОТЧИК",
      tagline: "Голосовые ассистенты. Сетевые прокси. Терминальные агенты.",
      cta_enter: "ВОЙТИ В МОЮ ВСЕЛЕННУЮ",
      cta_scroll: "ПРОКРУТИТЕ ↓",
    },
    manifesto: {
      line1: "Дизайн создаёт чувство.",
      line2: "Код даёт ему жизнь.",
    },
    work: {
      title: "01 / Избранное",
      subtitle: "Шесть проектов. Три измерения инженерии.",
    },
    project: {
      cta: "ПЕРЕЙТИ ↗",
    },
    about: {
      title: "02 / Человек за кодом",
      subtitle: "Любопытство — мой двигатель. Я создаю системы, связывающие физический и цифровой мир.",
      skill1Title: "01 / Внешний мир",
      skill1Desc: "Голосовые интерфейсы: Astra, Stella, плагины TTS, движки STT. Rust, Python.",
      skill2Title: "02 / Внутренние системы",
      skill2Desc: "Прокси и сеть: MTProto, WebSocket, обход DPI. Python, Cloudflare.",
      skill3Title: "03 / Терминальное измерение",
      skill3Desc: "Агентные инструменты: CLI на Go, MCP, LSP. Для разработчиков, думающих на коде.",
    },
    process: {
      title: "03 / Траектория проекта",
      step1: "Погружение",
      step1Desc: "Я изучаю твой стек, документацию и боль.",
      step2: "Концепция",
      step2Desc: "Архитектура вокруг твоих ограничений.",
      step3: "Разработка",
      step3Desc: "Чистый код, тесты сначала, итеративная обратная связь.",
      step4: "Запуск",
      step4Desc: "Запущено, измерено, доведено до совершенства пока работает.",
    },
    contact: {
      title: "04 / Давай свяжемся",
      desc: "Есть проект? Я создаю вещи, которые работают. Пиши.",
      telegram: "Написать в Telegram",
    },
    nav: {
      work: "Работы",
      about: "О себе",
      process: "Процесс",
      contact: "Контакты",
    },
    lang: {
      ru: "Русский",
      en: "English",
    },
  },
};

export const getTranslation = (locale: Locale): Translation => translations[locale];