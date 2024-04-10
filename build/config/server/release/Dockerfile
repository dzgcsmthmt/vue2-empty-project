FROM nginx:stable-alpine
COPY default.conf /etc/nginx/conf.d/default.conf
COPY dist /usr/share/nginx/html/build/h5
RUN chmod -R 777 /usr/share/nginx/html/build/h5
EXPOSE 8026
CMD ["nginx", "-g", "daemon off;"]
