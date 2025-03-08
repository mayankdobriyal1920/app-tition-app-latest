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

68.178.169.224
root
Pa$$W0rd
/var/www/vhosts/121tuition.in/httpdocs/tuition

name = MariaDB
baseurl = http://yum.mariadb.org/10.5/centos7-amd64
gpgkey = https://yum.mariadb.org/RPM-GPG-KEY-MariaDB
gpgcheck = 1


tuition
MndN26!%ks1q

server {
    listen 80;
    server_name 121tuition.in www.121tuition.in;

    # Redirect all HTTP traffic to HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name 121tuition.in www.121tuition.in;

    # SSL Certificates (Make sure you have Let's Encrypt or other SSL certs configured)
    ssl_certificate /etc/letsencrypt/live/121tuition.in/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/121tuition.in/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot


    # Serve React frontend
    root /var/www/html/tuition/frontend/build;
    index index.html;

    location / {
        try_files $uri /index.html;
    }

    # Proxy for API /api-call-unikpay -> localhost:4000
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
        proxy_set_header X-Forwarded-Proto https;
    }
}

sudo certbot install --cert-name 121tuition.in


sudo dnf install -y certbot python3-certbot-nginx
sudo certbot --nginx -d 121tuition.in -d www.121tuition.in

sudo systemctl enable certbot-renew.timer

