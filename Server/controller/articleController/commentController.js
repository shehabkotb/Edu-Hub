const Comment = require('../../models/comment') ; 
const Article = require('../../models/article') ; 
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

const createComment =  async(req,res)=>{

    try {    
        const article = await Article.findById({_id:req.params.articleId}) ; 

        if(!article)    
        {
            throw new Error("can\'t find this article");
        }
        const NewComment = new Comment({ body:req.body.body });
        NewComment.createdBy = req.user._id ; 
        NewComment.article = req.params.articleId ; 

        NewComment.save() ; 
        await View.create({
            personId:req.user.code  , 
            contentId:article.contentId ,
            eventType:"COMMENT CREATED"
        })
        pushNotification(
          article.authorPersonId,
          JSON.stringify({
            title:
              req.user.username +
              ' has commented on your article "' +
              article.title +
              '"'
          }),
          'comment'
        )

        res.status(200).send()
    }
    catch(e)
    {
        res.status(400).send('failed to comment on  article')
        console.log(e)
    }
};

const getComment = async(req,res)=>{

    try {    
        const article = await Article.find({_id:req.params.articleId}); 

        if(!article)    
        {
            throw new Error("can\'t find this article");
        }

        const comments =await Comment.find({article:req.params.articleId}).populate({
            path: "createdBy",
            select: "name photo",
        }) ;
        res.status(201).send(comments)
    }
    catch(e)
    {

        res.status(400).send('failed to get comments on Articles')
        console.log(e)
    }
} ; 

const updateComment =  async (req, res) => {
    

    try {
        
        const article = await Article.find({_id:req.params.articleId}) ; 

        if(!article)    
        {
            throw new Error("can\'t find this article");
        }
        const body = req.body.body ; 
        if(!body)
        {
            throw new Error() ; 
        }

        const updatedComment= await Comment.findByIdAndUpdate(
            {_id:req.params.commentId},
            { $set:
                {
                    'body':body , 
                }
            },
        );

        res.status(200).send(updatedComment);    
    } catch (e) {
        res.status(400).send('failed to Update comment');
    }
}

const deleteComment =  async (req, res) => {
    

    try {
        
        const article = await Article.findById({_id:req.params.articleId}) ; 
        if(!article)    
        {
            throw new Error("can\'t find this article");
        }

        const thisView =  await View.findOneAndDelete({
            personId:req.user.code  , 
            contentId:article.contentId ,
            eventType:"COMMENT CREATED"
        }) ; 

        if(!thisView)
        {
            throw new Error('this is err in deleting Error')
        }

        const DeleteComment= await Comment.findByIdAndRemove(
            {_id:req.params.commentId},{createdBy:req.user._id}
        );
       

        
        if(!DeleteComment)
        {
            throw new Error() ;
        }
        
        res.status(200).send();    
    } catch (e) {
        console.log(e)
        res.status(400).send('failed to Delete comment');
    }
}

module.exports = {createComment , getComment , updateComment , deleteComment}
