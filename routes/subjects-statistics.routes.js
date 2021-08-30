const express = require('express')
const router = express.Router()

const SubjectsStatisticsController = require('../controllers/subjects-statistics-controller')

router.post('/subjectsStatistics', SubjectsStatisticsController.addSubject)
router.get('/subjectsStatistics/:id', SubjectsStatisticsController.getSubject)
router.get('/subjectsStatistics', SubjectsStatisticsController.getSubjectList)
router.get('/totalSubjectsCount', SubjectsStatisticsController.getTotalSubjectsCount)
router.get('/subjectsCountByOfferedYear', SubjectsStatisticsController.getSubjectsCountByOfferedYear)
router.get('/subjectsCountByOfferedYearAndSemester', SubjectsStatisticsController.getSubjectsCountByOfferedYearAndSemester)

module.exports = router
