"use client";

import "./globals.css";
import { useEffect, useState } from "react";
import { Loading } from "./components/loading";
import { Comic_Neue } from "next/font/google";

// ✅ Fonte vinda do Google (global)
const comicNeue = Comic_Neue({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ⏱️ TEMPO TOTAL DO LOADING (frase + brilho)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000); // ⬅️ controle REAL aqui

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="pt-BR">
      <body className={comicNeue.className}>
        {loading ? <Loading /> : children}
      </body>
    </html>
  );
}
