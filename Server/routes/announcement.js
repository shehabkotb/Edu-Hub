const express = require('express')
const auth = require('../middleware/auth')
const {
  getAllAnnouncements,
  addAnnouncement,
  removeAnnouncement,
  editAnnouncement
} = require('../controller/announcementsController/announcementsController')

const AnnouncementsRouter = new express.Router()

AnnouncementsRouter.get('/getAll/:courseId', auth, getAllAnnouncements)
AnnouncementsRouter.post('/add', auth, addAnnouncement)
AnnouncementsRouter.delete('/remove/:id', auth, removeAnnouncement)
AnnouncementsRouter.put('/edit', auth, editAnnouncement)


module.exports = AnnouncementsRouter
