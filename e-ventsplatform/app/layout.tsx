import type { Metadata, Viewport } from "next";
import { Anton, Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import { ClerkProvider, SignInButton, UserButton } from '@clerk/nextjs'
import { ptBR } from '@clerk/localizations'
import { auth } from '@clerk/nextjs/server'
import { Footer } from "./components/Footer";


const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "EVENT HUB",
  description: "Plataforma de Eventos",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  return (
    <ClerkProvider localization={ptBR}>
      <html
        lang="pt-BR"
        className={anton.variable}
        style={{ width: "100vw", minHeight: "100vh" }}
      >
        <body
          style={{ width: "100vw", minHeight: "100vh", margin: 0 }}
          className="bg-black text-white"
        >
          <SmoothScroll>
            <header className="flex justify-between items-center px-8 py-4 border-b border-lime-950 bg-zinc-950 sticky top-0 z-50">
              
              <div className="text-xl font-anton font-extrabold text-lime-400">
                EVENT HUB
              </div>

              <div className="flex items-center gap-6">
                <nav className="flex gap-4">
                  <Link href="/" className="px-4 py-2 rounded-lg bg-lime-950/60 text-lime-400 text-sm font-medium border border-lime-800/50">
                    Início
                  </Link>
                  <Link href="/eventos" className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors">
                    Gestão de Eventos
                  </Link>
                  <Link href="/participantes" className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors">
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
            </header>
            
            <main className="w-full min-w-0">
              {children}
            </main>
          </SmoothScroll>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}