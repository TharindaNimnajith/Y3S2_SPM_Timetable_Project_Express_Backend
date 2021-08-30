const express = require('express')
const router = express.Router()

const GroupNumsController = require('../controllers/groupNums-controller')

router.post('/create', GroupNumsController.createGroupNums)
router.get('/getGroupNums', GroupNumsController.getGroupNums)
router.get('/getGroupNums/:id', GroupNumsController.getGroupNum)
router.put('/editGroupNums', GroupNumsController.editGroupNums)
router.delete('/deleteGroupNums', GroupNumsController.deleteGroupNums)

module.exports = router
