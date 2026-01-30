import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const ranking = await prisma.score.findMany({
    take: 10,
    orderBy: {
      points: "desc",
    },
    include: {
      player: true,
    },
  });

  return NextResponse.json(
    ranking.map((item) => ({
      name: item.player.name,
      points: item.points,
    })),
  );
}
