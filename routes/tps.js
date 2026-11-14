const express = require('express');
const controller = require('../controllers/tpsController');
const router = express.Router();

router.get('/', controller.index);
router.get('/tambah', controller.createForm);
router.post('/', controller.create);
router.get('/:id/edit', controller.editForm);
router.post('/:id/update', controller.update);
router.post('/:id/hapus', controller.destroy);

module.exports = router;
