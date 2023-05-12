const {Schema, model, ObjectId} = require("mongoose")


const Post = new Schema({
    author: {type: ObjectId, ref: 'User', required: true},
    content: {type: String, maxLength: 280},
    image: {type: String},
    likes: {type: Array, of: String}
}, {timestamps: true})

module.exports = model('Post', Post)