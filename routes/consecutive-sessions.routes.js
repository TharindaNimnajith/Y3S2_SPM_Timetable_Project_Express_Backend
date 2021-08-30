const express = require('express')
const router = express.Router()

const ConsecutiveSessionController = require('../controllers/consecutive-sessions-controller')

router.post('/addConsecutiveSession/:id', ConsecutiveSessionController.addConsecutiveSession)

module.exports = router
