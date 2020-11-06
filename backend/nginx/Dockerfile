FROM nginx:stable 

# COPY ./nginx/nginx.conf /etc/nginx/nginx.conf 
COPY ./conf.d/bexperts.conf /etc/nginx/conf.d/bexperts.conf 

CMD ["nginx", "-g", "daemon off;"]
