import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const CircuitService = {
  findAll() {
    return prisma.circuit.findMany({
      select: {
        name: true,
        slug: true,
        description: true,
        flag: true,
        times: {
          select: { time: true, gamertag: true },
          take: 1,
          orderBy: [{ time: "asc" }],
        },
      },
      orderBy: { name: "asc" },
    });
  },
};
