const express = require('express');
const { authMiddleware } = require('../Middlewares/authMiddleware');
const { loginController } = require('../Controllers/authController');

const router = express.Router();

router.post('/login', authMiddleware, loginController);

module.exports = router;