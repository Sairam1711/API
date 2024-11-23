const express = require('express');
const { registerUser, loginUser, logoutUser, getprofile } = require('../controllers/user-controller');
const auth = require('../middleware/auth');
const { checkSession } = require('../middleware/sessionMiddleware');

const router = express.Router();

// Public Routes
router.post('/register', registerUser);
router.post('/login',checkSession, loginUser);
router.post('/logout', logoutUser);
// Example of a Protected Route
router.get('/profile',getprofile);

module.exports = router;
