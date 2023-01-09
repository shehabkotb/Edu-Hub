const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    },
    comment: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()

    delete returnedObject._id
    delete returnedObject.__v
  }
})

const lectureCommentsSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Course',
    required: true
  },
  moduleItemId: {
    type: mongoose.Schema.ObjectId,
    ref: 'CourseModuleItem',
    required: true,
    index: true
  },
  comments: [commentSchema]
})

lectureCommentsSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const LectureComments = mongoose.model('LectureComments', lectureCommentsSchema)

module.exports = LectureComments
