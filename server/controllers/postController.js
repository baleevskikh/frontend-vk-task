const postService = require("../service/postService");

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

    async toggleLike(req, res, next) {
        try {
            const {id} = req.body
            const postData = await postService.toggleLike(req.user.id, id)
            return res.json(postData)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new PostController()