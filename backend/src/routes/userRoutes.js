const express = require('express');
const { registerUser, loginUser, logoutUser, getUserProfile } = require('../controllers/userControllers');
const userMiddleware = require('../middlewares/userMiddleware');

const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/logout',logoutUser);
router.get('/profile',userMiddleware,getUserProfile);

module.exports = router;