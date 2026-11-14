CREATE DATABASE IF NOT EXISTS db_pengelolaan_sampah
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE db_pengelolaan_sampah;

CREATE TABLE IF NOT EXISTS tps (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nama_tps VARCHAR(120) NOT NULL,
  alamat VARCHAR(255) NOT NULL,
  distrik VARCHAR(100) NOT NULL,
  jenis ENUM('TPS Sementara','TPS 3R','TPST') NOT NULL DEFAULT 'TPS Sementara',
  kapasitas_kg INT UNSIGNED NOT NULL DEFAULT 0,
  status ENUM('Aktif','Perlu Perbaikan','Tidak Aktif') NOT NULL DEFAULT 'Aktif',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_tps_distrik (distrik),
  INDEX idx_tps_status (status)
) ENGINE=InnoDB;

-- DATA DUMMY DEMO. Bukan data resmi/hasil observasi Kabupaten Deiyai.
INSERT INTO tps (nama_tps, alamat, distrik, jenis, kapasitas_kg, status) VALUES
('TPS Waghete (Dummy)', 'Contoh lokasi pusat pelayanan Waghete', 'Tigi', 'TPS Sementara', 800, 'Aktif'),
('TPS Ikebo (Dummy)', 'Contoh lokasi permukiman Ikebo', 'Tigi Barat', 'TPS 3R', 500, 'Aktif'),
('TPS Diyai (Dummy)', 'Contoh lokasi fasilitas umum Diyai', 'Tigi Timur', 'TPS Sementara', 650, 'Perlu Perbaikan');
