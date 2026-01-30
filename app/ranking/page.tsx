"use client";

import React, { useEffect, useRef, useState } from "react";
import { QuizContainer } from "../components/quiz-container";

interface RankingEntry {
  name: string;
  points: number;
}

export default function RankingPage() {
  const [ranking, setRanking] = useState<RankingEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const victoryPlayed = useRef(false);

  // 📡 Carrega ranking do banco
  useEffect(() => {
    fetch("/api/ranking")
      .then((res) => res.json())
      .then((data) => {
        setRanking(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // 🏆 Som de vitória + pausa música de fundo (1x)
  useEffect(() => {
    if (!loading && ranking.length > 0 && !victoryPlayed.current) {
      // 🔕 avisa a música de fundo para parar
      window.dispatchEvent(new Event("victory-sound"));

      const audio = new Audio("/sounds/victory.mp3");
      audio.volume = 0.6;
      audio.play().catch(() => {});

      victoryPlayed.current = true;
    }
  }, [loading, ranking]);

  const medal = (index: number) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return null;
  };

  return (
    <QuizContainer>
      <h2
        style={{
          fontSize: "2.2rem",
          color: "#ffca28",
          textAlign: "center",
          marginBottom: "1.5rem",
          textShadow: "0 0 14px rgba(255,202,40,0.9)",
        }}
      >
        🏆 Ranking dos Campeões
      </h2>

      {loading ? (
        <p style={{ textAlign: "center" }}>Carregando ranking...</p>
      ) : (
        <ol style={{ listStyle: "none", padding: 0, width: "100%" }}>
          {ranking.map((entry, idx) => {
            const isTop3 = idx < 3;

            let bgColor = "#26c6da";
            let glow = "none";

            if (idx === 0) {
              bgColor = "#ffd700";
              glow = "0 0 28px gold";
            }
            if (idx === 1) {
              bgColor = "#c0c0c0";
              glow = "0 0 18px silver";
            }
            if (idx === 2) {
              bgColor = "#cd7f32";
              glow = "0 0 18px #cd7f32";
            }

            return (
              <li
                key={idx}
                style={{
                  backgroundColor: bgColor,
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "1.3rem",
                  marginBottom: "0.75rem",
                  padding: "0.9rem 1.2rem",
                  borderRadius: "16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  boxShadow: glow,
                  animation: "slideIn 0.6s ease forwards",
                  animationDelay: `${idx * 0.15}s`,
                  opacity: 0,
                  transform: "translateX(-30px)",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                  }}
                >
                  {isTop3 && <span className="medal">{medal(idx)}</span>}
                  {idx + 1}º — {entry.name}
                </span>

                <span>{entry.points} pts</span>
              </li>
            );
          })}
        </ol>
      )}

      <style>
        {`
          @keyframes slideIn {
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .medal {
            font-size: 2rem;
            animation:
              medalPulse 1.5s ease-in-out infinite,
              medalBounce 2s ease-in-out infinite;
          }

          @keyframes medalPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.15); }
            100% { transform: scale(1); }
          }

          @keyframes medalBounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }
        `}
      </style>
    </QuizContainer>
  );
}
