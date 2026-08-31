import { t } from "elysia";

const TimeWithCircuit = t.Object({
  id: t.Number(),
  time: t.String(),
  gamertag: t.String(),
  createdAt: t.Date(),
  updatedAt: t.Date(),
  circuitId: t.Number(),
  circuit: t.Object({
    name: t.String(),
    slug: t.String(),
    flag: t.String(),
  }),
});

export const TimesModel = {
  error: t.Object({
    message: t.Literal("Internal server error"),
  }),
  unauthorized: t.Object({
    message: t.Literal("Unauthorized"),
  }),
  notFound: t.Object({
    message: t.Literal("No times found"),
  }),
  response: t.Array(TimeWithCircuit),
  latestResponse: TimeWithCircuit,
  upsertBody: t.Object({
    time: t.String(),
    circuitId: t.Number(),
  }),
  upsertResponse: t.Object({
    time: TimeWithCircuit,
    circuitName: t.Union([t.String(), t.Number()]),
  }),
};
