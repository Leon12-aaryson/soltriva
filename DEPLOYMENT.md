# Soltriva Deployment Guide

This document explains how to deploy the Soltriva Laravel project to a VPS, including installation and configuration of all dependencies.

---

## 1. Server Requirements

- **Ubuntu 22.04 LTS** (recommended)
- **PHP**: 8.1 or higher (with extensions: mbstring, xml, curl, zip, mysql, etc.)
- **Composer**
- **Node.js** and **npm**
- **MySQL** or compatible database
- **Nginx** or **Apache**
- **Supervisor** (for queue and MQTT worker)

---

## 2. Install System Dependencies

**Update your system:**
```bash
sudo apt update && sudo apt upgrade -y
```

**Install PHP and extensions:**
```bash
sudo apt install -y php php-cli php-fpm php-mbstring php-xml php-curl php-zip php-mysql unzip git curl
```

**Install Composer:**
```bash
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
```

**Install Node.js and npm:**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

**Install MySQL Server (if needed):**
```bash
sudo apt install -y mysql-server
```
- Secure MySQL: `sudo mysql_secure_installation`
- Create a database and user for your app.

**Install Nginx:**
```bash
sudo apt install -y nginx
```

**Install Supervisor:**
```bash
sudo apt install -y supervisor
```

---

## 3. Clone the Repository

```bash
sudo mkdir -p /var/www/html
sudo chown $USER:$USER /var/www/html
git clone https://github.com/yourusername/soltriva.git /var/www/html/soltriva
cd /var/www/html/soltriva
```

---

## 4. Configure Environment

```bash
cp .env.example .env
nano .env
```
- Set `APP_URL` to `https://soltriva.com`
- Set database credentials (`DB_HOST`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`)
- Set other environment variables as needed

---

## 5. Install PHP and JS Dependencies

```bash
composer install --no-dev --optimize-autoloader
npm install
npm run build
```

---

## 6. Generate Application Key

```bash
php artisan key:generate
```

---

## 7. Database Migration

```bash
php artisan migrate --force
php artisan db:seed --force
```

---

## 8. Set Permissions

```bash
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache
```

---

## 9. Configure Web Server

### Nginx

- Create `/etc/nginx/sites-available/soltriva` and add:
  ```
  server {
      server_name soltriva.com;
      root /var/www/html/soltriva/public;

      index index.php index.html;
      location / {
          try_files $uri $uri/ /index.php?$query_string;
      }
      location ~ \.php$ {
          fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
          fastcgi_index index.php;
          include fastcgi_params;
          fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
      }
  }
  ```
- Enable the site and restart Nginx:
  ```bash
  sudo ln -s /etc/nginx/sites-available/soltriva /etc/nginx/sites-enabled/
  sudo nginx -t
  sudo systemctl reload nginx
  ```

### Apache

- Create `/etc/apache2/sites-available/soltriva.conf` and set:
  ```
  <VirtualHost *:80>
      ServerName soltriva.com
      DocumentRoot /var/www/html/soltriva/public

      <Directory /var/www/html/soltriva/public>
          AllowOverride All
          Require all granted
      </Directory>
  </VirtualHost>
  ```
- Enable the site and restart Apache:
  ```bash
  sudo a2ensite soltriva.conf
  sudo systemctl restart apache2
  ```

---

## 10. Supervisor for Queue and MQTT

- Create `/etc/supervisor/conf.d/soltriva.conf` and add:
  ```
  [program:laravel-queue]
  command=php /var/www/html/soltriva/artisan queue:work --sleep=3 --tries=3
  autostart=true
  autorestart=true
  user=www-data
  redirect_stderr=true
  stdout_logfile=/var/log/laravel-queue.log

  [program:mqtt-subscriber]
  command=php /var/www/html/soltriva/artisan app:mqtt-subscriber
  autostart=true
  autorestart=true
  user=www-data
  redirect_stderr=true
  stdout_logfile=/var/log/mqtt-subscriber.log
  ```
- Reload Supervisor:
  ```bash
  sudo supervisorctl reread
  sudo supervisorctl update
  sudo supervisorctl start all
  ```

---

## 11. SSL Certificate Installation (Let's Encrypt)

To secure your website with a **free SSL certificate** using Let's Encrypt and Certbot, follow these steps:

### 1. Install Certbot and the Nginx Plugin

```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx
```

### 2. Obtain and Install the SSL Certificate

Replace `soltriva.com` with your actual domain if needed:

```bash
sudo certbot --nginx -d soltriva.com
```

- Follow the prompts to complete the certificate installation.
- Certbot will automatically update your Nginx configuration for SSL.

### 3. Verify SSL

Visit [https://soltriva.com](https://soltriva.com) in your browser.  
You should see a padlock icon indicating SSL is active.

### 4. Test Auto-Renewal

Let's Encrypt certificates are valid for 90 days. Certbot sets up auto-renewal, but you can test it with:

```bash
sudo certbot renew --dry-run
```

---

**Your website is now secured with a free SSL certificate from Let's Encrypt.**

---

## 12. Final Checks

- Visit `https://soltriva.com` to verify the app is running.
- Check logs in `storage/logs/` for errors.
- Ensure MQTT and queue workers are running.

---

**For more details, see the official Laravel deployment docs:**  
https://laravel.com/docs/deployment
