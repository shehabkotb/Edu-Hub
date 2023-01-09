const mongoose = require("mongoose");

const LikedSchema = new mongoose.Schema(
	{
		likedBy: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
			required: true,
		},
		article: {
			type: mongoose.Schema.ObjectId,
			ref: "Article",
			required: true,
		}
	},
	{
		timestamps: true,
	}
);

const Like = mongoose.model("Like", LikedSchema);

module.exports = Like;