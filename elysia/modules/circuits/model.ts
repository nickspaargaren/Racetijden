import { t } from "elysia";

export const CircuitModel = {
  error: t.Object({
    message: t.Literal("Internal server error"),
  }),
  response: t.Array(
    t.Object({
      name: t.String(),
      slug: t.String(),
      description: t.String(),
      flag: t.Nullable(t.String()),
      times: t.Array(
        t.Object({
          time: t.String(),
          gamertag: t.String(),
        }),
      ),
    }),
  ),
};
