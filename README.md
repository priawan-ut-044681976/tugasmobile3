# tugasmobile3

Demo Ionic mobile-style view that loads ticker data from the [Coinlore tickers API](https://api.coinlore.net/api/tickers/) and displays rank, name, symbol, and USD price.

## Menjalankan (browser)
1. Pastikan Python tersedia.
2. Jalankan server lokal:
   ```bash
   npm start
   ```
3. Buka `http://localhost:8100` di browser.
4. Tarik ke bawah (pull-to-refresh) untuk memuat ulang data.

## Menjalankan di emulator Android (Capacitor)
1. Instal dependensi dan platform:
   ```bash
   npm install
   npm run cap:add-android
   ```
2. Hubungkan atau nyalakan emulator Android (AVD). Untuk menjalankan dengan live reload dan jaringan lokal:
   ```bash
   npm run cap:run-android
   ```
3. Jika proyek Android sudah ada, sinkronkan ulang perubahan web sebelum menjalankan:
   ```bash
   npm run cap:sync
   ```

## Catatan
- Aplikasi menggunakan komponen web Ionic langsung dari CDN sehingga tidak memerlukan proses build bundler.
- Toast akan muncul ketika item disentuh, menampilkan harga terbaru.
- Konfigurasi Capacitor menggunakan `webDir` `www/` yang dibangun dari berkas statis (HTML, CSS, JS).
