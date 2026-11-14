# CRUD Data TPS — Leksi Edowai

**Nama:** Leksi Edowai  
**NIM:** 421313251  
**Modul CRUD individu:** Manajemen Data Tempat Pembuangan Sampah (TPS)  
**Stack:** Node.js, Express.js, EJS, MySQL (`mysql2/promise`)

Aplikasi vertical slice CRUD untuk modul Data TPS pada Sistem Informasi Pengelolaan Sampah Kabupaten Deiyai.

## Arsitektur MVC

```text
config/       konfigurasi Connection Pool MySQL
controllers/  handler HTTP, validasi, dan PRG
models/       query SQL berparameter
routes/       endpoint CRUD
views/        halaman EJS dan partials
public/       CSS dan aset statis
sql/          skema dan data dummy
```

## Fitur CRUD

| Fitur | Endpoint | Implementasi |
|---|---|---|
| Create | `GET /tps/tambah`, `POST /tps` | Form, INSERT placeholder `?`, redirect PRG |
| Read | `GET /tps` | SELECT, tabel EJS, empty state, format angka |
| Update | `GET /tps/:id/edit`, `POST /tps/:id/update` | Form pre-filled dari `req.params.id`, UPDATE berparameter |
| Delete | `POST /tps/:id/hapus` | DELETE berdasarkan ID, POST + CSRF |

## Spesifikasi teknis

- MVC dengan direktori `config/`, `controllers/`, `models/`, `routes/`, `views/`, dan `public/`.
- MySQL menggunakan `mysql2/promise` dan Connection Pool.
- Semua operasi SELECT, INSERT, UPDATE, DELETE menggunakan `execute()` dan placeholder `?`.
- Kredensial database berada di `.env`; jangan pernah commit file `.env`.
- `.env.example` disediakan sebagai template.
- Form mutasi menggunakan POST dan pola Post/Redirect/Get (PRG).
- Partial EJS berada di `views/partials/` dan dipanggil dengan `<%- include() %>`.

## Persiapan

1. Jalankan `sql/schema.sql` di MySQL.
2. Salin `.env.example` menjadi `.env`, lalu isi konfigurasi database dan `CSRF_SECRET` acak minimal 32 karakter.
3. Jalankan `npm install`.
4. Jalankan `npm run check`.
5. Jalankan `npm start` lalu buka `http://localhost:3000/tps`.

## Catatan data dan bukti

Data seed di `sql/schema.sql` adalah **data dummy untuk demonstrasi**, bukan data resmi atau hasil observasi Kabupaten Deiyai. File screenshot preview adalah ilustrasi antarmuka; pengujian CRUD terhadap MySQL tetap perlu dilakukan di komputer yang memiliki server MySQL aktif.
