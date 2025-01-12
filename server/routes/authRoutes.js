const { loginUser, registerUser, logoutUser, getUser } = require('../controllers/authControllers');
const express = require('express');
const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/logout', logoutUser);
router.get('/user', getUser);

module.exports = router;