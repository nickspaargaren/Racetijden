import { prisma } from "../../../../lib/prisma";

export async function GET() {
  try {
    const time = await prisma.time.findMany({
      take: 1,
      orderBy: [
        {
          updatedAt: "desc",
        },
        {
          createdAt: "desc",
        },
      ],
      include: {
        circuit: {
          select: { name: true, slug: true, flag: true },
        },
      },
    });

    return Response.json({ success: true, data: { times: [time[0]] } });
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
