import { openapi } from "@elysia/openapi";
import { Elysia } from "elysia";

import { circuits } from "@/elysia/modules/circuits";

const app = new Elysia({ prefix: "/api" })
  .use(openapi())
  .onError(({ error, status }) => {
    console.error(error);
    return status(500, { message: "Internal server error" });
  })
  .use(circuits);

export const GET = app.fetch;
