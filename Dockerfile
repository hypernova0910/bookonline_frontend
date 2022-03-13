# build stage
FROM node:17 AS build-stage
WORKDIR /app
COPY package* ./
RUN npm install
COPY public ./public
COPY src ./src
RUN npm run build

# production stage
FROM nginx:1.21.5-alpine as production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]