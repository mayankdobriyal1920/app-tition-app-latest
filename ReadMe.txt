RUN `npm i` to install node module
RUN `npm start` to start server
RUN `nohup npm start` to build server parmanently

68.178.168.176
/var/www/vhosts/121tuition.in/httpdocs/tuition
root
Pa$$W0rd


68.178.174.134
root
Pa$$W0rd
/var/www/vhosts/121tuition.in/httpdocs/tuition

tuition
MndN26!%ks1q



location /api-call-tutor {
       proxy_pass http://localhost:4001;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_set_header 'Access-Control-Allow-Origin' '*';
       proxy_set_header 'Access-Control-Allow_Credentials' 'true';
       proxy_cache_bypass $http_upgrade;
       proxy_ssl_session_reuse off;
       proxy_set_header X-Real-IP $remote_addr;
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       proxy_set_header X-NginX-Proxy true;
	}

 location /peerApp {
       proxy_pass http://localhost:4002;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_set_header 'Access-Control-Allow-Origin' '*';
       proxy_set_header 'Access-Control-Allow_Credentials' 'true';
       proxy_cache_bypass $http_upgrade;
       proxy_ssl_session_reuse off;
       proxy_set_header X-Real-IP $remote_addr;
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       proxy_set_header X-NginX-Proxy true;
   }

   121Tuition@2022