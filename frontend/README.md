# ReparaTech

## frontend

## Dokumentasi

### Instalasi

1. **Siapkan Backend Laravel**  
   Masuk ke folder `backend`, lalu instal dependensi dengan Composer, migrasi database, dan jalankan server Laravel. Pastikan juga environment variable `APP_URL` dan `FRONTEND_URL` sudah diatur ke `http://localhost:8000` dan `http://localhost:3000` di file `.env`.

   ```bash
   cd backend

   # Install dependensi
   composer install

   # Salin file konfigurasi
   cp .env.example .env

   # Generate aplikasi key
   php artisan key:generate

   # Migrasi database
   php artisan migrate

   # Jalankan server Laravel
   php artisan serve
   ```

2. **Siapkan Frontend Next.js**  
   Clone repositori ini, masuk ke folder `frontend`, dan instal dependensinya menggunakan `yarn install` atau `npm install`. Kemudian, salin file `.env.example` menjadi `.env.local` dan atur URL backendnya:

   ```bash
   cd frontend

   # Instal dependensi
   bun install ## bun gaming lessgo lebih cepet :0
   # atau
   npm install

   # Salin file konfigurasi
   cp .env.example .env.local

   # Atur URL backend
   NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
   ```

3. **Run Web**

   ```bash
   bun run dev
   # atau
   npm run dev

   ```
