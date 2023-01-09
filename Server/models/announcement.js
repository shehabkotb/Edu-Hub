const mongoose = require('mongoose')

const announcementsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    },
    course: {
      type: mongoose.Schema.ObjectId,
      ref: 'Course',
      required: true
    },
    data: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

const Announcements = mongoose.model('Announcements', announcementsSchema)

module.exports = Announcements
