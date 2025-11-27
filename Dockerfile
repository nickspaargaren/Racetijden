FROM node:24-alpine AS base
WORKDIR /app
COPY ./ /app

FROM base AS frontend
RUN yarn install
CMD ["yarn", "dev"]

FROM base AS studio
RUN yarn install
CMD ["npx", "prisma", "studio"]
