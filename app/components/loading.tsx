"use client";

import React from "react";
import Image from "next/image";

export function Loading() {
  const lines = ["Quiz", "Animado"]; // 👈 duas linhas fixas

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Comic Neue', cursive",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "#ff6f00",
        fontWeight: 700,
        fontSize: "5rem",
        textShadow: "3px 3px 6px rgba(0,0,0,0.35)",
      }}
    >
      {/* Fundo */}
      <Image
        src="/Jesus_v2.png"
        alt="Jesus"
        fill
        priority
        style={{ objectFit: "cover", zIndex: -1 }}
      />

      {/* Texto */}
      <div
        className="glow"
        style={{
          display: "flex",
          flexDirection: "column", // 👈 quebra em linhas
          alignItems: "center",
          gap: "0.2em",
        }}
      >
        {lines.map((line, lineIndex) => (
          <div key={lineIndex} style={{ display: "flex" }}>
            {line.split("").map((letter, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  animation: "dropBounce 0.8s ease forwards",
                  animationDelay: `${(lineIndex * 6 + i) * 0.3}s`,
                  opacity: 0,
                }}
              >
                {letter}
              </span>
            ))}
          </div>
        ))}
      </div>

      <style>
        {`
          @keyframes dropBounce {
            0% { transform: translateY(-100px); opacity: 0; }
            70% { transform: translateY(10px); opacity: 1; }
            100% { transform: translateY(0); opacity: 1; }
          }

          @keyframes glowPulse {
            0% { text-shadow: 0 0 10px #ff9800; }
            50% { text-shadow: 0 0 40px #ffeb3b; }
            100% { text-shadow: 0 0 10px #ff9800; }
          }

          .glow {
            animation: glowPulse 1.5s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
}
