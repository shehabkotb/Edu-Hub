const mongoose = require('mongoose') ; 

const notificationSubscriptionSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
			required: true,
		},
		subData: {
			type: Object,
			required: true,
		}
	}
);

const NotificationSubscription = mongoose.model("NotificationSubscription", notificationSubscriptionSchema);

module.exports = NotificationSubscription;