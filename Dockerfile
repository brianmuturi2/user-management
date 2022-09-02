#stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --configuration=production
#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/user-management /usr/share/nginx/html
