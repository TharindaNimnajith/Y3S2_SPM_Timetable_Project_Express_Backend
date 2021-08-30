const express = require('express')
const router = express.Router()

const SubGroupsController = require('../controllers/subGroups-controller')

router.post('/create', SubGroupsController.createSubGroups)
router.get('/getSubGroups', SubGroupsController.getSubGroups)
router.get('/getSubGroups/:id', SubGroupsController.getSubGroup)
router.put('/editSubGroups', SubGroupsController.editSubGroups)
router.delete('/deleteSubGroups', SubGroupsController.deleteSubGroups)
router.delete('/ deleteAllSubGroupsWithGroId', SubGroupsController.deleteAllSubGroupsWithGroId)
router.delete('/deleteSubGroupsWithSubId', SubGroupsController.deleteSubGroupsWithSubId)
router.post('/addNotAvailable/:id',SubGroupsController.addNotAvailable)

module.exports = router
