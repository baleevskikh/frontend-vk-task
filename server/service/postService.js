const Post = require("../models/Post");
const ApiError = require("../exceptions/apiError");
const tokenService = require("./tokenService");
const User = require("../models/User");

class PostService {
    async createPost(authorId, content, postImage) {
        const author = await User.findOne({_id: authorId})
        if (!content && !postImage) return {message: 'failed'}
        let post
        if (postImage) post = await Post.create({author, content, image: `${process.env.SERVER_URL}/api/images/${postImage}`})
        else post = await Post.create({author, content})
        return post
    }

    async getUserPosts(username) {
        const author = await User.findOne({username})
        const posts = await Post.find({author}).populate('author', ['username', 'name', 'avatar']).sort([['createdAt', -1]])
        return posts
    }

    async getTape() {
        const posts = await Post.find().populate('author', ['username', 'name', 'avatar']).sort([['createdAt', -1]])
        return posts
    }

    async getUserTape(userId) {
        if (userId) console.log('test')
        const posts = await Post.find().populate('author', ['username', 'name', 'avatar']).sort([['createdAt', -1]])
        return posts
    }

    async toggleLike(likerId, postId) {
        const post = await Post.findOne({_id: postId})
        if (!post.likes.includes(likerId)) {
            post.likes.push(likerId)
            post.save()
        } else {
            post.likes.splice(likerId, 1)
            post.save()
        }
        return post
    }
}

module.exports = new PostService()