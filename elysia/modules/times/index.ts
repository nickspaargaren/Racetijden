import axios from "axios";
import { Elysia, t } from "elysia";

import { apiKeyGuard } from "../guards";
import { TimesModel } from "./model";
import { TimesService } from "./service";

export const times = new Elysia({ prefix: "/times" })
  .use(apiKeyGuard)
  .get(
    "/",
    async ({ authorized, status }) => {
      if (!authorized) return status(401, { message: "Unauthorized" });
      try {
        return await TimesService.findAll();
      } catch (e) {
        console.error(e);
        return status(500, { message: "Internal server error" });
      }
    },
    {
      query: t.Optional(t.Object({ apikey: t.Optional(t.String()) })),
      response: {
        200: TimesModel.response,
        401: TimesModel.unauthorized,
        500: TimesModel.error,
      },
    },
  )
  .get(
    "/latest",
    async ({ status }) => {
      try {
        return await TimesService.findLatest();
      } catch (e) {
        console.error(e);
        return status(500, { message: "Internal server error" });
      }
    },
    {
      response: {
        200: TimesModel.response,
        500: TimesModel.error,
      },
    },
  )
  .get(
    "/:gamertag",
    async ({ authorized, params, status }) => {
      if (!authorized) return status(401, { message: "Unauthorized" });
      try {
        const times = await TimesService.findByGamertag(params.gamertag);
        if (!times.length) return status(404, { message: "No times found" });
        return times;
      } catch (e) {
        console.error(e);
        return status(500, { message: "Internal server error" });
      }
    },
    {
      params: t.Object({ gamertag: t.String() }),
      query: t.Optional(t.Object({ apikey: t.Optional(t.String()) })),
      response: {
        200: TimesModel.response,
        401: TimesModel.unauthorized,
        404: TimesModel.notFound,
        500: TimesModel.error,
      },
    },
  )
  .post(
    "/:gamertag/add",
    async ({ authorized, params, body, status }) => {
      if (!authorized) return status(401, { message: "Unauthorized" });
      try {
        const { time, circuitName } = await TimesService.upsert(
          params.gamertag,
          body.time,
          body.circuitId,
        );

        if (process.env.NODE_ENV === "production") {
          axios.post(
            "https://api.resend.com/emails",
            {
              from: "Racetijden <info@racetijden.nl>",
              to: ["info@racetijden.nl"],
              subject: `New time set by ${params.gamertag}!`,
              text: `${params.gamertag} set a new time (${body.time}) on ${circuitName}`,
            },
            {
              headers: {
                Authorization: `Bearer ${process.env.RESEND_MAIL_API_KEY}`,
                "Content-Type": "application/json",
              },
            },
          );
        }

        return { time, circuitName };
      } catch (e) {
        console.error(e);
        return status(500, { message: "Internal server error" });
      }
    },
    {
      params: t.Object({ gamertag: t.String() }),
      query: t.Optional(t.Object({ apikey: t.Optional(t.String()) })),
      body: TimesModel.upsertBody,
      response: {
        200: TimesModel.upsertResponse,
        401: TimesModel.unauthorized,
        500: TimesModel.error,
      },
    },
  );
