const express = require('express')
const router = express.Router()

const CenterController = require('../controllers/centers-controller')

router.post('/centers', CenterController.addCenter)
router.put('/centers/:id', CenterController.updateCenter)
router.delete('/centers/:id', CenterController.deleteCenter)
router.get('/centers/:id', CenterController.getCenter)
router.get('/centers', CenterController.getCenterList)

module.exports = router
