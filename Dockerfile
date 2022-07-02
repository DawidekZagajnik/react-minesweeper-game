FROM node:17-alpine as build


# COPYING SOURCE, PUBLIC AND REQUIREMENTS, WORKDIR IMPLICITLY SET TO .
COPY src ./src
COPY public ./public
COPY package.json ./

# INSTALL PACKAGES, BUILD COMPILED VERSION
RUN yarn install
RUN yarn build

# USE NGINX TO SERVE CONTENT
FROM nginx:stable-alpine as prod

# COPY BUILT COMPILED VERSION TO NGINX 
COPY --from=build /build /usr/share/nginx/html

EXPOSE 80

# RUN VIA NGINX
CMD ["nginx", "-g", "daemon off;"]
