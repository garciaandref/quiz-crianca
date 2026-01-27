"use client";
import styled from "styled-components";
import React from "react";

interface Props {
  label: string;
  onClick: () => void;
  style?: React.CSSProperties;
}

export const AnswerButton: React.FC<Props> = ({ label, onClick, style }) => {
  return (
    <Button onClick={onClick} style={style}>
      {label}
    </Button>
  );
};

const Button = styled.button`
  display: block;
  width: 100%;
  margin: 0.5rem 0;
  padding: 1rem;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 1rem;
  border: 3px solid #ff6f00;
  background-color: #ffd54f;
  color: #bf360c;
  cursor: pointer;
  transition:
    transform 0.2s,
    background-color 0.2s;
  &:hover {
    transform: scale(1.05);
    background-color: #ffca28;
  }
  &:active {
    transform: scale(0.95);
  }
`;
