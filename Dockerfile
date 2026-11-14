#build react app first
FROM node:20 AS build
ARG VITE_BACKEND_URL=https://scaling-space-happiness-x5p7476wr46j3v75r-3001.app.github.dev/api/v1
WORKDIR /build/api/v1
WORKDIR /build
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

#create node server to run it
EXPOSE 3000
CMD ["npm", "start"]

