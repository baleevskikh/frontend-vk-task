const {Schema, model, ObjectId} = require("mongoose")


const Friend = new Schema({
    requester: { type: ObjectId, ref: 'User', required: true},
    recipient: { type: ObjectId, ref: 'User', required: true},
    status: {
        type: Number,
        enums: [
            1,    //'requested',
            2,    //'friends'
        ]
    }
}, {timestamps: true})

module.exports = model('Friend', Friend)
