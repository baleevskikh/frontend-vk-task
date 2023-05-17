const postService = require("../service/postService");
const ApiError = require("../exceptions/apiError");
const tokenService = require("../service/tokenService");

class PostController {
    async createPost(req, res, next) {
        try {
            const {content, postImage} = req.body
            const postData = await postService.createPost(req.user.id, content, postImage)
            return res.json(postData)
        } catch (e) {
            next(e)
        }
    }

    async getUserPosts(req, res, next) {
        try {
            const {username} = req.body
            const postData = await postService.getUserPosts(username)
            return res.json(postData)
        } catch (e) {
            next(e)
        }
    }

    async getTape(req, res, next) {
        try {
            const authorizationHeader = req.headers.authorization
            let userData = null
            if (authorizationHeader) {
                const accessToken = authorizationHeader.split(' ')[1]
                if (accessToken) {
                    userData = tokenService.validateAccessToken(accessToken)
                    if (!userData) {
                        userData = null
                    }
                }
            }


            const postData = await postService.getTape(userData)
            return res.json(postData)
        } catch (e) {
            next(e)
        }
    }

    async getUserTape(req, res, next) {
        try {
            const userId = req?.user?.id
            const postData = await postService.getTape(userId)
            return res.json(postData)
        } catch (e) {
            next(e)
        }
    }

    async toggleLike(req, res, next) {
        try {
            const {postId} = req.body
            const postData = await postService.toggleLike(req.user.id, postId)
            return res.json(postData)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new PostController()