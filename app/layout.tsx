"use client";

import "./globals.css";
import { useEffect, useRef, useState } from "react";
import { Loading } from "./components/loading";
import { Comic_Neue } from "next/font/google";

// ✅ Fonte global
const comicNeue = Comic_Neue({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 🎵 Estado da música (inicializado corretamente)
  const [musicEnabled, setMusicEnabled] = useState(() => {
    if (typeof window === "undefined") return true;
    const stored = localStorage.getItem("musicEnabled");
    return stored !== null ? stored === "true" : true;
  });

  const [loading, setLoading] = useState(true);
  const [userInteracted, setUserInteracted] = useState(false);

  const musicRef = useRef<HTMLAudioElement | null>(null);

  // ⏱️ Tempo do loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  // 🖱️ Detecta primeira interação do usuário (obrigatório p/ autoplay)
  useEffect(() => {
    const unlockAudio = () => {
      setUserInteracted(true);
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
    };

    window.addEventListener("click", unlockAudio);
    window.addEventListener("touchstart", unlockAudio);

    return () => {
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
    };
  }, []);

  // 🎶 Controle da música de fundo
  useEffect(() => {
    if (!musicRef.current) return;

    if (musicEnabled && userInteracted) {
      musicRef.current.play().catch(() => {});
    } else {
      musicRef.current.pause();
    }

    localStorage.setItem("musicEnabled", String(musicEnabled));
  }, [musicEnabled, userInteracted]);

  // 🏆 Evento global → pausa música quando tocar som de vitória
  useEffect(() => {
    const stopMusic = () => {
      musicRef.current?.pause();
    };

    window.addEventListener("victory-sound", stopMusic);
    return () => window.removeEventListener("victory-sound", stopMusic);
  }, []);

  return (
    <html lang="pt-BR">
      <body className={comicNeue.className}>
        {/* 🎵 Música de fundo */}
        <audio
          ref={musicRef}
          src="/sounds/background.mp3"
          loop
          preload="auto"
        />

        {/* 🎛️ Botão liga/desliga música */}
        <button
          onClick={() => setMusicEnabled((prev) => !prev)}
          style={{
            position: "fixed",
            top: "1rem",
            right: "1rem",
            zIndex: 9999,
            backgroundColor: musicEnabled ? "#4caf50" : "#f44336",
            color: "#fff",
            border: "none",
            borderRadius: "999px",
            padding: "0.5rem 1rem",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          }}
        >
          {musicEnabled ? "🔊 Música ON" : "🔇 Música OFF"}
        </button>

        {/* ⏳ Loading ou conteúdo */}
        {loading ? <Loading /> : children}
      </body>
    </html>
  );
}
