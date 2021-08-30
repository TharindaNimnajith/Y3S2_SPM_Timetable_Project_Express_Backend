const express = require('express')
const router = express.Router()

const ParallelSessionController = require('../controllers/parallel-sessions-controller')

router.post('/addParallelSession/:id', ParallelSessionController.addParallelSession)
router.get('/getCategories', ParallelSessionController.getCategories)
router.post('/getCategoryCount', ParallelSessionController.getCategoryCount)
router.post('/getSubjectCat', ParallelSessionController.getSubjectCat)

module.exports = router
