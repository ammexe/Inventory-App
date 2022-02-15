FROM node:11.10.0-slim as base
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install 
COPY . .
RUN npm run build:production

FROM nginx:stable-alpine as production
COPY --from=base /usr/src/app/build /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
