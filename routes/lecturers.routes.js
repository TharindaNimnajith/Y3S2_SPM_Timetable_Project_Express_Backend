const express = require('express')
const router = express.Router()

const LecturersController = require('../controllers/lecturers-controller')

router.post('/lecturers', LecturersController.addLecturers)
router.put('/lecturers', LecturersController.updateLecturer)
router.delete('/lecturers/:id', LecturersController.deleteLecturer)
router.get('/lecturers/:id', LecturersController.getLecturer)
router.get('/lecturers', LecturersController.getLecturersList)
router.post('/addNotAvailable/:id',LecturersController.addNotAvailable)

module.exports = router
