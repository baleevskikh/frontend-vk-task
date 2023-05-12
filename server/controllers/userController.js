const {validationResult} = require("express-validator");
const ApiError = require("../exceptions/apiError");
const userService = require("../service/userService");

class UserController {
    async getUserById(req, res, next) {
        try {
            const {id} = req.body
            const userData = await userService.getUserById(id)
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async getUserByUsername(req, res, next) {
        try {
            const {username} = req.body
            const userData = await userService.getUserByUsername(req.user.id, username)
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async setUser(req, res, next) {
        try {
            const userData = await userService.setUser(req.user.id, req.body)
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async addToFriend(req, res, next) {
        try {
            const {id} = req.body
            const userData = await userService.addToFriend(req.user.id, id)
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async removeFriend(req, res, next) {
        try {
            const {id} = req.body
            const userData = await userService.removeFriend(req.user.id, id)
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async getFriend(req, res, next) {
        try {
            const userData = await userService.getFriends(req.user.id)
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async getCountFriends(req, res, next) {
        try {
            const userData = await userService.getCountFriends(req.user.id)
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async searchUsers(req, res, next) {
        try {
            const {query} = req.body
            const userData = await userService.searchUsers(req.user.id, query)
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController()