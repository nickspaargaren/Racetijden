import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const circuits = await prisma.circuit.findMany({
      select: {
        name: true,
        slug: true,
        description: true,
        flag: true,
        times: {
          select: { time: true, gamertag: true },
          take: 1,
          orderBy: [
            {
              time: "asc",
            },
          ],
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    return Response.json({ success: true, data: { circuits } });
  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false },
      {
        status: 400,
      },
    );
  }
}
