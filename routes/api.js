/**
 * Created by Admin on 4/24/16.
 */
var express = require('express');
var router = express.Router();

router.use('/api', require('../models/todo'));

module.exports = router;