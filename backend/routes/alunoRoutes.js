const router = require('express').Router();
const ctrl = require('../controllers/alunoController');

router.get('/', ctrl.listar);
router.get('/:id', ctrl.buscar);
router.post('/', ctrl.criar);
router.put('/:id', ctrl.atualizar);
router.delete('/:id', ctrl.apagar);

module.exports = router;
