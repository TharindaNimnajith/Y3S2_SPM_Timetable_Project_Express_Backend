const express = require('express')
const router = express.Router()

const SubjectsController = require('../controllers/subjects-controller')

router.post('/subjects', SubjectsController.addSubjects)
router.put('/subjects', SubjectsController.updateSubject)
router.delete('/subjects/:id', SubjectsController.deleteSubjects)
router.get('/subjects/:id', SubjectsController.getSubject)
router.get('/subjects1/:id', SubjectsController.getSubject1)
router.get('/subjects', SubjectsController.getSubjectsList)
router.post('/addCategory/:id',SubjectsController.addCategory)

module.exports = router
