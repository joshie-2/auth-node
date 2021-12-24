const router = require('express').Router()
const userControllers = require('../controllers/userController')

router.post('/register', userControllers.create)

router.post('/login', userControllers.findOne)

module.exports = router
