const express = require('express');
const auth = require('../middleware/auth')
const { createArticle, timeline, deleteArticle,
    UserArticles, articleId, editArticle , getAllArticles} = require('../controller/articleController/articleController');

const { like,unlike } = require('../controller/articleController/likeController');
const { BookMark, unBookMarked ,Bookedby } = require('../controller/articleController/bookmarkedController');
const { createComment, getComment, updateComment, deleteComment } = require('../controller/articleController/commentController');
const {followUser, unfollow , followers , follows } = require('../controller/articleController/followController') ; 

const router = new express.Router();

router.post('/newArticle', auth, createArticle);
router.get('/getAllArticles', auth, getAllArticles);

router.get('/timeline' , auth , timeline) ; 
router.get('/myBookedMarks' , auth , Bookedby);


router.get('/:name/articles', auth, UserArticles);
router.get('/:articleId', auth, articleId);
router.patch('/editArticle/:articleId', auth, editArticle);
router.delete('/deleteArticle/:articleId', auth, deleteArticle);

router.get('/:articleId/like', auth, like) ;
router.delete('/:articleId/unlike', auth, unlike) ;

router.get('/:articleId/bookMarked', auth, BookMark);
router.delete('/:articleId/unBookMarked', auth, unBookMarked);

router.post('/:articleId/addcomment', auth, createComment)
router.get('/:articleId/comments', auth, getComment)
router.patch('/:articleId/edit/:commentId', auth, updateComment)
router.delete('/:articleId/delete/:commentId', auth, deleteComment)

router.get('/:articleId/followUser' , auth , followUser) ;
router.delete('/:articleId/unfollow' , auth , unfollow) ; 
router.get('/:username/followers' ,auth , followers) ; 
router.get('/:username/follows' , auth , follows) ; 


module.exports = router


