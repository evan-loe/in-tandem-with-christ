FROM node:19.9.0-alpine as build
WORKDIR /app/client
COPY package*.json ./
RUN npm install
COPY . .
