const Router = require('express')
const router = new Router()
const postController = require('../controllers/postController')
const {body} = require("express-validator")
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/createPost',
    authMiddleware,
    postController.createPost
)
router.post('/getUserPosts', postController.getUserPosts)
router.post('/toggleLike', postController.toggleLike)

module.exports = router