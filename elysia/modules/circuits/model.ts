import { t } from "elysia";

const CircuitWithTimes = t.Object({
  name: t.String(),
  slug: t.String(),
  description: t.String(),
  flag: t.String(),
  times: t.Array(
    t.Object({
      time: t.String(),
      gamertag: t.String(),
    }),
  ),
});

export const CircuitModel = {
  error: t.Object({
    message: t.Literal("Internal server error"),
  }),
  unauthorized: t.Object({
    message: t.Literal("Unauthorized"),
  }),
  notFound: t.Object({
    message: t.Literal("Circuit not found"),
  }),
  response: t.Array(CircuitWithTimes),
  singleResponse: t.Intersect([CircuitWithTimes, t.Object({ id: t.Number() })]),
};
