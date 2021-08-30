const express = require('express')
const router = express.Router()

const YearSemsController = require('../controllers/yearSems-controller')

router.post('/create', YearSemsController.createYearSems)
router.get('/getYearSems', YearSemsController.getYearSems)
router.get('/getYearSems/:id', YearSemsController.getYearSem)
router.put('/editYearSems', YearSemsController.editYearSems)
router.delete('/deleteYearSems', YearSemsController.deleteYearSems)

module.exports = router
