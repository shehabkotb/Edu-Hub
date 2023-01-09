const mongoose = require("mongoose");

const ViewSchema = new mongoose.Schema(
    {
        personId: {
           type:Number , 
           required:true , 
        },
        contentId: {
            type:Number , 
            required:true
        },
        eventType: {
            type: String,
            enum: ["FOLLOW", "LIKE", "COMMENT CREATED", "BOOKMARK" , "VIEW"],
            required: true
        }
    },
    {
        timestamps: true,
    }
);

const View = mongoose.model("View", ViewSchema);

module.exports = View;