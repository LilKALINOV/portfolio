import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Lil KALINOV — Voice & Code Architect",
  description:
    "Lil KALINOV: admin, QA engineer, plugin developer at KNICE TECH & MINICE. Builds voice assistants (Astra, Stella), MTProto proxies, terminal agents, and cross-platform desktop tools.",
  keywords: [
    "Lil KALINOV",
    "Astra",
    "Stella",
    "PrimeProxy",
    "MTProto",
    "voice assistant",
    "plugin developer",
    "Rust",
    "Python",
    "TypeScript",
    "Go",
  ],
  authors: [{ name: "Lil KALINOV" }],
  openGraph: {
    title: "Lil KALINOV — Voice & Code Architect",
    description:
      "Admin, QA engineer, plugin developer. Voice interfaces, network proxies, terminal agents.",
    url: "https://lilkalinov.github.io/portfolio",
    siteName: "Lil KALINOV Portfolio",
    locale: "en_US",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}