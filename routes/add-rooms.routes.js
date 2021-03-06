const express = require('express')
const router = express.Router()

const AddRoomsController = require('../controllers/add-rooms-controller')

router.get('/rooms', AddRoomsController.getRoomList)
router.get('/buildings', AddRoomsController.getBuildingList)
router.get('/tags', AddRoomsController.getTagList)
router.get('/subjects', AddRoomsController.getSubjectList)
router.get('/lecturers', AddRoomsController.getLecturerList)
router.get('/groups', AddRoomsController.getGroupList)
router.get('/subGroups', AddRoomsController.getSubGroupList)
router.get('/subjectTags', AddRoomsController.getSubjectTagList)
router.post('/addRoomsToTag', AddRoomsController.addRoomsToTags)
router.post('/addRoomsToSubjectAndTag', AddRoomsController.addRoomsToSubjectAndTag)
router.post('/addRoomsToLecturer', AddRoomsController.addRoomsToLecturer)
router.post('/addRoomsToGroup', AddRoomsController.addRoomsToGroup)
router.post('/addRoomsToSubGroup', AddRoomsController.addRoomsToSubGroup)
router.post('/getPossibleRoomsByTag', AddRoomsController.getPossibleRoomsByTag)
router.post('/getPossibleRoomsBySubjectAndTag', AddRoomsController.getPossibleRoomsBySubjectAndTag)
router.post('/getPossibleRoomsByLecturer', AddRoomsController.getPossibleRoomsByLecturer)
router.post('/getPossibleRoomsByGroup', AddRoomsController.getPossibleRoomsByGroup)
router.post('/getPossibleRoomsBySubGroup', AddRoomsController.getPossibleRoomsBySubGroup)

module.exports = router
