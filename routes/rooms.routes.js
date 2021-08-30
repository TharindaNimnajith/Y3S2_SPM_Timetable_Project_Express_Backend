const express = require('express')
const router = express.Router()

const RoomController = require('../controllers/rooms-controller')

router.post('/rooms', RoomController.addRoom)
router.put('/rooms/:id', RoomController.updateRoom)
router.delete('/rooms/:id', RoomController.deleteRoom)
router.get('/rooms/:id', RoomController.getRoom)
router.get('/rooms', RoomController.getRoomList)
router.post('/roomsByBuilding', RoomController.getRoomListByBuilding)
router.post('/roomByRoomName', RoomController.getRoomByRoomName)
router.post('/roomsByRoomName', RoomController.getRoomListByRoomName)
router.post('/roomsByRoomType', RoomController.getRoomListByRoomType)
router.post('/searchRooms', RoomController.searchRooms)

module.exports = router
