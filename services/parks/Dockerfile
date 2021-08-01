# Base Image
FROM node:14 as base

WORKDIR /parks/app

COPY package.json ./

RUN yarn install

COPY . .


FROM base as production

RUN yarn run build
