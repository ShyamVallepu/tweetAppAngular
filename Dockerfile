#stage 1

FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

#Stage 2
FROM nginx:alpine
COPY --from=node /app/dist/tweet-app-angular /usr/share/nginx/html

