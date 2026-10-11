"use client";

import { useEffect, useState, useRef } from "react";
import { getTranslation, Locale } from "@/lib/i18n";
import { getProjects, Project } from "@/lib/projects";
import { Navigation } from "@/components/Navigation";
import { ReadingProgress } from "@/components/ReadingProgress";
import { RevealWrapper } from "@/components/RevealWrapper";
import { MagneticButton } from "@/components/MagneticButton";
import { TiltCard } from "@/components/TiltCard";
import { LanguageToggle } from "@/components/LanguageToggle";

export default function Home() {
  const [locale, setLocale] = useState<Locale>("en");
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const t = getTranslation(locale);
  const projects = getProjects();

  // Parallax cursor tracking для 3D сцен
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursor({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Reading progress bar
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

  const toggleLocale = () => {
    setLocale(locale === "en" ? "ru" : "en");
  };

  return (
    <>
      {/* Reading progress bar */}
      <div
        id="reading-progress"
        style={{ transform: `scaleX(${scrollY / 100})` }}
      />

      {/* Three.js Canvas Background */}
      <ThreeSceneBackground cursor={cursor} locale={locale} />

      {/* Navigation */}
      <Navigation t={t} />

      {/* Language Toggle */}
      <LanguageToggle t={t} locale={locale} onToggle={toggleLocale} />

      {/* ===== HERO ===== */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="container text-center relative z-10">
          <RevealWrapper delay={0}>
            <span className="section-num">00 /</span>
          </RevealWrapper>

          <RevealWrapper delay={1}>
            <h1 className="display text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-accent via-white to-accent2 animate-gradient">
              {t.hero.title}
            </h1>
          </RevealWrapper>

          <RevealWrapper delay={2}>
            <p className="text-xl md:text-2xl text-textDim mb-8 mono">
              {t.hero.subtitle}
            </p>
          </RevealWrapper>

          <RevealWrapper delay={3}>
            <p className="text-lg text-textDim mb-12 mono">
              {t.hero.tagline}
            </p>
          </RevealWrapper>

          <RevealWrapper delay={4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton href="#work" label={t.hero.cta_enter} />
              <a
                href="#work"
                className="btn btn-ghost mono"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {t.hero.cta_scroll}
              </a>
            </div>
          </RevealWrapper>
        </div>

        {/* Manifesto marquee strip */}
        <div className="fixed bottom-0 left-0 w-full bg-secondary/80 backdrop-blur-sm py-2 px-4 mono text-xs uppercase tracking-widest text-textDim z-20 overflow-hidden border-t border-border">
          <div className="flex whitespace-nowrap animate-marquee">
            <span className="star">✧</span>
            <span className="mx-4">{t.manifesto.line1}</span>
            <span className="star">✦</span>
            <span className="mx-4">{t.manifesto.line2}</span>
            <span className="star">✧</span>
            <span className="mx-4">Lil KALINOV · SPHEREPRIME</span>
            <span className="star">✦</span>
            <span className="mx-4">RU / EN</span>
            <span className="star">✧</span>
            <span className="mx-4">TELEGRAM @SPHEREPRIME</span>
          </div>
        </div>
      </section>

      {/* ===== WORK ===== */}
      <section id="work" className="section">
        <div className="container">
          <RevealWrapper>
            <span className="section-num">{t.work.title.split("/")[0].trim()}</span>
          </RevealWrapper>

          <RevealWrapper delay={1}>
            <h2 className="display text-3xl md:text-5xl font-bold mb-2">
              {t.work.title}
            </h2>
          </RevealWrapper>

          <RevealWrapper delay={2}>
            <p className="text-textDim mb-12 mono">{t.work.subtitle}</p>
          </RevealWrapper>

          <div className="space-y-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                total={projects.length}
                t={t}
                locale={locale}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="about" className="section bg-secondary/30">
        <div className="container">
          <RevealWrapper>
            <span className="section-num">02 /</span>
          </RevealWrapper>

          <RevealWrapper delay={1}>
            <h2 className="display text-3xl md:text-5xl font-bold mb-2">
              {t.about.title}
            </h2>
          </RevealWrapper>

          <RevealWrapper delay={2}>
            <p className="text-textDim mb-12 mono max-w-2xl">
              {t.about.subtitle}
            </p>
          </RevealWrapper>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TiltCard
              title={t.about.skill1Title}
              desc={t.about.skill1Desc}
              delay={0}
            />
            <TiltCard
              title={t.about.skill2Title}
              desc={t.about.skill2Desc}
              delay={1}
            />
            <TiltCard
              title={t.about.skill3Title}
              desc={t.about.skill3Desc}
              delay={2}
            />
          </div>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section id="process" className="section">
        <div className="container">
          <RevealWrapper>
            <span className="section-num">03 /</span>
          </RevealWrapper>

          <RevealWrapper delay={1}>
            <h2 className="display text-3xl md:text-5xl font-bold mb-2">
              {t.process.title}
            </h2>
          </RevealWrapper>

          <RevealWrapper delay={2}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              <ProcessStep
                num="01"
                title={t.process.step1}
                desc={t.process.step1Desc}
                delay={0}
              />
              <ProcessStep
                num="02"
                title={t.process.step2}
                desc={t.process.step2Desc}
                delay={1}
              />
              <ProcessStep
                num="03"
                title={t.process.step3}
                desc={t.process.step3Desc}
                delay={2}
              />
              <ProcessStep
                num="04"
                title={t.process.step4}
                desc={t.process.step4Desc}
                delay={3}
              />
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" className="section bg-secondary/30">
        <div className="container text-center">
          <RevealWrapper>
            <span className="section-num">04 /</span>
          </RevealWrapper>

          <RevealWrapper delay={1}>
            <h2 className="display text-3xl md:text-5xl font-bold mb-4">
              {t.contact.title}
            </h2>
          </RevealWrapper>

          <RevealWrapper delay={2}>
            <p className="text-textDim mb-8 mono max-w-xl mx-auto">
              {t.contact.desc}
            </p>
          </RevealWrapper>

          <RevealWrapper delay={3}>
            <MagneticButton
              href="https://t.me/SpherePrime"
              label={t.contact.telegram}
              fullWidth
            />
          </RevealWrapper>

          <RevealWrapper delay={4}>
            <p className="mt-8 text-xs text-textDim mono">
              © 2026 Lil KALINOV · Krasnoyarsk · Working worldwide
            </p>
          </RevealWrapper>
        </div>
      </section>
    </>
  );
}

// ===== Three.js Scene Component =====
function ThreeSceneBackground({
  cursor,
  locale,
}: {
  cursor: { x: number; y: number };
  locale: Locale;
}) {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const { initSpaceScene } = require("@/lib/three-init");
    const cleanup = initSpaceScene(canvasRef.current, cursor, locale);
    return cleanup;
  }, []);

  // Обновляем курсор в сцене
  useEffect(() => {
    if (!canvasRef.current) return;
    const scene = (canvasRef.current as any).__spaceScene;
    if (scene && scene.uniforms) {
      scene.uniforms.cursor.value.x = cursor.x / window.innerWidth;
      scene.uniforms.cursor.value.y = cursor.y / window.innerHeight;
    }
  }, [cursor]);

  return <div ref={canvasRef} className="fixed inset-0 -z-10" />;
}

// ===== Project Card =====
function ProjectCard({
  project,
  index,
  total,
  t,
  locale,
}: {
  project: Project;
  index: number;
  total: number;
  t: any;
  locale: Locale;
}) {
  const title = project.title[locale];
  const category = project.category[locale];
  const description = project.description[locale];
  const role = project.role[locale];

  return (
    <RevealWrapper delay={index}>
      <div className="card p-6 md:p-8 group transition-all duration-300">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Project number + image placeholder */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="aspect-[4/3] bg-secondary/50 rounded-lg border border-border flex items-center justify-center text-textDim mono text-xs">
              {project.image ? (
                <img
                  src={project.image}
                  alt={title}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <span className="text-center">
                  {title} <br />
                  <span className="opacity-50">{category}</span>
                </span>
              )}
            </div>
          </div>

          {/* Project content */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="text-xs font-mono opacity-40">
                  {String(index + 1).padStart(2, "0")} / {total}
                </span>
                <h3 className="display text-2xl font-bold mt-1">{title}</h3>
                <p className="text-sm text-textDim mono">{category}</p>
              </div>
              <div className="flex gap-3">
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link text-xs mono"
                  >
                    Code ↗
                  </a>
                )}
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link text-xs mono"
                >
                    Demo ↗
                </a>
              </div>
            </div>

            <p className="text-textDim mb-4 mono text-sm leading-relaxed">
              {description}
            </p>

            <div className="flex flex-wrap gap-2 mb-3">
              {project.tech.split(" · ").map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs bg-accent/10 text-accent border border-accent/20 rounded font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>

            <p className="text-xs text-textDim mono">
              <span className="opacity-50">Role:</span> {role}
            </p>
          </div>
        </div>
      </div>
    </RevealWrapper>
  );
}

// ===== Process Step =====
function ProcessStep({
  num,
  title,
  desc,
  delay,
}: {
  num: string;
  title: string;
  desc: string;
  delay: number;
}) {
  return (
    <RevealWrapper delay={delay}>
      <div className="card p-6 h-full">
        <span className="text-xs font-mono opacity-40">{num} /</span>
        <h3 className="display text-xl font-bold mt-2 mb-2">{title}</h3>
        <p className="text-sm text-textDim mono">{desc}</p>
      </div>
    </RevealWrapper>
  );
}