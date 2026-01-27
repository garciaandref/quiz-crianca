"use client";

import React, { useState } from "react";
import { QuizContainer } from "../components/quiz-container";

interface RankingEntry {
  name: string;
  score: number;
}

export default function RankingPage() {
  // Inicializa o ranking a partir do localStorage de forma segura
  const [ranking] = useState<RankingEntry[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("quizRanking");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  // Ordena do maior para o menor e pega top 10
  const topRanking = ranking
    .slice()
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  return (
    <QuizContainer>
      <h2
        style={{
          fontSize: "2rem",
          color: "#ff6f00",
          textAlign: "center",
          marginBottom: "1rem",
        }}
      >
        🏆 Ranking Top 10
      </h2>

      {topRanking.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "1.2rem" }}>
          Nenhuma pontuação registrada ainda.
        </p>
      ) : (
        <ol style={{ listStyle: "none", padding: 0, width: "100%" }}>
          {topRanking.map((entry, idx) => {
            // Destaque para os 3 primeiros
            let bgColor = "#29b6f6"; // padrão azul
            if (idx === 0) bgColor = "#ffd700"; // ouro
            if (idx === 1) bgColor = "#c0c0c0"; // prata
            if (idx === 2) bgColor = "#cd7f32"; // bronze

            return (
              <li
                key={idx}
                style={{
                  backgroundColor: bgColor,
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  marginBottom: "0.5rem",
                  padding: "0.75rem 1rem",
                  borderRadius: "12px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                }}
              >
                <span>{entry.name}</span>
                <span>{entry.score} pts</span>
              </li>
            );
          })}
        </ol>
      )}

      {/* Botão de voltar ao início */}
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        <button
          onClick={() => (window.location.href = "/")}
          style={{
            backgroundColor: "#ff6f00",
            color: "#fff",
            fontSize: "1.2rem",
            padding: "0.75rem 2rem",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
            transition: "transform 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.05)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          🏠 Voltar ao início
        </button>
      </div>
    </QuizContainer>
  );
}
