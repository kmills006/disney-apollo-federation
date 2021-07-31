# Base Image
FROM node:14 as base

WORKDIR /attractions/app

COPY package.json ./

RUN yarn install

COPY . .


FROM base as production

ENV NODE_PATH=./dist

RUN yarn run build
