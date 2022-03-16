FROM nginxinc/nginx-unprivileged

COPY ./public /opt/app/

COPY ./nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;", "-c", "/etc/nginx/nginx.conf"]
