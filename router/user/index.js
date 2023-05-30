const router = require('express').Router()
const {signUp, login, getUsers, getOneUsers, getAdminUsers, makeAdminUsers, removeUser, removeAdmin} = require('../../controller/userController')
const {validteSignupSchema} = require('../../middlewares/validationSchema')
const { authenticateToken, isAgent } = require('../../until/jwtToken')


router.post('/signup', validteSignupSchema, signUp)
router.post("/login", login)
router.get('/getUsers', authenticateToken, getUsers)
router.get('/getUser/:id', authenticateToken, getOneUsers)
router.get('/getAdminUser', isAgent, getAdminUsers)
router.put('/makeAdminUser', isAgent, makeAdminUsers)
router.delete('/removeUser', authenticateToken, removeUser)
router.delete('/removeAdmin', isAgent, removeAdmin)

module.exports = router;