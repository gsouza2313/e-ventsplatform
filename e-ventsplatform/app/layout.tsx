import type { Metadata, Viewport } from "next";
import { Anton, Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import { ClerkProvider, SignInButton, UserButton } from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";
import { auth } from "@clerk/nextjs/server";
import { Footer } from "./components/Footer";
import { Header } from "./components/Navbar";

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
  title: "E-vents",
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
          suppressHydrationWarning
        >
          <Header userId={userId} />
          <SmoothScroll>
            <main className="w-full min-w-0 flex-1 flex  flex-col">{children}</main>
          </SmoothScroll>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
