require('dotenv').config();
const express = require('express');
const path = require('path');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const tpsRoutes = require('./routes/tps');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: false, limit: '20kb' }));
app.use(cookieParser());

// CSRF token bertanda tangan, disimpan pada cookie HttpOnly dan hidden input form.
const csrfSecret = process.env.CSRF_SECRET;
if (!csrfSecret || csrfSecret.length < 32) {
  throw new Error('CSRF_SECRET wajib diisi di .env dengan minimal 32 karakter.');
}
function signToken(nonce) {
  return crypto.createHmac('sha256', csrfSecret).update(nonce).digest('hex');
}
app.use((req, res, next) => {
  let token = req.cookies.sipelsa_csrf;
  if (!token || !/^[a-f0-9]{64}\.[a-f0-9]{64}$/.test(token)) {
    const nonce = crypto.randomBytes(32).toString('hex');
    token = `${nonce}.${signToken(nonce)}`;
    res.cookie('sipelsa_csrf', token, {
      httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production',
      path: '/', maxAge: 2 * 60 * 60 * 1000
    });
  }
  res.locals.csrfToken = token;
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
    const [nonce, signature] = token.split('.');
    const expected = signToken(nonce);
    const validSignature = signature.length === expected.length && crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
    if (!validSignature || req.body._csrf !== token) {
      return res.status(403).send('Permintaan ditolak: token CSRF tidak valid. Muat ulang halaman.');
    }
  }
  next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => { res.locals.currentPath = req.path; next(); });
app.get('/', (req, res) => res.redirect('/tps'));
app.use('/tps', tpsRoutes);
app.use((req, res) => res.status(404).render('error', {
  title: 'Halaman tidak ditemukan', message: 'Halaman yang Anda cari tidak tersedia.'
}));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('error', {
    title: 'Terjadi kesalahan',
    message: 'Permintaan belum dapat diproses. Periksa koneksi database dan konfigurasi aplikasi.'
  });
});

const port = Number(process.env.PORT || 3000);
app.listen(port, () => console.log(`Aplikasi berjalan di http://localhost:${port}`));
