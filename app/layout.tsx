"use client";

import "./globals.css";
import { useEffect, useState } from "react";
import { Loading } from "./components/loading";

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
      <body style={{ fontFamily: "'Comic Neue', cursive" }}>
        {loading ? <Loading /> : children}
      </body>
    </html>
  );
}
