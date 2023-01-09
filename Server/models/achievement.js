const mongoose = require('mongoose')

const achievementsSchema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  },
  course: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Course',
    required: true
  },
  score: { type: String, required: true },
  gradeLetter: { type: String, required: true },
  finishedAt: {
    type: mongoose.SchemaTypes.Date,
    required: true,
    default: Date.now
  },
  certificate: { type: String }
})

achievementsSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject._id
  },
  virtuals: true
})

achievementsSchema.set('toObject', {
  transform: (document, returnedObject) => {
    delete returnedObject._id
  },
  virtuals: true
})

const Achievement = mongoose.model('Achievement', achievementsSchema)

module.exports = Achievement
