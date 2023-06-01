const router = require('express').Router()
const { payment, generate_checksum , verify_checksum} = require('../../controller/paymentController')
const { authenticateToken } = require('../../utils/jwtToken')

router.get("/payment", payment)
router.post("/generate_checksum", generate_checksum)
router.post("/verify_checksum", verify_checksum)

module.exports = router