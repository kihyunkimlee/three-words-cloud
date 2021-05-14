FROM node:alpine as builder

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY ./ ./

RUN npm run build

FROM nginx

EXPOSE 3000

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /usr/src/app/index.html /usr/share/nginx/html/index.html

COPY --from=builder /usr/src/app/dist/style.css /usr/share/nginx/html/style.css

COPY --from=builder /usr/src/app/images /usr/share/nginx/html/images

COPY --from=builder /usr/src/app/dist/main.js /usr/share/nginx/html/main.js