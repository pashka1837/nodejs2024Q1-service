FROM node:20.11-alpine AS builder

WORKDIR /app

ADD package*.json ./
ADD prisma ./prisma/

RUN npm ci

ADD . . 

CMD [ "npm", "run", "start:docker" ]
