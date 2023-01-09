const mongoose = require("mongoose");

const BookMarkedSchema = new mongoose.Schema(
	{
		bookedBy: {
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

const BookMarked = mongoose.model("BookMarked", BookMarkedSchema);

module.exports = BookMarked;