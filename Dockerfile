FROM node:17.0.1 AS builder

ARG SERVICE_NAME

WORKDIR /app

ADD *.json ./
ADD ./prisma ./prisma
ADD ./packages/$SERVICE_NAME ./packages/$SERVICE_NAME

RUN npm ci

RUN npx prisma generate && npm run build:project

FROM node:17.0.1
ARG SERVICE_NAME

ENV SERVICE_NAME=${SERVICE_NAME}

COPY --from=builder /app/ ./

CMD npm run docker:start -w ${SERVICE_NAME}
