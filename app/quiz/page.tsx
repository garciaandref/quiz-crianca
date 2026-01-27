"use client";

import React, { useState } from "react";
import { useQuiz } from "../hooks/use-quiz";
import { QuizContainer } from "../components/quiz-container";
import { AnswerButton } from "../components/answer-button";

const encouragements = [
  "Você está indo muito bem! 👏",
  "Continue assim, você consegue! 💪",
  "Ótimo trabalho! 😊",
  "Continue firme! 🚀",
  "Você está arrasando! 🌟",
];

// Cores vibrantes para respostas
const optionColors = [
  "#ffca28", // amarelo
  "#26c6da", // azul claro
  "#ab47bc", // roxo
  "#ff7043", // laranja
];

export default function QuizPage() {
  const [playerName] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("playerName") || "Anônimo";
    }
    return "Anônimo";
  });

  const [encouragement, setEncouragement] = useState(
    () => encouragements[Math.floor(Math.random() * encouragements.length)],
  );

  const {
    currentQuestion,
    currentIndex,
    currentRound,
    roundsLeft,
    roundScore,
    totalScore,
    showRoundResult,
    quizFinished,
    questionsPerRound,
    pointsPerCorrect,
    answerQuestion,
    nextRound,
    resetQuiz,
    finalizeQuiz,
  } = useQuiz();

  const cancelQuiz = () => {
    resetQuiz();
    window.location.href = "/";
  };

  // --- Quiz finalizado ---
  if (quizFinished) {
    return (
      <QuizContainer>
        <h2 style={{ fontSize: "2rem", color: "#d84315" }}>
          🎉 Quiz finalizado!
        </h2>
        <p style={{ fontSize: "1.2rem", margin: "1rem 0" }}>
          {playerName}, sua pontuação final: <strong>{totalScore}</strong>{" "}
          pontos 🎯
        </p>
        <AnswerButton
          label="🔄 Voltar ao início"
          onClick={cancelQuiz}
          style={{ backgroundColor: "#4caf50", color: "#fff" }}
        />
      </QuizContainer>
    );
  }

  // --- Resultado da rodada ---
  if (showRoundResult) {
    return (
      <QuizContainer>
        <h2 style={{ fontSize: "1.8rem", color: "#ff6f00" }}>
          📊 Rodada {currentRound} concluída!
        </h2>
        <p>
          Você acertou <strong>{roundScore}</strong> de {questionsPerRound}{" "}
          perguntas.
        </p>
        <p>
          Pontuação desta rodada:{" "}
          <strong>{roundScore * pointsPerCorrect}</strong>
        </p>
        <p>
          Pontuação total até agora:{" "}
          <strong>{totalScore + roundScore * pointsPerCorrect}</strong>
        </p>

        {roundsLeft > 0 ? (
          <>
            <p
              style={{
                fontWeight: "bold",
                marginTop: "1rem",
                color: "#ef6c00",
              }}
            >
              Restam {roundsLeft} rodadas. {encouragement}
            </p>
            <AnswerButton
              label="Próxima rodada"
              onClick={() => {
                setEncouragement(
                  encouragements[
                    Math.floor(Math.random() * encouragements.length)
                  ],
                );
                nextRound();
              }}
              style={{ backgroundColor: "#29b6f6", color: "#fff" }}
            />
          </>
        ) : (
          <>
            <p
              style={{
                fontWeight: "bold",
                marginTop: "1rem",
                color: "#d84315",
              }}
            >
              Última rodada concluída! 🎉
            </p>
            <AnswerButton
              label="Ver pontuação final"
              onClick={finalizeQuiz}
              style={{ backgroundColor: "#8e24aa", color: "#fff" }}
            />
          </>
        )}
      </QuizContainer>
    );
  }

  // --- Quiz em andamento ---
  return (
    <QuizContainer>
      <h3 style={{ fontSize: "1.5rem", color: "#ff6f00" }}>
        Pergunta {currentIndex + 1} de {questionsPerRound} (Rodada{" "}
        {currentRound} de 3)
      </h3>
      <p style={{ fontSize: "1.2rem", margin: "1rem 0", color: "#bf360c" }}>
        {currentQuestion?.question}
      </p>
      {currentQuestion?.options.map((opt, idx) => (
        <AnswerButton
          key={opt}
          label={opt}
          onClick={() => answerQuestion(opt)}
          style={{
            backgroundColor: optionColors[idx % optionColors.length],
            color: "#fff",
            marginTop: "0.5rem",
          }}
        />
      ))}

      {/* Botão de cancelar quiz */}
      <div style={{ marginTop: "1rem" }}>
        <AnswerButton
          label="❌ Cancelar Quiz"
          onClick={cancelQuiz}
          style={{ backgroundColor: "#f44336", color: "#fff" }}
        />
      </div>
    </QuizContainer>
  );
}
