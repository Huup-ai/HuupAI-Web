const router = require("express").Router()
const { createProvider, createRenter, startRental, stopRental } = require('../controllers/contractController')

router.post('/createProvider', createProvider)
router.post('/createRenter', createRenter)
router.post('/startRental', startRental)
router.post('/stopRental', stopRental)

module.exports = router;