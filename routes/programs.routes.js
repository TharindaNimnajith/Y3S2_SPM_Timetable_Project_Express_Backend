const express = require('express')
const router = express.Router()

const ProgramsController = require('../controllers/programs-controller')

router.post('/create', ProgramsController.createPrograms)
router.get('/getPrograms', ProgramsController.getPrograms)
router.get('/getPrograms/:id', ProgramsController.getProgram)
router.put('/editPrograms', ProgramsController.editPrograms)
router.delete('/deletePrograms', ProgramsController.deletePrograms)

module.exports = router
