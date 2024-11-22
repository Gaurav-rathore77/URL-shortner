const express = require('express');
const { handleBond, toLogin } = require('../controller/men');
const router = express.Router()

router.post('/',handleBond)
router.post('/login' , toLogin)

module.exports = router;