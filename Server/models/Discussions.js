const mongoose = require('mongoose')
const discussionsCommentsSchema = require('./DiscussionsComments')

const discussionsSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },
        course: {
            type: mongoose.Schema.ObjectId,
            ref: "Course",
            required: true,
        },
        data: {
            type: String,
            required: true,
        },
        comments: [discussionsCommentsSchema]
    },
    {
        timestamps: true,
    }
)

const Discussions = mongoose.model('Discussions', discussionsSchema)

module.exports = Discussions
