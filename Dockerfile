FROM node:lts-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

CMD npm run database migrate:latest && npm run start
