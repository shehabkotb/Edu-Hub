const express = require('express')
const auth = require('../middleware/auth')
const notificationRouter = express.Router()

const {
  subscribe,
  unsubscribe,
  createNotification,
  editNotification,
  deleteNotification,
  broadcastToUsers,
  getNotificationsOfUser,
  deleteNotificationsOfUser,
  push
} = require('../controller/notificationController/notificationController')
  
notificationRouter.post('/subscribe', auth, subscribe)
notificationRouter.delete('/unsubscribe', auth, unsubscribe)
notificationRouter.post('/push', auth, push)
notificationRouter.post('/createNotification', auth, createNotification)
notificationRouter.put('/editNotification', auth, editNotification)
notificationRouter.delete('/deleteNotification/:id', auth, deleteNotification)
notificationRouter.delete('/deleteNotificationsOfUser', auth, deleteNotificationsOfUser)
notificationRouter.post('/broadcastToUsers', auth, broadcastToUsers)
notificationRouter.get('/getNotificationsOfUser', auth, getNotificationsOfUser)
  
module.exports = notificationRouter