import { treaty } from "@elysiajs/eden";

import type { App } from "@/elysia/app";

export const api = treaty<App>(
  typeof process !== "undefined" && typeof window === "undefined"
    ? "http://localhost:3000"
    : window.location.origin,
).api;
