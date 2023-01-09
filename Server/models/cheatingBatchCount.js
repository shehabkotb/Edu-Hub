const mongoose = require('mongoose')

const cheatingBatchCountSchema = new mongoose.Schema(
    {
        student: {
			type: mongoose.Schema.ObjectId,
			ref: "user",
            required:true
        },
        counter:{
            type: Number,
            default:1
        }
    }
) ; 


const CheatingBatchCount = mongoose.model("CheatingBatchCount" , cheatingBatchCountSchema) ; 

module.exports= CheatingBatchCount ; 
