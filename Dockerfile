FROM node:22.14.0-alpine3.21 AS build

WORKDIR /build

COPY . /build

RUN rm -rf dist node_modules
RUN npm i
RUN npm run build
RUN npx prisma generate

FROM node:22.14.0-alpine3.21

WORKDIR /src

COPY --from=build /build/dist /src
COPY --from=build /build/node_modules /src/node_modules
COPY --from=build /build/prisma /src/prisma

EXPOSE 5002