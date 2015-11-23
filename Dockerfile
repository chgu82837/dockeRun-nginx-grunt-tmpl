# dockerRun: -v $(pwd):/workspace -v $(pwd)/dist:/root/workspace/dist -v $(pwd)/src:/root/workspace/src -p 80:80 -it
FROM nginx

RUN \
sed -i -E "s/sendfile.*$/sendfile off;/g" /etc/nginx/nginx.conf;

RUN \
apt-get update && apt-get install -y less git curl; \
curl -sL https://deb.nodesource.com/setup_4.x | bash -; \
apt-get install -y nodejs ruby;

RUN \
mkdir -p /root/workspace; \
mv /usr/share/nginx/html /usr/share/nginx/html_ori; \
ln -s /workspace/dist /usr/share/nginx/html; \
ln -s /workspace/Gruntfile.js /root/workspace/Gruntfile.js; \
mkdir -p /root/workspace/src; \
mkdir -p /root/workspace/dist;

ADD package.json /root/workspace/

RUN cd /root/workspace && npm install; npm install -g grunt-cli; gem install sass;

WORKDIR /root/workspace

# CMD ccommands
# =====================
# nginx -t > /root/server.log 2>&1;
# nginx >> /root/server.log 2>&1;
# echo "=== Nginx started ===" >> /root/server.log;
# /root/workspace/node_modules/.bin/grunt & >> /root/server.log 2>&1;
# echo "=== grunt started ===" >> /root/server.log;
# less +F /root/server.log;
# nginx -s quit;

CMD bash -c "nginx -t > /root/server.log 2>&1; nginx >> /root/server.log 2>&1; echo \"=== Nginx started ===\" >> /root/server.log; grunt & >> /root/server.log 2>&1; echo \"=== grunt started ===\" >> /root/server.log; less +F /root/server.log; nginx -s quit;"
