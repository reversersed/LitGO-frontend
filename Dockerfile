# build stage
FROM node:20.16.0 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm config set strict-ssl false
RUN npm install --force --loglevel verbose
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
USER root
COPY --from=build-stage /app/dist/browser /usr/share/nginx/html/client
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]