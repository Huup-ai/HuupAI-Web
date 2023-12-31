const router = require("express").Router()
const { createProvider, createRenter, startRental, stopRental, getRemainingCredit, getCryptoPayment } = require('../controllers/contractController')

router.post('/createProvider', createProvider)
router.post('/createRenter', createRenter)
router.post('/startRental', startRental)
router.post('/stopRental', stopRental)
router.post('/getRemainingCredit', getRemainingCredit)
router.post('/getCryptoPayment', getCryptoPayment)

module.exports = router;