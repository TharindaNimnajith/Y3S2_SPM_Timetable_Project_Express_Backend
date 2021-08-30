const express = require('express')
const router = express.Router()

const WorkingDaysHoursController = require('../controllers/working-days-hours-controller')

router.post('/create', WorkingDaysHoursController.createWorkingDaysAndHours)
router.get('/getWorkingDaysAndHours', WorkingDaysHoursController.getWorkingDaysAndHours)
router.put('/editWorkingDaysAndHours', WorkingDaysHoursController.editWorkingDaysAndHours)
router.delete('/deleteWorkingDaysAndHours', WorkingDaysHoursController.deleteWorkingDaysAndHours)

module.exports = router
