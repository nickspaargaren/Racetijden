import { Elysia, t } from "elysia";

import { apiKeyGuard } from "../guards";
import { CircuitModel } from "./model";
import { CircuitService } from "./service";

export const circuits = new Elysia({ prefix: "/circuits" })
  .use(apiKeyGuard)
  .get(
    "/",
    async ({ status }) => {
      try {
        return await CircuitService.findAll();
      } catch (e) {
        console.error(e);
        return status(500, { message: "Internal server error" });
      }
    },
    {
      response: {
        200: CircuitModel.response,
        500: CircuitModel.error,
      },
    },
  )
  .get(
    "/:slug",
    async ({ authorized, params, status }) => {
      if (!authorized) return status(401, { message: "Unauthorized" });
      try {
        const circuit = await CircuitService.findBySlug(params.slug);
        if (!circuit) return status(404, { message: "Circuit not found" });
        return circuit;
      } catch (e) {
        console.error(e);
        return status(500, { message: "Internal server error" });
      }
    },
    {
      params: t.Object({ slug: t.String() }),
      query: t.Optional(t.Object({ apikey: t.Optional(t.String()) })),
      response: {
        200: CircuitModel.singleResponse,
        401: CircuitModel.unauthorized,
        404: CircuitModel.notFound,
        500: CircuitModel.error,
      },
    },
  );
