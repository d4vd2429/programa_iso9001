const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Registro de usuario
router.post('/register', authController.register);
// Login de usuario
router.post('/login', authController.login);

module.exports = router;
