const express = require('express')
const auth = require('../middleware/auth')
const achievementsRouter = express.Router({ mergeParams: true })

const {
  getUserAchievments
} = require('../controller/achievementsController/achievementsController')

const { getOne } = require('../controller/gradesSummaryController')

achievementsRouter.get('/', auth, getUserAchievments)

module.exports = achievementsRouter
