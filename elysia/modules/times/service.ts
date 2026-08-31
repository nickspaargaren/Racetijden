import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const TimesService = {
  findAll() {
    return prisma.time.findMany({
      orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
      include: {
        circuit: {
          select: { name: true, slug: true, flag: true },
        },
      },
    });
  },

  findLatest() {
    return prisma.time.findFirst({
      orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
      include: {
        circuit: {
          select: { name: true, slug: true, flag: true },
        },
      },
    });
  },

  findByGamertag(gamertag: string) {
    return prisma.time.findMany({
      where: { gamertag },
      include: {
        circuit: {
          select: { name: true, slug: true, flag: true },
        },
      },
    });
  },

  async upsert(gamertag: string, time: string, circuitId: number) {
    const updatedTime = await prisma.time.upsert({
      where: {
        timeUpdateId: { circuitId, gamertag },
      },
      update: { time },
      create: { time, gamertag, circuitId },
      include: {
        circuit: {
          select: { name: true, slug: true, flag: true },
        },
      },
    });

    const circuit = await prisma.circuit.findUnique({
      where: { id: circuitId },
      select: { name: true },
    });

    return { time: updatedTime, circuitName: circuit?.name ?? circuitId };
  },
};
