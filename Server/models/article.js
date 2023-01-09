const mongoose = require('mongoose')
 // timestamp,contentId
const articleSchema = new mongoose.Schema(
    {
        authorPersonId: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
            required:true
        },
        text:{
            type:String,
        },
       
        title:{
            type:String, 
            required:true
        } , 
        lang:{
            type:String , 
            required:true , 
            enum:['en' , 'fr' , 'sp' , 'ar'] ,
            default:'en'
        },
        contentType:{
            type:String , 
            default:'html'
        },
        url:{
            type:String , 
        },
        contentId:{
            type:Number,
            required:true
        }
    },
    {
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
) ; 

articleSchema.virtual("likers", {
	ref: "Like",
	foreignField: "article",
	localField: "id",
});

articleSchema.virtual("likers", {
	ref: "Like",
	foreignField: "article",
    localField: "_id",
    count:true,
});



const Article = mongoose.model("Article" , articleSchema) ; 

module.exports= Article ; 