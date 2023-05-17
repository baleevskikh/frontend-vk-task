const Post = require("../models/Post");
const User = require("../models/User");
const Friend = require("../models/Friend");
const ApiError = require("../exceptions/apiError");
const tokenService = require("./tokenService");

class PostService {
    async createPost(authorId, content, postImage) {
        const author = await User.findOne({_id: authorId})
        if (!content && !postImage) return {message: 'failed'}
        let post
        if (postImage) post = await Post.create({
            author,
            content,
            image: `${process.env.SERVER_URL}/api/images/${postImage}`
        })
        else post = await Post.create({author, content})
        return post
    }

    async getUserPosts(username) {
        const author = await User.findOne({username})
        const posts = await Post.find({author}).populate('author', ['username', 'name', 'avatar']).sort([['createdAt', -1]])
        return posts
    }

    async getTape(userData) {
        if (!userData) {
            const posts = await Post.find().populate('author', ['username', 'name', 'avatar']).sort([['createdAt', -1]])
            return posts
        }
        const friends = await Friend.find({$or: [{requester: userData.id}, {recipient: userData.id, status: 2}]})
        const friendIds = new Set()
        for (let friend of friends) {
            friendIds.add(friend.requester)
            friendIds.add(friend.recipient)
        }

        const friendPosts = await Post.find({author: {$in: [...friendIds]}}).populate('author', ['username', 'name', 'avatar']).sort([['createdAt', -1]])
        return friendPosts
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