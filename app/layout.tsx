import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import logo from "@/public/Logo.svg"

const nunitoSans = Nunito_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lista de países",
  description: "Lista de países criada com o next 14",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={nunitoSans.className}>
        <main className="bg-gray-100 min-h-screen flex flex-col items-center">
          <nav className="w-full bg-white h-16 flex items-center justify-center">
            <section className="container flex items-center gap-3">
              <Image src={logo} width={48} height={48} alt="Logo"/>
              <h1 className="font-bold text-2xl">Lista de páises</h1>
            </section>
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}
