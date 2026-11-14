const db = require('../config/database');

// Semua query memakai placeholder (?) dan parameter terpisah.
const Tps = {
  async findAll() {
    const [rows] = await db.execute(
      'SELECT id, nama_tps, alamat, distrik, jenis, kapasitas_kg, status, created_at FROM tps ORDER BY id DESC'
    );
    return rows;
  },
  async findById(id) {
    const [rows] = await db.execute(
      'SELECT id, nama_tps, alamat, distrik, jenis, kapasitas_kg, status FROM tps WHERE id = ?', [id]
    );
    return rows[0] || null;
  },
  async create(data) {
    const [result] = await db.execute(
      'INSERT INTO tps (nama_tps, alamat, distrik, jenis, kapasitas_kg, status) VALUES (?, ?, ?, ?, ?, ?)',
      [data.nama_tps, data.alamat, data.distrik, data.jenis, data.kapasitas_kg, data.status]
    );
    return result.insertId;
  },
  async update(id, data) {
    const [result] = await db.execute(
      'UPDATE tps SET nama_tps = ?, alamat = ?, distrik = ?, jenis = ?, kapasitas_kg = ?, status = ? WHERE id = ?',
      [data.nama_tps, data.alamat, data.distrik, data.jenis, data.kapasitas_kg, data.status, id]
    );
    return result.affectedRows;
  },
  async delete(id) {
    const [result] = await db.execute('DELETE FROM tps WHERE id = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = Tps;
