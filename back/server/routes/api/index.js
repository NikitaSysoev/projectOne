const express = require('express');

const router = express.Router();

// router.use('/accounts', require('./accounts'));
router.use('/users', require('./users'));

module.exports = router;
