const User = require("../models/User");
const Post = require("../models/Post");
const Friend = require("../models/Friend");
const ApiError = require("../exceptions/apiError");
const {UserDto, UserSerialize} = require("../dtos/userDto");
const tokenService = require("./tokenService");

class UserService {
    async getUserById(id) {
        const candidate = await User.findOne({_id: id})
        if (!candidate) {
            throw ApiError.BadRequest(`Пользователя с id ${id} не существует`)
        }
        const userDto = new UserDto(candidate)
        return userDto
    }

    async getUserByUsername(requesterId, username) {
        const requester = await User.findOne({_id: requesterId})
        const candidate = await User.findOne({username})
        console.log(requester)
        if (!candidate) {
            throw ApiError.BadRequest(`Пользователя с username ${username} не существует`)
        }
        const posts = await Post.count({author: candidate})
        const friends = await Friend.count({
            $or: [{requester: candidate, status: 2}, {
                recipient: candidate,
                status: 2
            }]
        })
        const subscribers = await Friend.count({recipient: candidate, status: 1})
        const userDto = new UserDto(candidate)
        let friendStatus = 'add'
        let friendsData = await Friend.findOne({requester: requester, recipient: candidate})
        if (friendsData) {
            if (friendsData.status === 2) friendStatus = 'remove'
            else friendStatus = 'cancel'
        }
        friendsData = await Friend.findOne({recipient: requester, requester: candidate})
        if (friendsData) {
            if (friendsData.status === 2) friendStatus = 'remove'
            else friendStatus = 'accept'
        }
        if (requester === candidate) friendStatus = 'owner'
        return {...userDto, ...{posts, friends, subscribers, friendStatus}}
    }

    async setUser(id, data) {
        await User.updateOne({_id: id}, {$set: new UserSerialize(data)})
        return {'message': 'success'}
    }

    async addToFriend(requesterId, recipientId) {
        const requester = await User.findOne({_id: requesterId})
        const recipient = await User.findOne({_id: recipientId})

        let candidate = await Friend.findOne({recipient: requester, requester: recipient})
        if (candidate) {
            candidate.status = 2
            await candidate.save()
            return {'message': 'success'}
        }
        candidate = await Friend.findOne({requester: requester, recipient: recipient})
        if (candidate) return {'message': 'success'}
        await Friend.create({requester: requester, recipient: recipient, status: 1})
        return {'message': 'success'}
    }

    async removeFriend(requesterId, recipientId) {
        const requester = await User.findOne({_id: requesterId})
        const recipient = await User.findOne({_id: recipientId})
        await Friend.findOneAndRemove({requester: requester, recipient: recipient})
        await Friend.findOneAndRemove({requester: recipient, recipient: requester})
        return {'message': 'success'}
    }

    async getFriends(id) {
        let friends = []
        const friendsData = await Friend.find(
            {
                $or: [{requester: id}, {recipient: id}]
            }, ['requester', 'recipient', 'status']
        ).populate('requester', ['name', 'username', 'avatar']).populate('recipient', ['name', 'username', 'avatar'])

        for (const friend of friendsData) {
            const user = (await friend).requester.id === id ? (await friend).recipient : (await friend).requester
            if (friend.status === 1) {
                if (friend.requester.id === id) friends.push({...new UserDto(user), friendStatus: 'cancel'})
                else friends.push({...new UserDto(user), friendStatus: 'accept'})
                continue
            }
            friends.push({...new UserDto(user), friendStatus: 'remove'})
        }
        return friends
    }

    async getCountFriends(id) {
        const countFriends = await Friend.count({
            $or: [{requester: id, status: 2}, {recipient: id, status: 2}]
        })
        return {countFriends}
    }

    async searchUsers(userId, query) {
        let users = []
        const usersData = await User.find({$text: {$search: query}}, ['name', 'username', 'avatar'])
        const owner = await User.findOne({_id: userId})
        for (const user of usersData) {
            const userDto = new UserDto(user)
            let friendsData = await Friend.findOne({requester: owner, recipient: user})
            if (friendsData) {
                if (friendsData.status === 1) {
                    users.push({...userDto, friendStatus: 'cancel'})
                } else {
                    users.push({...userDto, friendStatus: 'remove'})
                }
                continue
            }
            friendsData = await Friend.findOne({recipient: owner, requester: user})
            if (friendsData) {
                if (friendsData.status === 1) {
                    users.push({...userDto, friendStatus: 'accept'})
                } else {
                    users.push({...userDto, friendStatus: 'remove'})
                }
                continue
            }
            users.push({...userDto, friendStatus: 'add'})
        }
        return users
    }
}

module.exports = new UserService()