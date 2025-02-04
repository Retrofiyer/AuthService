const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { loginController } = require('../controllers/authController');

const router = express.Router();

router.post('/login', authMiddleware, loginController);

module.exports = router;