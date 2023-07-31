const express = require('express')
const router = express.Router()
const controller = require('../utils.js')

router.post('/create', controller.createProject)
router.get('/fetch/all', controller.listAllProjects)
router.get('/fetch/:projectId',controller.fetchProject)
router.get('/fetch/stats/:projectId',controller.fetchStats)

module.exports = router