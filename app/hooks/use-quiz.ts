import { useState } from "react";
import { Question } from "../../types/quiz";
import { questions as allQuestions } from "../data/questions";

export function useQuiz() {
  const questionsPerRound = 5;
  const totalRounds = 3;
  const pointsPerCorrect = 5;

  // Embaralha perguntas apenas uma vez
  const [shuffledQuestions] = useState<Question[]>(() => {
    const copy = [...allQuestions];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  });

  const [currentRound, setCurrentRound] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [roundScore, setRoundScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [showRoundResult, setShowRoundResult] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const startIndex = (currentRound - 1) * questionsPerRound;
  const endIndex = startIndex + questionsPerRound;
  const currentQuestions = shuffledQuestions.slice(startIndex, endIndex);
  const currentQuestion = currentQuestions[currentIndex] || null;

  const roundsLeft = totalRounds - currentRound;

  // --- Responder pergunta ---
  function answerQuestion(answer: string) {
    if (!currentQuestion) return;

    if (answer === currentQuestion.correctAnswer) {
      setRoundScore((prev) => prev + 1);
    }

    if (currentIndex + 1 < currentQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setShowRoundResult(true);
    }
  }

  // --- Próxima rodada ---
  function nextRound() {
    setTotalScore((prev) => prev + roundScore * pointsPerCorrect);
    setRoundScore(0);
    setCurrentIndex(0);

    if (currentRound < totalRounds) {
      setShowRoundResult(false);
      setCurrentRound((prev) => prev + 1);
    } else {
      finalizeQuiz();
    }
  }

  // --- Finaliza quiz e registra ranking ---
  function finalizeQuiz() {
    const finalScore = totalScore + roundScore * pointsPerCorrect;
    setTotalScore(finalScore);
    setRoundScore(0);
    setShowRoundResult(false);
    setQuizFinished(true);

    // Atualiza ranking no localStorage
    if (typeof window !== "undefined") {
      const storedRanking = localStorage.getItem("quizRanking");
      const ranking = storedRanking ? JSON.parse(storedRanking) : [];

      ranking.push({
        name: localStorage.getItem("playerName") || "Anônimo",
        score: finalScore,
      });

      // Ordena em ordem decrescente e mantém apenas os top 10
      ranking.sort(
        (a: { score: number }, b: { score: number }) => b.score - a.score,
      );
      const top10 = ranking.slice(0, 10);

      localStorage.setItem("quizRanking", JSON.stringify(top10));
    }
  }

  // --- Reseta quiz ---
  function resetQuiz() {
    setCurrentRound(1);
    setCurrentIndex(0);
    setRoundScore(0);
    setTotalScore(0);
    setShowRoundResult(false);
    setQuizFinished(false);
  }

  return {
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
    currentQuestions,
    answerQuestion,
    nextRound,
    resetQuiz,
    finalizeQuiz,
  };
}
