const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/cursoController');

router.get('/', ctrl.listar);

module.exports = router;
