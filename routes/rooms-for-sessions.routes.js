const express = require('express')
const router = express.Router()

const RoomsForSessionsController = require('../controllers/rooms-for-sessions-controller')

router.post('/roomsForSessions', RoomsForSessionsController.addSession)
router.get('/roomsForSessions/:id', RoomsForSessionsController.getSession)
router.get('/roomsForSessions', RoomsForSessionsController.getSessionList)
router.post('/addRoomForSession', RoomsForSessionsController.addRoomForSession)
router.get('/rooms', RoomsForSessionsController.getRoomList)
router.get('/getPossibleRoomsForSession/:id', RoomsForSessionsController.getPossibleRoomsForSession)
router.post('/setPossibleRoomsForSession/:id', RoomsForSessionsController.setPossibleRoomsForSession)
router.get('/setPossibleRoomsForSessions', RoomsForSessionsController.setPossibleRoomsForSessions)

module.exports = router
