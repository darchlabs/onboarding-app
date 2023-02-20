# 1 st clone
FROM ubuntu as onboarding

WORKDIR /home/onboarding

RUN apt-get -y update

RUN apt-get -y install git

RUN git clone https://github.com/darchlabs/infra.git

## 2nd build
FROM golang as builder

WORKDIR /usr/src/app

COPY --from=onboarding home/onboarding/infra/. /usr/src/app/.

RUN go mod download

RUN go build -o onboarding-api cmd/onboarding/main.go


##3rd build app
FROM node:16

WORKDIR home/app

COPY --from=builder usr/src/app/onboarding-api  /home/app/onboarding-api

COPY ./package.json ./
COPY ./package-lock.json ./
COPY ./init.sh ./

RUN npm ci

COPY . .

RUN npm run build
RUN ["chmod", "+x", "/home/app/init.sh"]

ENV NODE_ENV=production
ENV ONBOARDING_PORT=5800

CMD ./init.sh
