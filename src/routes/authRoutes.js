const express = require('express');
const { registerUser, loginUser, refreshToken } = require('../controllers/authcontroller');
const router = express.Router();
// const { registerUser, loginUser, refreshToken } = require('../controllers/authController');

// Register route
router.post('/register', registerUser);

// Login route to generate tokens
router.post('/login', loginUser);

// Refresh token route
router.post('/refresh-token', refreshToken);

module.exports = router;
