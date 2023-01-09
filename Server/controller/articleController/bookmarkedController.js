const Article = require('../../models/article');
const BookMarked = require('../../models/bookmark')
const View = require('../../models/view');
const {
  subscribe,
  pushNotification,
  createNotification,
  editNotification,
  deleteNotification,
  broadcastToUsers,
  getNotificationsOfUser
} = require('../notificationController/notificationController')

const BookMark = async (req, res) => {

    try {
        const articleId = req.params.articleId;
        const article = await Article.findById({ _id: articleId });

        if (!article) {
            throw new Error("can\'t find this article");
        }

        const alreadyBookMarked = await BookMarked.findOne({
            bookedBy: req.user.id,
            article: req.params.articleId,
        });

        if (alreadyBookMarked) {
            throw new Error(" You have already BookMarked ");

        }
        await BookMarked.create({
            bookedBy: req.user.id,
            article: articleId
        })

        await View.create({
            personId: req.user.code,
            contentId: article.contentId,
            eventType: "BOOKMARK"
        });

        pushNotification(
          article.authorPersonId,
          JSON.stringify({
            title:
              req.user.username+' has bookmarked your article "'+article.title+'"'
          }),
          'bookmark'
        )

        res.status(201).send("success")
    }
    catch (e) {
        res.status(400).send('failed to bookmark article')
        console.log(e)
    }
}

const unBookMarked = async (req, res) => {

    try {
        const articleId = req.params.articleId;
        const article = await Article.findById ({ _id: articleId });

        if (!article) {
            throw new Error("can\'t find this article");
        }

        await View.findOneAndDelete({
            personId: req.user.code,
            contentId: article.contentId,
            eventType:"BOOKMARK"
        }) ; 

        const BK = await BookMarked.findOneAndDelete({ bookedBy: req.user.id, article: articleId });
        if (!BK) {
            throw new Error('you can\'t delete a bookmark here')
        }

      
        res.status(200).send()
    }
    catch (e) {
        res.status(400).send('failed to unBookMark article')
    }
}


const Bookedby = async (req, res) => {

    try {

        const bookmarked = await BookMarked.find({
          bookedBy: req.user.id
        }).populate({
          path: 'article',
          populate: { path: 'authorPersonId' }
        })

        if (bookmarked.length <= 0 ) {
            throw new Error('you can\'t create a bookmarked here')
        }
        res.status(200).send(bookmarked);

    } catch (e) {
        res.status(400).send('there no article with this field');
    }
}


module.exports = { BookMark, unBookMarked, Bookedby } ; 


