const express = require('express')
const auth = require('../middleware/auth')
const assessmentRouter = express.Router({ mergeParams: true })

const {
  getAllAssessments,
  getOneAssessment,
  deleteAssessment,
  createAssessment,
  deleteAllAssessments,
  deleteAllQuestions,
  queueAutoGrade,
  queuePlagarismjob
} = require('../controller/assessmentController/assessmentController')

assessmentRouter.get('/', getAllAssessments)
assessmentRouter.get('/:assessmentId/auto-grade', queueAutoGrade)
assessmentRouter.get('/:assessmentId/check-plagiarism', queuePlagarismjob)
assessmentRouter.post('/', createAssessment)
assessmentRouter.get('/:id', getOneAssessment)
assessmentRouter.delete('/:id/', deleteAssessment)
assessmentRouter.delete('/', deleteAllAssessments)
assessmentRouter.delete('/questions', deleteAllQuestions)

module.exports = assessmentRouter
