const express = require('express')
const router = express.Router()

const StudentsStatisticsController = require('../controllers/students-statistics-controller')

router.post('/studentsStatisticsGroups', StudentsStatisticsController.addGroup)
router.get('/studentsStatisticsGroups/:id', StudentsStatisticsController.getGroup)
router.get('/studentsStatisticsGroups', StudentsStatisticsController.getGroupList)
router.post('/studentsStatisticsSubGroups', StudentsStatisticsController.addSubGroup)
router.get('/studentsStatisticsSubGroups/:id', StudentsStatisticsController.getSubGroup)
router.get('/studentsStatisticsSubGroups', StudentsStatisticsController.getSubGroupList)
router.get('/groupsCountByAcademicYear', StudentsStatisticsController.getGroupsCountByAcademicYear)
router.get('/groupsCountByAcademicYearAndSemester', StudentsStatisticsController.getGroupsCountByAcademicYearAndSemester)
router.get('/groupsCountByAcademicYearSemesterAndProgramme', StudentsStatisticsController.getGroupsCountByAcademicYearSemesterAndProgramme)

module.exports = router
