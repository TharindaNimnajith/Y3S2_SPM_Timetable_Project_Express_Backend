const express = require('express')
const router = express.Router()

const SubGroupNumsController = require('../controllers/subGroupNums-controller')

router.post('/create', SubGroupNumsController.createSubGroupNums)
router.get('/getSubGroupNums', SubGroupNumsController.getSubGroupNums)
router.get('/getSubGroupNums/:id', SubGroupNumsController.getSubGroupNum)
router.put('/editSubGroupNums', SubGroupNumsController.editSubGroupNums)
router.delete('/deleteSubGroupNums', SubGroupNumsController.deleteSubGroupNums)

module.exports = router
