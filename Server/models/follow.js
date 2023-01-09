const mongoose = require("mongoose");

const followSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
			required: true,
		},
		follows: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
			required: true,
		}
		
	},
	{
		timestamps: true,
	}
);

const Follow = mongoose.model("Follow", followSchema);

module.exports = Follow;