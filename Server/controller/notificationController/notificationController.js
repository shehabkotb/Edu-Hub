const NotificationSubscription = require("../../models/notificationSubscription");
const Notification = require("../../models/notification");
const webpush = require("web-push");
const mongoose = require('mongoose')


const publicVapidKey="";
const privateVapidKey="";

webpush.setVapidDetails("",publicVapidKey,privateVapidKey);


const createNotification = async (req, res) => {
    try{
        const user = req.user;
        const not = req.body;
        if (!not.to) {
          not.to = user
        }
        notification = new Notification(not);
        notification.save();
        res.status(201).send(not);
    }catch(e){
        console.log("error in sending the notification: "+e);
        res.status(400).send("error in sending the notification: "+e);
    }
}


const editNotification = async (req, res) => {
    try{
        const user = req.user;
        const oldNot = req.body.oldNot;
        oldNot.to = user;
        const newNot = req.body.newNot;
        newNot.to = user;
        await Notification.findOneAndUpdate(oldNot, newNot).exec()
        res.status(201).send(newNot);
    }catch(e){
        console.log("error in updating the notification: "+e);
        res.status(400).send("error in updating the notification: "+e);
    }
}


const deleteNotification = async (req, res) => {
    try{
        const not = req.params.id;
        console.log(not)
        const n = await Notification.findByIdAndDelete(not).exec()
        res.status(201).send(n);
    }catch(e){
        console.log("error in deleting the notification: "+e);
        res.status(400).send("error in deleting the notification: "+e);
    }
}


const broadcastToUsers = async (req, res) => {
    try{
        const users = req.body.users;
        const notification = req.body.notification;
        users.array.forEach(user => {
            notification.to=user
            not = new Notification(notification);
            not.save();
        });
        res.status(201).send("notifications sent");
    }catch(e){
        console.log("error in sending the notifications: "+e);
        res.status(400).send("error in sending the notifications: "+e);
    }
    
}

const getNotificationsOfUser = async (req, res) => {
    try{
        const user = req.user;
        notifications = await Notification.find({to: user}).exec();
        res.status(200).send(notifications);
    }catch(e){
        console.log("error in gathering the notifications: "+e);
        res.status(400).send("error in gathering the notifications: "+e);
    }
    
}

const deleteNotificationsOfUser = async (req, res) => {
  try {
    const user = req.user
    notifications = await Notification.deleteMany({ to: user }).exec()
    res.status(200).send("deleted")
  } catch (e) {
    console.log('error in gathering the notifications: ' + e)
    res.status(400).send('error in gathering the notifications: ' + e)
  }
}


const subscribe =  async (req, res) => {
    try{
        const user = req.user;
        const subscription = req.body;
        
        const payload = JSON.stringify({ title: "Welcome to EduHub" });
        const subscriptionData = await NotificationSubscription.findOne({user: user, subData: subscription}).exec()
        if(!subscriptionData){
            notificationSubscription = new NotificationSubscription({user: user, subData: subscription})
            notificationSubscription.save();
            console.log("sub data saved")
        }else{
            console.log("sub data already found")
        }
        webpush.sendNotification(subscription, payload)
        .then(
            ()=>{
                res.status(201).send("subscribed");                
            }
        )
        .catch(
            err => {
                res.status(400).send("error in web push send notification test: "+err);
                console.log("error in web push send notification test: "+err)
            }
        );
        
    }catch (e) {
        res.status(400).send('error in subscription: '+e);
    }
}


const unsubscribe = async (req, res) => {
    try{
        const user = req.user
        const un = await NotificationSubscription.deleteMany({ user: user }).exec()
        if (un.deletedCount > 0) {
          console.log('unsubscribed')
          res.status(201).send('unsubscribed')
        } else {
          console.log('already unsubscribed')
          res.status(201).send('already unsubscribed')
        }
    }catch (e) {
        res.status(400).send('error in unsubscription: '+e);
    }  
}


const pushNotification =  async (user, payload, type='alert') => {
    try{
        const objectId = mongoose.Types.ObjectId(user._id)
        const subscriptions = await NotificationSubscription.find({ user: objectId}).exec()
        
        subscriptions.forEach(subscription=>{
            console.log(subscription['subData'])
            webpush.sendNotification(subscription['subData'], payload)
              .then(() => {
                console.log('notification pushed')
              })
              .catch((err) => {
                console.log('error in web push send notification : ' + err)
              })
        });
        const notification = new Notification({
          to: user,
          type: type,
          data: JSON.parse(payload)['title']
        });
        await notification.save();
    }catch (e) {
        console.log('error in pushing notification: '+e);
    }
}

const push = async (req,res)=>{
    try {
      const user = req.user
      const data = req.body.data
      pushNotification(
        user,
        JSON.stringify({
          title: data
        })
      )
      res.status(200).send('pushed') 
    } catch (e) {
      res.status(400).send('error in push: ' + e)
    }
    
}


module.exports = {
  subscribe,
  unsubscribe,
  pushNotification,
  createNotification,
  editNotification,
  deleteNotification,
  broadcastToUsers,
  getNotificationsOfUser,
  deleteNotificationsOfUser,
  push
}
