"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Header({ userId }: { userId: string | null }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function getLinkClasses(path: string, isMobile: boolean = false) {
    const baseClasses = `rounded-xl text-sm font-medium transition-colors ${
      isMobile ? "block w-full px-4 py-3 text-left" : "px-4 py-2"
    }`;

    if (pathname === path) {
      return `${baseClasses} bg-lime-950/60 text-lime-400 border-lime-800/50`;
    } else {
      return `${baseClasses} border-transparent text-gray-300 hover:text-white hover:bg-white/5`;
    }
  }

  const fecharMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 flex justify-between items-center px-6 md:px-8 py-4 border-b border-lime-950 bg-zinc-950">
      {/* LOGO */}
      <div className="text-xl font-anton font-extrabold text-lime-400 z-50">
        <div className="text-2xl font-black uppercase tracking-wider font-anton">
          <span className="text-lime-400">Event</span>{" "}
          <span className="text-white">Hub</span>
        </div>
      </div>

      {/* ÍCONE HAMBÚRGUER */}
      <button
        className="md:hidden text-lime-400 p-2 z-50 hover:bg-white/5 rounded-lg transition-colors"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Alternar menu"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* NAVEGAÇÃO DESKTOP */}
      <div className="hidden md:flex items-center gap-6">
        <nav className="flex gap-4">
          <Link href="/" className={getLinkClasses("/")}>
            Início
          </Link>
          <Link href="/eventos" className={getLinkClasses("/eventos")}>
            Gestão de Eventos
          </Link>
          <Link
            href="/participantes"
            className={getLinkClasses("/participantes")}
          >
            Gestão de Participantes
          </Link>
        </nav>

        <div className="flex items-center border-l border-gray-800 pl-6">
          {!userId && (
            <SignInButton mode="modal">
              <button className="px-5 py-2 rounded-lg bg-lime-500 hover:bg-lime-400 text-black text-sm font-bold transition-all shadow-[0_0_15px_rgba(132,204,22,0.3)] hover:shadow-[0_0_25px_rgba(132,204,22,0.5)]">
                Entrar
              </button>
            </SignInButton>
          )}
          {userId && (
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10 border-2 border-lime-500/50",
                },
              }}
            />
          )}
        </div>
      </div>

      {/* MENU MOBILE */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-zinc-950 border-b border-lime-950 p-6 flex flex-col gap-4 md:hidden z-40 shadow-2xl">
          <nav className="flex flex-col gap-2">
            <Link
              href="/"
              onClick={fecharMenu}
              className={getLinkClasses("/", true)}
            >
              Início
            </Link>
            <Link
              href="/eventos"
              onClick={fecharMenu}
              className={getLinkClasses("/eventos", true)}
            >
              Gestão de Eventos
            </Link>
            <Link
              href="/participantes"
              onClick={fecharMenu}
              className={getLinkClasses("/participantes", true)}
            >
              Gestão de Participantes
            </Link>
          </nav>

          <div className="pt-4 mt-2 border-t border-gray-800/80 flex items-center justify-between">
            {!userId && (
              <SignInButton mode="modal">
                <button className="w-full px-5 py-3 rounded-lg bg-lime-500 hover:bg-lime-400 text-black text-sm font-bold transition-all">
                  Entrar
                </button>
              </SignInButton>
            )}
            {userId && (
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10 border-2 border-lime-500/50",
                    },
                  }}
                />
                <span>Minha Conta</span>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
