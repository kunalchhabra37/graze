const express = require('express')
const router = express.Router()
const controller = require('../utils.js')

router.post('/create', controller.createProject)// done
router.get('/fetch/all', controller.listAllProjects)//done
router.get('/fetch/:projectId',controller.fetchProject)//done
router.get('/fetch/stats/:projectId',controller.fetchStats)//done

module.exports = router