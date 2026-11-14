const Tps = require('../models/tpsModel');

const JENIS = ['TPS Sementara', 'TPS 3R', 'TPST'];
const STATUS = ['Aktif', 'Perlu Perbaikan', 'Tidak Aktif'];
const emptyItem = () => ({ nama_tps: '', alamat: '', distrik: '', jenis: JENIS[0], kapasitas_kg: 0, status: STATUS[0] });

function parseId(raw) {
  const id = Number(raw);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}

function validate(body) {
  const data = {
    nama_tps: String(body.nama_tps || '').trim(),
    alamat: String(body.alamat || '').trim(),
    distrik: String(body.distrik || '').trim(),
    jenis: String(body.jenis || ''),
    kapasitas_kg: Number(body.kapasitas_kg),
    status: String(body.status || '')
  };
  const errors = [];
  if (!data.nama_tps || data.nama_tps.length > 120) errors.push('Nama TPS wajib diisi (maksimal 120 karakter).');
  if (!data.alamat || data.alamat.length > 255) errors.push('Alamat wajib diisi (maksimal 255 karakter).');
  if (!data.distrik || data.distrik.length > 100) errors.push('Distrik wajib diisi (maksimal 100 karakter).');
  if (!JENIS.includes(data.jenis)) errors.push('Jenis TPS tidak valid.');
  if (!Number.isSafeInteger(data.kapasitas_kg) || data.kapasitas_kg < 0) errors.push('Kapasitas harus berupa angka bulat minimal 0.');
  if (!STATUS.includes(data.status)) errors.push('Status TPS tidak valid.');
  return { data, errors };
}

exports.index = async (req, res, next) => {
  try {
    const rows = await Tps.findAll();
    res.render('tps/index', { title: 'Data TPS', rows, message: req.query.msg || null });
  } catch (error) { next(error); }
};

exports.createForm = (req, res) => res.render('tps/form', {
  title: 'Tambah Data TPS', mode: 'create', action: '/tps', error: null, item: emptyItem()
});

exports.create = async (req, res, next) => {
  const { data, errors } = validate(req.body);
  if (errors.length) return res.status(422).render('tps/form', {
    title: 'Tambah Data TPS', mode: 'create', action: '/tps', error: errors.join(' '), item: data
  });
  try {
    await Tps.create(data);
    return res.redirect('/tps?msg=' + encodeURIComponent('Data TPS berhasil ditambahkan.'));
  } catch (error) { next(error); }
};

exports.editForm = async (req, res, next) => {
  const id = parseId(req.params.id);
  if (!id) return res.status(400).render('error', { title: 'ID tidak valid', message: 'Identifier TPS harus berupa bilangan bulat positif.' });
  try {
    const item = await Tps.findById(id);
    if (!item) return res.status(404).render('error', { title: 'Data tidak ditemukan', message: 'Data TPS yang diminta tidak tersedia.' });
    res.render('tps/form', { title: 'Edit Data TPS', mode: 'edit', action: `/tps/${id}/update`, error: null, item });
  } catch (error) { next(error); }
};

exports.update = async (req, res, next) => {
  const id = parseId(req.params.id);
  if (!id) return res.status(400).render('error', { title: 'ID tidak valid', message: 'Identifier TPS harus berupa bilangan bulat positif.' });
  const { data, errors } = validate(req.body);
  if (errors.length) return res.status(422).render('tps/form', {
    title: 'Edit Data TPS', mode: 'edit', action: `/tps/${id}/update`, error: errors.join(' '), item: { ...data, id }
  });
  try {
    const affected = await Tps.update(id, data);
    if (!affected) return res.status(404).render('error', { title: 'Data tidak ditemukan', message: 'Data TPS tidak ditemukan atau tidak mengalami perubahan.' });
    return res.redirect('/tps?msg=' + encodeURIComponent('Data TPS berhasil diperbarui.'));
  } catch (error) { next(error); }
};

exports.destroy = async (req, res, next) => {
  const id = parseId(req.params.id);
  if (!id) return res.status(400).render('error', { title: 'ID tidak valid', message: 'Identifier TPS harus berupa bilangan bulat positif.' });
  try {
    const affected = await Tps.delete(id);
    if (!affected) return res.status(404).render('error', { title: 'Data tidak ditemukan', message: 'Data TPS yang akan dihapus tidak tersedia.' });
    return res.redirect('/tps?msg=' + encodeURIComponent('Data TPS berhasil dihapus.'));
  } catch (error) { next(error); }
};
