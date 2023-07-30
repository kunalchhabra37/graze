const express = require('express')
const router = express.Router()
const controller = require('../utils.js')
router.get('/fetch', controller.dashboard)

module.exports = router;