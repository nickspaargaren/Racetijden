import axios from "axios";
import { z } from "zod";

import { apikeySchema } from "@/lib/schemas";

import { prisma } from "../../../../../lib/prisma";

const addTimeSchema = z.object({
  apikey: apikeySchema,
  gamertag: z.string(),
  time: z.string(),
  circuitId: z.string(),
});

export async function POST(
  request: Request,
  props: { params: Promise<Pick<z.infer<typeof addTimeSchema>, "gamertag">> },
) {
  const params = await props.params;
  const { searchParams } = new URL(request.url);

  const { gamertag } = params;

  const response = addTimeSchema.safeParse({
    apikey: searchParams.get("apikey"),
    gamertag,
    time: searchParams.get("time"),
    circuitId: searchParams.get("circuitId"),
  });

  if (!response.success) {
    const { issues } = response.error;

    return Response.json({ error: { issues } }, { status: 400 });
  }

  if (searchParams.get("apikey") !== process.env.API_KEY) {
    return Response.json(
      { success: false, data: "Invalid API key" },
      { status: 401 },
    );
  }

  const circuitIdInt = parseInt(response.data.circuitId);

  try {
    const updateTime = await prisma.time.upsert({
      where: {
        timeUpdateId: {
          circuitId: circuitIdInt,
          gamertag: response.data.gamertag,
        },
      },
      update: {
        time: response.data.time,
      },
      create: {
        time: response.data.time,
        gamertag: response.data.gamertag,
        circuitId: circuitIdInt,
      },
    });

    const circuitData = await prisma.circuit.findUnique({
      where: {
        id: circuitIdInt,
      },
      select: {
        name: true,
      },
    });

    const circuitName = circuitData?.name || circuitIdInt;

    if (process.env.NODE_ENV === "production") {
      axios.post(
        "https://api.resend.com/emails",
        {
          from: "Racetijden <info@racetijden.nl>",
          to: ["info@racetijden.nl"],
          subject: `New time set by ${response.data.gamertag}!`,
          text: `${response.data.gamertag} set a new time (${response.data.time}) on ${circuitName}`,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.RESEND_MAIL_API_KEY}`,
            "Content-Type": "application/json",
          },
        },
      );
    }

    return Response.json({ success: true, data: updateTime }, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, data: error }, { status: 400 });
  }
}
