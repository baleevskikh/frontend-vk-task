const Router = require('express')
const router = new Router()
const authController = require('../controllers/authController')
const {body} = require("express-validator")

router.post('/registration',
    body('username').isLength({min: 3, max: 32}),
    body('name').isLength({min: 3, max: 32}),
    body('password').isLength({min: 6, max: 256}),
    authController.registration
)
router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.get('/refresh', authController.refresh)

module.exports = router