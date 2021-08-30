const express = require('express')
const router = express.Router()

const sessionsController = require('../controllers/sessions-controller')

router.post('/addSessions', sessionsController.addSessions)
router.get('/getSessions/:id', sessionsController.getSession)
router.get('/getSessionList', sessionsController.getSessionLists)
router.post('/addNotAvailable/:id',sessionsController.addNotAvailable)
router.post('/getSessionsCode',sessionsController.getSessionsCode)
router.post('/getSessionsLec',sessionsController.getSessionsLec)
router.post('/getSessionsTut',sessionsController.getSessionsTut)
router.post('/getSessionsTuto',sessionsController.getSessionsTuto)

module.exports = router
