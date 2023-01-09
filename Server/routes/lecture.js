const express = require('express')
const auth = require('../middleware/auth')
const lectureRouter = express.Router({ mergeParams: true })

const {
  getAllVideos
} = require('../controller/lectureController/lectureController')

const {
  getAllComments,
  createComment,
  deleteComment
} = require('../controller/lectureController/lectureCommentController')

lectureRouter.get('/', getAllVideos)

lectureRouter.get('/:moduleItemId/comments', getAllComments)
lectureRouter.post('/:moduleItemId/comments', auth, createComment)
lectureRouter.delete('/:moduleItemId/comments/:commentId', auth, deleteComment)

module.exports = lectureRouter
