const Course = require('../../models/course')
const fs = require('fs')

// the return value for all endpoints is all the modules for the course

const createModuleItem = async (request, response) => {
  const body = request.body

  if (!body.title)
    return response.status(400).json({ error: 'missing module item title' })
  if (!body.type)
    return response.status(400).json({ error: 'missing module item type' })
  if (!body.url)
    return response.status(400).json({ error: 'missing module item url' })

  try {
    const course = await Course.findById(request.params.courseId).orFail()

    const updatedModule = course.modules.id(request.params.moduleId)
    if (!updatedModule)
      return response.status(404).json({ error: 'module not found' })

    await updatedModule.moduleItems.push({
      title: body.title,
      type: body.type,
      url: body.url
    })

    const updatedCourse = await course.save()

    return response.json(updatedCourse.modulesJSON())
  } catch (err) {
    console.log(err)
    response.status(400).json({ error: err.message || err.toString() })
  }
}

const updateModuleItem = async (request, response) => {
  const body = request.body

  try {
    const course = await Course.findById(request.params.courseId).orFail()

    const updatedModule = course.modules.id(request.params.moduleId)
    if (!updatedModule)
      return response.status(404).json({ error: 'module not found' })

    const updatedModuleItem = updatedModule.moduleItems.id(request.params.id)

    if (!updatedModuleItem)
      return response.status(404).json({ error: 'module item not found' })

    if (body.title) updatedModuleItem.title = body.title
    if (body.type) updatedModuleItem.type = body.type
    if (body.url) updatedModuleItem.url = body.url

    const updatedCourse = await course.save()

    return response.json(updatedCourse.modulesJSON())
  } catch (err) {
    console.log(err)
    response.status(400).json({ error: err.message || err.toString() })
  }
}

const deleteModuleItem = async (request, response) => {
  try {
    const course = await Course.findById(request.params.courseId)

    const deletedModule = course.modules.id(request.params.moduleId)
    if (!deletedModule)
      return response.status(404).json({ error: 'module not found' })

    const result = deletedModule.moduleItems.id(request.params.id)

    if (!result)
      return response.status(404).json({ error: 'module item not found' })

    result.remove()

    const updatedCourse = await course.save()
    response.json(updatedCourse.modulesJSON())
  } catch (err) {
    console.log(err)
    response.status(400).json({ error: err.message || err.toString() })
  }
}

module.exports = {
  createModuleItem,
  updateModuleItem,
  deleteModuleItem
}
