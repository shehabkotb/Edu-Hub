const mongoose = require('mongoose') ; 

const notificationSchema = new mongoose.Schema(
	{
		to: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
			required: true,
		},
		type: {
			type: String,
			enum: ["follow", "comment", "like", "admin", "alert","bookmark"],
			required: true,
		},
		priority: {
			type: Number,
			default: 0,
		},
		read: {
			type: Boolean,
			default: false,
		},
		data: {
			type: String,
		}
	},
	{
		timestamps: true,
	}
);

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;