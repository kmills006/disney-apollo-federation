# Base Image
FROM node:14 as base

WORKDIR /attractions/app

COPY package.json ./

RUN yarn install

COPY . .


FROM base as production

RUN yarn run build
