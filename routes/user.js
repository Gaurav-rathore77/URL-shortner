const express = require('express');
const router = express.Router();
const {handleShortIdGenrator ,handleAnalytics}= require('../controller/user'); // Ensure the path is correct

// POST route to generate short ID
router.post('/', handleShortIdGenrator);
router.get('/Analytics/:shortId', handleAnalytics);

module.exports = router;
