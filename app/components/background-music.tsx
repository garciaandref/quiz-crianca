"use client";

import { useEffect, useRef, useState } from "react";

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    audioRef.current = new Audio("/sounds/background.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.25;

    const startMusic = () => {
      if (enabled) {
        audioRef.current?.play().catch(() => {});
      }
    };

    const stopMusic = () => {
      audioRef.current?.pause();
      audioRef.current!.currentTime = 0;
    };

    // ▶️ inicia música
    startMusic();

    // 🏆 escuta evento de vitória
    window.addEventListener("victory-sound", stopMusic);

    return () => {
      stopMusic();
      window.removeEventListener("victory-sound", stopMusic);
    };
  }, [enabled]);

  return (
    <button
      onClick={() => {
        if (enabled) {
          audioRef.current?.pause();
        } else {
          audioRef.current?.play().catch(() => {});
        }
        setEnabled(!enabled);
      }}
      style={{
        position: "fixed",
        bottom: "1rem",
        right: "1rem",
        zIndex: 9999,
        background: "#ff6f00",
        color: "#fff",
        border: "none",
        borderRadius: "50%",
        width: "48px",
        height: "48px",
        fontSize: "1.2rem",
        cursor: "pointer",
      }}
    >
      {enabled ? "🔊" : "🔇"}
    </button>
  );
}
