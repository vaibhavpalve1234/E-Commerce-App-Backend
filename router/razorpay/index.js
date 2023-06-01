const router = require('express').Router()
const { order} = require('../../controller/paymentController/razorpayController')
const { authenticateToken } = require('../../utils/jwtToken')

router.post("/razorpay", order)

module.exports = router