const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

router.get('/indicadores', dashboardController.getIndicadoresClave);
router.get('/cronograma-auditorias', dashboardController.getCronogramaAuditorias);
router.get('/alertas', dashboardController.getAlertas);

module.exports = router;
