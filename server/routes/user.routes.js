const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const {body} = require("express-validator")
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/getUserById', authMiddleware, userController.getUserById)
router.post('/getUserByUsername', authMiddleware, userController.getUserByUsername)
router.post('/setUser',
    body('username').isLength({min: 3, max: 32}),
    body('name').isLength({min: 3, max: 32}),
    authMiddleware,
    userController.setUser
)
router.post('/addToFriend', authMiddleware, userController.addToFriend)
router.post('/removeFriend', authMiddleware, userController.removeFriend)
router.get('/getFriends', authMiddleware, userController.getFriend)
router.get('/getCountFriends', authMiddleware, userController.getCountFriends)
router.post('/searchUsers', authMiddleware, userController.searchUsers)

module.exports = router