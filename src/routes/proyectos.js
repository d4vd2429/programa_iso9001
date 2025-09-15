const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');

// Endpoints CRUD para proyectos
router.get('/', proyectoController.getProyectos);
router.post('/', proyectoController.createProyecto);
router.put('/:id', proyectoController.updateProyecto);
router.delete('/:id', proyectoController.deleteProyecto);

module.exports = router;
