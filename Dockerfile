FROM node:alpine3.18

WORKDIR /app

ARG CLOUDINARY_CLOUD_NAME
ARG CLOUDINARY_API_KEY
ARG CLOUDINARY_API_SECRET
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG COOKIE_KEY_1
ARG COOKIE_KEY_2
ARG CLIENT_BASE_URL
ARG API_BASE_URL
ARG POSTGRES_CONNECTION_STRING
ARG POSTGRES_GUEST_CONNECTION_STRING
ARG ENABLE_ALPINE_PRIVATE_NETWORKING

COPY . /app

RUN npm install
RUN npm install --cpu=x64 --os=linux --libc=musl sharp

CMD [ "npm", "run", "start" ]

EXPOSE 3001
