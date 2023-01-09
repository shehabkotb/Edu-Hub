const express = require('express')
const auth = require('../middleware/auth')
const moduleRouter = express.Router({ mergeParams: true })

const {
  getAllModules,
  getOneModule,
  createModule,
  updateModule,
  deleteModule
} = require('../controller/moduleController/moduleController')

moduleRouter.get('/', getAllModules)
moduleRouter.get('/:id', getOneModule)
moduleRouter.post('/', auth, createModule)
moduleRouter.put('/:id/', auth, updateModule)
moduleRouter.delete('/:id/', auth, deleteModule)

module.exports = moduleRouter
