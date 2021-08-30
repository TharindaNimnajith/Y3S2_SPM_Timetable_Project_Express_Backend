const express = require('express')
const router = express.Router()

const LecturersStatisticsController = require('../controllers/lecturers-statistics-controller')

router.post('/lecturersStatistics', LecturersStatisticsController.addLecturer)
router.get('/lecturersStatistics/:id', LecturersStatisticsController.getLecturer)
router.get('/lecturersStatistics', LecturersStatisticsController.getLecturerList)
router.get('/lecturerCountByFaculty', LecturersStatisticsController.getLecturerCountByFaculty)
router.get('/lecturerCountByLevel', LecturersStatisticsController.getLecturerCountByLevel)
router.get('/lecturerCountByCenter', LecturersStatisticsController.getLecturerCountByCenter)

module.exports = router
