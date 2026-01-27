"use client";

import React, { useState } from "react";
import { QuizContainer } from "./components/quiz-container";
import styled from "styled-components";

const Input = styled.input`
  width: 80%;
  padding: 0.7rem;
  margin: 1rem 0;
  font-size: 1rem;
  border-radius: 12px;
  border: 2px solid #ff6f61;
  outline: none;
  text-align: center;
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  margin: 0.5rem;
  font-size: 1rem;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  background-color: #ffd54f;
  color: #333;
  font-weight: bold;
  transition: transform 0.1s;

  &:hover {
    transform: scale(1.05);
  }
`;

export default function HomePage() {
  const [name, setName] = useState("");

  const handleStart = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("playerName", name || "Anônimo");
      window.location.href = "/quiz";
    }
  };

  const handleRanking = () => {
    window.location.href = "/ranking";
  };

  return (
    <QuizContainer>
      <h1>🎉 Quiz Bíblico Infantil</h1>
      <p>Digite seu nome para começar a jogar!</p>
      <Input
        placeholder="Seu nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div>
        <Button onClick={handleStart}>Começar Quiz</Button>
        <Button onClick={handleRanking}>Ver Ranking</Button>
      </div>
    </QuizContainer>
  );
}
