## 1 st clone
FROM ubuntu as infra

WORKDIR /home

RUN apt-get -y update

RUN apt-get -y install git

RUN git clone https://github.com/darchlabs/infra.git

## 2nd build
FROM golang as builder

WORKDIR /urs/src/app

COPY --from=infra home/infra/. /usr/src/app/.

RUN go build -o onboarding-api cmd/onboarding/main.go


##3rd build app
FROM node:16

WORKDIR home/app

COPY --from=build usr/src/app/onboarding-api  /home/app/onboarding-api

COPY ./package.json ./

RUN npm install

COPY . .

RUN npm run build

ENV NODE_ENV=production

RUN ./onboarding

RUN ["npx", "serve", "build"]


