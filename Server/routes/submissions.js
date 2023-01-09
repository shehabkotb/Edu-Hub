const express = require('express')
const auth = require('../middleware/auth')
const submissionRouter = express.Router({ mergeParams: true })

const {
  getAllSubmissions,
  getOneSubmission,
  createSubmission,
  updateSubmission,
  gradeSubmission,
  deleteAllSubmissions
} = require('../controller/submissionController/submissionController')

submissionRouter.get('/', getAllSubmissions)
submissionRouter.get('/:studentId', getOneSubmission)
submissionRouter.post('/', createSubmission)
submissionRouter.put('/:studentId/', updateSubmission)
submissionRouter.put('/:studentId/grade', auth, gradeSubmission)
submissionRouter.delete('/', deleteAllSubmissions)

module.exports = submissionRouter
