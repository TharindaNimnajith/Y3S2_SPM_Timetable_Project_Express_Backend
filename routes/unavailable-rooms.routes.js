const express = require('express')
const router = express.Router()

const RoomUnavailabilityController = require('../controllers/unavailable-rooms-controller')

router.post('/unavailableRooms/:id', RoomUnavailabilityController.addUnavailableTimes)
router.delete('/unavailableRooms/:id', RoomUnavailabilityController.removeUnavailableTimes)

module.exports = router
