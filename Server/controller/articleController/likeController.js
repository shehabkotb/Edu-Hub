const Article = require('../../models/article') ; 
const Like = require('../../models/like') ; 
const View = require('../../models/view') ;
const {
  subscribe,
  pushNotification,
  createNotification,
  editNotification,
  deleteNotification,
  broadcastToUsers,
  getNotificationsOfUser
} = require('../notificationController/notificationController') 

const like =  async(req,res)=>{

    try{
        const articleId = req.params.articleId ; 
        const article =await Article.findById({_id:articleId}) ;         

        if(!article)
        {
            throw new Error("can\'t find this article");
        }

        const alreadyLike = await Like.findOne({
            likedBy: req.user.id,
            article: req.params.articleId,
        });

        if(alreadyLike)
        {
            throw new Error(" You have already liked ");

        }
        const thisLike =  await Like.create({
            likedBy:req.user.id , 
            article:articleId
        })
        if(!thisLike)
        {
            throw new Error('can\'t like this article')
        }
     
        const thisView =   await View.create({
            personId:req.user.code  , 
            contentId:article.contentId,
            eventType:"LIKE"
        })
        pushNotification(
          article.authorPersonId,
          JSON.stringify({
            title:
              req.user.username +
              ' has liked your article "' +
              article.title +
              '"'
          }),
          'like'
        )

        if(!thisView)
        {
            throw new Error('there is an error in creating View') ;
        }

        res.status(201).send("success")
    }   
    catch(e)
    {
        res.status(400).send('failed to like article')
        console.log(e)
    }
}

const unlike =  async(req,res)=>{

    try{
        const articleId = req.params.articleId ; 
        const article = await Article.findById({_id:articleId}) ; 
        console.log(article.contentId) ; 
        if(!article)
        {
            throw new Error("can\'t find this article");
        }
       const deleteView =  await View.findOneAndRemove({
            personId: req.user.code,
            contentId: article.contentId,
            eventType:"LIKE"
        }) ; 

        if(!deleteView)
        {
            throw new Error('can\'t delete this view') ; 
        }

        const like = await Like.findOneAndDelete({likedBy:req.user.id , article:articleId}) ;         
        if(!like)
        {
            throw new Error('you can\'t create an unlike here')
        }

       
        res.status(200).send()
    }   
    catch(e)
    {
        res.status(400).send('failed to unlike article')
        console.log(e)
    }
}

module.exports = {like , unlike}
