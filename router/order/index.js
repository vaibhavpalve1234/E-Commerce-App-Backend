const router = require('express').Router()
const { } = require('../../middlewares/validationSchema')
const { authenticateToken, isAgent } = require('../../utils/jwtToken')

module.exports = router