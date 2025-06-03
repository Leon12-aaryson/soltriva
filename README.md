# Soltriva

Soltriva is a Laravel-based web application designed for IoT device management and real-time data processing. It leverages MQTT for device communication, supports robust session and queue management, and is configured for deployment in a production environment.

## Features

- **IoT Device Integration:** Communicates with devices via MQTT broker.
- **Real-Time Data Processing:** Handles real-time data streams and device events.
- **User Authentication:** Secure login and session management.
- **Database Support:** Uses MySQL for persistent storage.
- **Queue & Cache:** Utilizes database-backed queues and cache for scalability.
- **Logging:** Configurable logging for debugging and monitoring.
- **Mail Support:** Configured for local mail logging.

## Environment Configuration

The application uses a `.env` file for environment-specific settings. Key variables include:

- `APP_NAME`, `APP_ENV`, `APP_KEY`, `APP_DEBUG`
- Database: `DB_CONNECTION`, `DB_HOST`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`
- MQTT: `MQTT_BROKER_HOST`, `MQTT_BROKER_PORT`, `MQTT_BROKER_TOPIC`
- Session, Cache, Queue, and Mail settings

**Example:**
```env
APP_NAME=Soltriva
APP_ENV=production
DB_CONNECTION=mysql
MQTT_BROKER_HOST=185.209.223.12
```

## Getting Started

### Prerequisites

- PHP >= 8.1
- Composer
- MySQL
- Node.js & npm (for frontend assets)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/soltriva.git
   cd soltriva
   ```

2. **Install dependencies:**
   ```sh
   composer install
   npm install
   ```

3. **Copy and configure `.env`:**
   ```sh
   cp .env.example .env
   # Edit .env with your settings
   ```

4. **Generate application key:**
   ```sh
   php artisan key:generate
   ```

5. **Run migrations:**
   ```sh
   php artisan migrate
   ```

6. **Build frontend assets:**
   ```sh
   npm run build
   ```

7. **Start the server:**
   ```sh
   php artisan serve
   ```

## Usage

- Access the application at [https://localhost:8000](https://localhost:8000).
- Devices should connect to the MQTT broker as configured in `.env`.
- Use Laravel's built-in authentication and management features.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT). 

