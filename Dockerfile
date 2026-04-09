FROM node:24-alpine AS base

WORKDIR /app
COPY ./ /app

RUN corepack enable && corepack prepare --activate

FROM base AS frontend
RUN yarn install --immutable
CMD ["yarn", "dev"]

FROM base AS studio
RUN yarn install --immutable
CMD ["npx", "prisma", "studio"]
