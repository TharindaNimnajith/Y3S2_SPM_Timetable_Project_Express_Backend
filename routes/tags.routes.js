const express = require('express')
const router = express.Router()

const TagsController = require('../controllers/tags-controller')

router.post('/create', TagsController.createTags)
router.get('/getTags', TagsController.getTags)
router.get('/getTags/:id', TagsController.getTag)
router.put('/editTags', TagsController.editTags)
router.delete('/deleteTags', TagsController.deleteTags)

module.exports = router
