FROM node:lts-alpine

ENV APP_NAME=frontend-dev

WORKDIR /usr/src/app
RUN npm config set python /usr/bin/python
RUN npm i -g npm
RUN npm install -g serve
COPY . .
EXPOSE $APPLICATION_PORT


CMD [ "serve" ]