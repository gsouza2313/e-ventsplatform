import type { Metadata } from "next";
import { Anton } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

export const metadata: Metadata = {
  title: "EVENT HUB",
  description: "Plataforma de Eventos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={anton.variable}>
      <body className="bg-black text-white min-h-screen">
        <SmoothScroll>
          <header className="flex justify-between items-center px-8 py-4 border-b border-gray-800 bg-black/80 backdrop-blur sticky top-0 z-50">
            <div className="text-xl font-extrabold text-lime-400">
              EVENT HUB
            </div>
            <nav className="flex gap-4">
              <Link
                href="/"
                className="px-4 py-2 rounded-lg bg-lime-950/60 text-lime-400 text-sm font-medium border border-lime-800/50"
              >
                Início
              </Link>
              <Link
                href="/eventos"
                className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
              >
                Gestão de Eventos
              </Link>
              <Link
                href="/participantes"
                className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
              >
                Gestão de Participantes
              </Link>
            </nav>
          </header>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
