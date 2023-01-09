const Article = require('../../models/article');
const User = require('../../models/user');
const View = require('../../models/view');
const Like = require('../../models/like') ; 
const BookMarked = require('../../models/bookmark') ; 
const Comment = require('../../models/comment') ; 
const Follow = require('../../models/follow');
const axios = require('axios');

const recommendationEngineUrl = 'http://127.0.0.1:5000/recommend/'

const createArticle = async (req, res) => {
    try {
        const article = new Article(req.body);
        article.authorPersonId = req.user.id;
        article.contentId = Date.now() ;
        await article.save()
        res.status(201).send(article)
        await axios.get(
          recommendationEngineUrl+'reset'
        )
    } catch (e) {
        res.status(400).send('error in creating Article');
    }
}

const timeline = async (req, res) => {
    try {
      /*const { page = 1, limit } = req.query
      const articles = await Article.find({})
        .populate({
          path: 'authorPersonId',
          select: 'username name photo'
        })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();*/
      const { page = 1, limit } = req.query
      const userCode = req.user.code;
      const contentIds=[];
      const response = await axios.get(
        recommendationEngineUrl +
          userCode +
          '/' +
          limit +
          '/' +
          (page - 1) * limit
      )
            
        const data = response.data;

      for (var i = 0, len = data.length; i < len; i++) {
        contentIds.push(data[i])
      }


      const articles = await Article.find({ contentId: contentIds })
        .populate({
          path: 'authorPersonId',
          select: 'username name photo'
        }).exec()

      const count = await Article.countDocuments()
      res.status(200).send({
        articles,
        totalPages: Math.ceil(count / limit),
        currentPage: page
      })
    } catch (e) {
        console.log(e)
        res.status(400).send();
    }
}
const getAllArticles = async (req, res) => {
    try {

        const articles = await Article.find({}).populate({
            path: "authorPersonId",
            select: "username name photo",
        });
        if (!articles) {
            throw new Error();
        }


        res.status(201).send(articles)
    } catch (e) {
        res.status(400).send('error in getting all Articles 1');
    }
}


const articleId = async (req, res) => {
    try {
        const articleId = req.params.articleId ;
        const myarticle = await Article.findById({ _id: articleId }).populate({
            path: "authorPersonId",
            select: "name photo",
        });

        if (!myarticle) {
            throw new Error('there is no article with this id');
        }

        const myView = await View.findOne({
            personId: req.user.code,
            contentId: myarticle.contentId,
            eventType: "VIEW"
        })

        if (!myView) {
            await View.create({
                personId: req.user.code,
                contentId: myarticle.contentId,
                eventType: "VIEW"
            })
        }

       
        /*       Get Likes For Article       */
        const like = await Like.find({article:articleId}) ;
        const alreadyLike = await Like.findOne({
            likedBy: req.user.id,
            article: req.params.articleId,
        });

        var mylike ;
        if(alreadyLike)
        {
            mylike = true ; 
        }
        else{
            mylike = false ; 
        }
        
        /*       Get Status Of BookMark For Article       */
        const bookmarked = await BookMarked.findOne({bookedBy: req.user.id, article: req.params.articleId})  ;
        var isBooked ; 
        if(bookmarked)
        {
            isBooked = true ; 
        }
        else{
            isBooked=false ;
        }

        /*       Get Status Of follow For Article       */

        const userToFollow = await User.findOne({ _id: myarticle.authorPersonId });

        if (!userToFollow) {
            throw new Error('not user to follow');
        }
       
        const existingFollow = await Follow.findOne({
            user: req.user.id,
            follows: userToFollow.id,
        });
        var isFollow  ; 
        if (existingFollow) {
            
            isFollow = true ; 
        }
        else {
            isFollow = false ; 
        }

        /*       GetComments For Article       */

        const comments =await Comment.find({article:req.params.articleId}).populate({
            path: "createdBy",
            select: "name photo",
        }) ;

       
        res.status(200).json({length:like.length , islike:mylike ,myarticle , isBooked:isBooked , comments , isFollow     }) ; 
    } catch (e) {
        res.status(400).send('error in getting all Articles 2 ');
        console.log(e)

    }
}

const UserArticles = async (req, res) => {
    try {
        const username = req.params.name;
        const myUser = await User.findOne({ username: username });

        if (!myUser) {
            throw new Error('No one with this name');
        }


        const myarticles = await Article.find({ authorPersonId: myUser._id }).populate({
            path: "authorPersonId",
            select: "username name photo",
        });

        if (myarticles.length === 0) {
            throw new Error('You don\'t have articles');
        }

     
        res.status(201).json({myarticles});

    } catch (e) {
        res.status(400).send('error in getting all Articles 3');
    }
}

const editArticle = async (req, res) => {


    try {

        const id = req.params.articleId;
        const article = new Article(req.body);

        let updatedArticle = await Article.findOneAndUpdate(
            { _id: id, authorPersonId: req.user._id },
            {
                url:article.url,
                title:article.title,
                text: article.text
            },{
                new: true,
                upsert: true 
              }
        );

        if(!updatedArticle)
        {
            throw new Error('there is an error here')
        }


        res.status(200).json({
            status: "success",
            data: {
                article: updatedArticle,
            },
        });
    } catch (e) {
        res.status(400).send('failed to Update Article');
    }
}

const deleteArticle = async (req, res) => {


    try {
        const articleId = req.params.articleId ; 

        const deletedArticle = await Article.findById(
            { _id: articleId },
        );

        if (!deletedArticle) {
            throw new Error()
        }
        if (toString(deletedArticle.authorPersonId) !== toString(req.user._id)) {
            throw new Error('can\'t with the same error');
        }
       

        await Like.deleteMany({article: articleId}) ; 

        await BookMarked.deleteMany({article : articleId}) ; 

        await Comment.deleteMany({article:articleId});

        await View.deleteMany({contentId:deletedArticle.contentId}) ; 

        deletedArticle.remove();
        res.status(200).json({
            status: "success",
        });
    } catch (e) {
        res.status(400).send('failed to Delete Article');
        console.log(e)
    }
}

module.exports = { createArticle, timeline, UserArticles, articleId, editArticle, deleteArticle, getAllArticles }

