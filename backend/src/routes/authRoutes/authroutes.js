const express = require('express');
const { loginUser } = require('../../controller/logincontroller/AuthController');

const router = express.Router();

// Ruta para el inicio de sesión
router.post('/login', loginUser);

module.exports = router;