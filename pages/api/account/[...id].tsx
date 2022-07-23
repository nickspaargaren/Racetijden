import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { apikey, gamertag, id } = req.query;

  if (apikey !== process.env.API_KEY) {
    res.status(401).json({ success: false, data: "Invalid API key" });
  }

  switch (req.method) {
    case "POST":
      try {
        const updateUser = await prisma.user.update({
          where: { id: id as string },
          data: { gamertag: gamertag as string },
        });

        res.status(201).json({ success: true, data: updateUser });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
