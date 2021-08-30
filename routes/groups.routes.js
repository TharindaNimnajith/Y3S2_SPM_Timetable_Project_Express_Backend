const express = require('express')
const router = express.Router()

const GroupsController = require('../controllers/groups-controller')

router.post('/create', GroupsController.createGroups)
router.get('/getGroups', GroupsController.getGroups)
router.get('/getGroups/:id', GroupsController.getGroup)
router.put('/editGroups', GroupsController.editGroups)
router.delete('/deleteGroups', GroupsController.deleteGroups)
router.put('/deleteSubGroupUpdate', GroupsController.deleteSubGroupUpdate)
router.post('/addNotAvailable/:id',GroupsController.addNotAvailable)

module.exports = router
