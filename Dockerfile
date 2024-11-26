FROM nginx:alpine

COPY ./dist/cinema-res-sys /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf



EXPOSE 8084:84

CMD ["nginx", "-g", "daemon off;"]
