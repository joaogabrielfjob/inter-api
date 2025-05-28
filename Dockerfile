FROM node:22.16.0-alpine AS build

WORKDIR /build

COPY . /build

RUN rm -rf dist node_modules
RUN npm i
RUN npx prisma generate
RUN npm run build

FROM node:22.16.0-alpine

WORKDIR /src

COPY --from=build /build/dist /src
COPY --from=build /build/node_modules /src/node_modules
COPY --from=build /build/prisma /src/prisma

EXPOSE 5002