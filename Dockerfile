FROM node:20.9.0-alpine

RUN mkdir -p /nodeServer/base

WORKDIR /nodeServer/base

COPY . /nodeServer/base

RUN npm i --registry=https://registry.npm.taobao.org

ENTRYPOINT ["npm", "run", "start"]