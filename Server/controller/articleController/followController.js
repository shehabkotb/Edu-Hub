const Follow = require('../../models/follow');
const Article = require('../../models/article');
const User = require('../../models/user');
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

const followUser = async (req, res) => {
    try {
        const article_Id = await Article.findOne({ _id: req.params.articleId });
        if (!article_Id) {
            throw new Error();
        }
        const userToFollow = await User.findOne({ _id: article_Id.authorPersonId });
        if (!userToFollow) {
            throw new Error();
        }
        if (req.user.id === userToFollow.id) {
            throw new Error('you can\'t follow yourself');
        }

        const existingFollow = await Follow.findOne({
            user: req.user._id,
            follows: userToFollow._id,
        });

        if (existingFollow) {
            throw new Error("You already follow this user!");
        }

        const createFollow = new Follow({ user: req.user._id, follows: userToFollow.id });
        createFollow.save();

        await View.create({
            personId:req.user.code  , 
            contentId:article_Id.contentId ,
            eventType:"FOLLOW"
        })
        pushNotification(
          article_Id.authorPersonId,
          JSON.stringify({
            title:
              req.user.username +
              ' has followed your article "' +
              article_Id.title +
              '"'
          }),
          'follow'
        )


        res.status(200).send();


    } catch (e) {
        res.status(400).send('you can\'t create a follow');
        console.log(e)
    }
}

const followers = async (req, res) => {
    try {
        const username = req.params.username;
        const user = await User.findOne({ username: username });
        if (!user) {
            throw new Error('user not founded ')
        }
        const myfollowers = await Follow.find({ follows: user._id }).populate({
            path: "user",
            select: "username"
        }).select("user");

        res.status(200).send(myfollowers);
    } catch (e) {
        res.status(404).send()
    }
}


const follows = async (req, res) => {
    try {
        const username = req.params.username;
        const user = await User.findOne({ username: username });
        if (!user) {
            throw new Error('user not founded ')
        }
        const myfollowers = await Follow.find({ user: user._id }).populate({
            path: "follows",
            select: "username"
        }).select("follows");

      

        res.status(200).send(myfollowers);
    } catch (e) {
        res.status(404).send()
    }
}

const unfollow = async (req, res) => {
    try {
        const article_Id = await Article.findOne({ _id: req.params.articleId });
        if (!article_Id) {
            throw new Error();
        }
        const userToUnFollow = await User.findOne({ _id: article_Id.authorPersonId });
        if (!userToUnFollow) {
            throw new Error();
        }

        if (req.user._id === userToUnFollow.id) {
            throw new Error('you can\'t unfollow yourself');
        }

        await View.findOneAndDelete({
            personId:req.user.code  , 
            contentId:article_Id.contentId ,
            eventType:"FOLLOW"
        }) ; 


        const existingFollow = await Follow.findOneAndDelete({
            user: req.user._id,
            follows: userToUnFollow._id,
        });

        if (!existingFollow) {
            throw new Error("You already follow this user!");
        }

        res.status(200).send();
    }
    catch (e) {
        res.status(400).send('you can\'t create unfollow');
        console.log(e)
    }
}


module.exports = { followUser, unfollow, followers, follows  }
