# Soltriva Deployment Guide

This document explains how to deploy the Soltriva Laravel project to a VPS.

---

## 1. Server Requirements

- **PHP**: 8.1 or higher (with required extensions: mbstring, xml, curl, zip, mysql, etc.)
- **Composer**
- **Node.js** and **npm**
- **MySQL** or compatible database
- **Web server**: Nginx or Apache
- **Supervisor** (for queue and MQTT worker)

---

## 2. Preparation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/soltriva.git
   cd soltriva
   ```

2. **Copy and configure environment:**
   ```bash
   cp .env.example .env
   nano .env
   ```
   - Set `APP_URL` to your VPS domain or IP.
   - Set database credentials (`DB_HOST`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`).
   - Set other environment variables as needed.

---

## 3. Install Dependencies

```bash
composer install --no-dev --optimize-autoloader
npm install
npm run build
```

---

## 4. Generate Application Key

```bash
php artisan key:generate
```

---

## 5. Database Migration

```bash
php artisan migrate --force
php artisan db:seed --force
```

---

## 6. Set Permissions

```bash
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache
```

---

## 7. Configure Web Server

- **Nginx**: Point the root to `public/` and configure PHP.
- **Apache**: Set DocumentRoot to `public/`.

Example Nginx block:
```
server {
    server_name yourdomain.com;
    root /path/to/soltriva/public;

    index index.php index.html;
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }
    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }
}
```

---

## 8. Supervisor for Queue and MQTT

Create a Supervisor config (e.g., `/etc/supervisor/conf.d/soltriva.conf`):

```
[program:laravel-queue]
command=php /path/to/soltriva/artisan queue:work --sleep=3 --tries=3
autostart=true
autorestart=true
user=www-data
redirect_stderr=true
stdout_logfile=/var/log/laravel-queue.log

[program:mqtt-subscriber]
command=php /path/to/soltriva/artisan app:mqtt-subscriber
autostart=true
autorestart=true
user=www-data
redirect_stderr=true
stdout_logfile=/var/log/mqtt-subscriber.log
```

Reload Supervisor:
```bash
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start all
```

---

## 9. SSL (Optional)

Use [Let's Encrypt](https://certbot.eff.org/) for free SSL certificates.

---

## 10. Final Checks

- Visit your domain to verify the app is running.
- Check logs in `storage/logs/` for errors.
- Ensure MQTT and queue workers are running.

---

**For more details, see the official Laravel deployment docs:**  
https://laravel.com/docs/deployment
