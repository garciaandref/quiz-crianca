import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { name, score } = await req.json();

  if (!name || typeof score !== "number") {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  // cria jogador (ou reaproveita)
  const player = await prisma.player.upsert({
    where: { name },
    update: {},
    create: { name },
  });

  // salva pontuação
  await prisma.score.create({
    data: {
      points: score,
      playerId: player.id,
    },
  });

  return NextResponse.json({ success: true });
}
