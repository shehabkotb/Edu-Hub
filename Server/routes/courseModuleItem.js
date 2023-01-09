const express = require('express')
const auth = require('../middleware/auth')
const moduleItemRouter = express.Router({ mergeParams: true })

const {
  createModuleItem,
  updateModuleItem,
  deleteModuleItem
} = require('../controller/moduleController/moduleItemController')

moduleItemRouter.post('/', createModuleItem)
moduleItemRouter.put('/:id/', updateModuleItem)
moduleItemRouter.delete('/:id/', deleteModuleItem)

module.exports = moduleItemRouter
