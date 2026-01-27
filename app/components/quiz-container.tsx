"use client";
import styled from "styled-components";
import React from "react";

export const QuizContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  min-height: 100vh; /* altura completa da tela */
  display: flex;
  flex-direction: column;
  justify-content: center; /* centraliza verticalmente */
  align-items: center; /* centraliza horizontalmente */
  padding: 2rem;
  background: linear-gradient(135deg, #ffecb3, #ffe0b2);
  border-radius: 2rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  text-align: center;
  font-family: "Comic Neue", "Comic Sans MS", cursive, sans-serif;
  color: #3e2723;
  transition: all 0.3s ease;

  @media (max-width: 600px) {
    margin: 0;
    padding: 1.5rem;
    border-radius: 0;
  }
`;
