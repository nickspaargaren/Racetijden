import { Elysia } from "elysia";

import { CircuitModel } from "./model";
import { CircuitService } from "./service";

export const circuits = new Elysia({ prefix: "/circuits" }).get(
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
);
