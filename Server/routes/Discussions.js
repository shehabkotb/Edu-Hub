const express = require('express') ; 
const auth = require('../middleware/auth')
const { getAllDiscussions, addDiscussion, addComment, removeComment,
    removeDiscussion, editDiscussion, editComment } = require('../controller/DiscussionsController/DiscussionsController') ; 

const discussionsRouter = new express.Router()

discussionsRouter.get('/getAll/:courseId',auth,getAllDiscussions); 
discussionsRouter.post('/add',auth,addDiscussion);
discussionsRouter.delete('/remove/:id',auth,removeDiscussion);
discussionsRouter.post('/addComment',auth,addComment);
discussionsRouter.delete('/removeComment/:discussionId/:commentId',auth,removeComment);
discussionsRouter.put('/edit',auth,editDiscussion);
discussionsRouter.put('/editComment',auth,editComment);

module.exports = discussionsRouter