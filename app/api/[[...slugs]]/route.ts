import { app } from "@/elysia/app";

export type { App } from "@/elysia/app";
export { app };

export const GET = app.fetch;
export const POST = app.fetch;
