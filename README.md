# DevCourse

Platform kursus online (LMS) berbasis web, dibangun dengan **Laravel** di sisi backend dan **React** di sisi frontend. [ISI: 1-2 kalimat tentang tujuan proyek, mis. siapa penggunanya dan masalah apa yang diselesaikan.]

## Fitur

- [ISI: mis. Autentikasi dan manajemen akun (peran siswa / admin)]
- [ISI: mis. Katalog kursus dan halaman detail kursus]
- [ISI: mis. Pembayaran kursus terintegrasi payment gateway (Midtrans)]
- [ISI: mis. Dashboard dengan grafik statistik]
- [ISI: mis. Ekspor data ke Excel]
- [ISI: fitur lain yang ada di aplikasimu]

## Screenshot

<!-- Taruh gambar di folder docs/screenshots lalu ganti nama file di bawah -->
| Beranda | Detail Kursus |
| --- | --- |
| ![Beranda](docs/screenshots/home.png) | ![Detail Kursus](docs/screenshots/course.png) |

## Tech Stack

| Bagian | Teknologi |
| --- | --- |
| Backend | Laravel (PHP), MySQL |
| Frontend | React 19, React Router, Axios, Vite |
| Styling | Tailwind CSS |
| Visualisasi data | Chart.js (react-chartjs-2) |
| Ekspor data | xlsx, file-saver |
| UI/animasi | Framer Motion, AOS, react-slick |
| Pembayaran | Midtrans |
| Testing | PHPUnit |

## Struktur Proyek

```
app/            Logic backend Laravel (controller, model, dll.)
database/       Migration dan seeder
routes/         Definisi route
resources/js/   Komponen React (Charts, Payment, CourseCard, ConfirmModal, Button, api, ...)
public/         Aset publik
tests/          Pengujian
```

## Instalasi

**Prasyarat:** PHP, Composer, Node.js + npm, dan MySQL.

```bash
# 1. Clone repo
git clone https://github.com/intanfai/devcourse.git
cd devcourse

# 2. Install dependensi
composer install
npm install

# 3. Konfigurasi environment
cp .env.example .env
php artisan key:generate
# Edit .env: isi koneksi database dan kunci Midtrans (jika dipakai)

# 4. Migrasi database
php artisan migrate --seed

# 5. Jalankan aplikasi (dua terminal)
php artisan serve
npm run dev
```

Buka `http://localhost:8000`.

## Konfigurasi Environment

Variabel penting di `.env`:

| Variabel | Keterangan |
| --- | --- |
| `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD` | Koneksi database |
| `MIDTRANS_SERVER_KEY`, `MIDTRANS_CLIENT_KEY` | Kunci Midtrans (mode sandbox untuk pengembangan) |

> Jangan commit file `.env` atau kunci API ke repository.

## Menjalankan Test

```bash
php artisan test
```

## Pengembang

**Intan Nurul Faizia**
**Fatimah Fauzi Abdul Ghonu**
GitHub: [@intanfai](https://github.com/intanfai) · Portfolio: [intanfai.github.io/porto-frontend](https://intanfai.github.io/porto-frontend)

## Lisensi

Proyek ini dibuat untuk keperluan pembelajaran dan portofolio. Dibangun di atas [Laravel](https://laravel.com) yang berlisensi [MIT](https://opensource.org/licenses/MIT).