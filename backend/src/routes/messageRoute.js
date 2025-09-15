const express = require('express');
const { createMessage, getMessages } = require('../controllers/messageControllers');
const userMiddleware = require('../middlewares/userMiddleware');

const router = express.Router();

router.post('/send/:id',userMiddleware,createMessage)
router.get('/messages/:id',userMiddleware,getMessages)


module.exports = router;