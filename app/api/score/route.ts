import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, score, quizId } = await req.json();

    if (!name || typeof score !== "number") {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }

    // cria ou reutiliza jogador
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
        quizId: quizId ?? null,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao salvar pontuação" },
      { status: 500 },
    );
  }
}
