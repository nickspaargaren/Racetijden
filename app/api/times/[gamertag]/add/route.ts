import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { z } from "zod";

import { apikeySchema } from "@/lib/schemas";

const prisma = new PrismaClient();

const addTimeSchema = z.object({
  apikey: apikeySchema,
  gamertag: z.string({
    required_error: "gamertag is required",
    invalid_type_error: "gamertag must be a string",
  }),
  time: z.string({
    required_error: "time is required",
    invalid_type_error: "time must be a string",
  }),
  circuitId: z.string({
    required_error: "circuitId is required",
    invalid_type_error: "circuitId must be a string",
  }),
});

type AddTimeSchema = Omit<z.infer<typeof addTimeSchema>, "apikey">;

export async function POST(
  request: Request,
  { params }: { params: AddTimeSchema }
) {
  const { searchParams } = new URL(request.url);

  const { gamertag } = params;

  const response = addTimeSchema.safeParse({
    apikey: searchParams.get("apikey"),
    gamertag,
    time: searchParams.get("time"),
    circuitId: searchParams.get("circuitId"),
  });

  if (!response.success) {
    const { errors } = response.error;

    return Response.json({ error: { errors } }, { status: 400 });
  }

  if (searchParams.get("apikey") !== process.env.API_KEY) {
    return Response.json(
      { success: false, data: "Invalid API key" },
      { status: 401 }
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
        }
      );
    }

    return Response.json({ success: true, data: updateTime }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, data: error }, { status: 400 });
  }
}