const mongoose = require('mongoose')

const discussionsCommentsSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },
        data: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
)


module.exports = discussionsCommentsSchema
