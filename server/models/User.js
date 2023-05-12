const {Schema, model, ObjectId} = require("mongoose")


const User = new Schema({
    username: {type: String, required: true, unique: true, minLength: 3, maxLength: 32},
    password: {type: String, required: true, minLength: 6, maxLength: 256},
    name: {type: String, required: true, minLength: 3, maxLength: 32},
    bio: {type: String},
    birthday: {type: Date},
    city: {type: String},
    avatar: {type: String},
    friends: [{ type: ObjectId, ref: 'Friend'}],
    posts: [{type: ObjectId, ref: 'Post'}]
}, {timestamps: true})

User.index({name: 'text', username: 'text', city: 'text', bio: 'text'});

module.exports = model('User', User)
