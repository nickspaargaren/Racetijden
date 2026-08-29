import { Elysia } from "elysia";

export const apiKeyGuard = new Elysia().derive(
  { as: "scoped" },
  ({ headers, query }) => {
    const apikey = query.apikey ?? headers["x-api-key"];
    if (!apikey || apikey !== process.env.API_KEY) {
      return { authorized: false as const };
    }
    return { authorized: true as const };
  },
);
