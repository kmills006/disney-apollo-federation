# Base Image
FROM node:14 as base

WORKDIR /gql-gateway/app

COPY package.json ./

COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

RUN yarn install

COPY . .


FROM base as production

RUN yarn run build
