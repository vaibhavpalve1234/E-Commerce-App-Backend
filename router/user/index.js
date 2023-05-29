const router = require('express').Router()
const {signUp, login} = require('../../controller/userController')
const {validteSignupSchema} = require('../../middlewares/validationSchema')


router.post('/signup', validteSignupSchema, signUp)
router.post("/login", login)

module.exports = router;