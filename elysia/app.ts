import { openapi } from "@elysia/openapi";
import { Elysia } from "elysia";

import { circuits } from "./modules/circuits";
import { times } from "./modules/times";

export const app = new Elysia({ prefix: "/api" })
  .use(
    openapi({
      documentation: {
        info: {
          title: "Racetijden API",
          description: "Documentation for the Racetijden API",
        },
      },
    }),
  )
  .onError(({ error, status }) => {
    console.error(error);
    return status(500, { message: "Internal server error" });
  })
  .use(circuits)
  .use(times);

export type App = typeof app;
