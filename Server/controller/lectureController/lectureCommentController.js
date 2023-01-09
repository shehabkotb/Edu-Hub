const LectureComments = require('../../models/lectureComments')

const getAllComments = async (request, response) => {
  try {
    const moduleItemId = request.params.moduleItemId
    if (!moduleItemId)
      return response.status(400).json({ error: 'missing module item id' })

    const comments = await LectureComments.findOne({
      moduleItemId: moduleItemId
    }).populate('comments.user', '_id name username photo')

    if (!comments) return response.json({})

    return response.json(comments)
  } catch (err) {
    console.log(err)
    response.status(400).json({ error: err.message || err.toString() })
  }
}

const createComment = async (request, response) => {
  try {
    const user = request.user
    const courseId = request.params.courseId
    const moduleItemId = request.params.moduleItemId
    const comment = request.body.comment

    if (!courseId || !moduleItemId)
      return response
        .status(400)
        .json({ error: 'missing course or module item id' })
    if (!comment) return response.status(400).json({ error: 'missing comment' })

    let lectureComments = await LectureComments.findOne({
      moduleItemId: moduleItemId
    })

    if (!lectureComments)
      lectureComments = new LectureComments({ courseId, moduleItemId })

    const newComment = { user, comment }
    lectureComments.comments.push(newComment)

    let result = await lectureComments.save()

    result = await result
      .populate('comments.user', '_id name username photo')
      .execPopulate()

    return response.json(result)
  } catch (err) {
    console.log(err)
    response.status(400).json({ error: err.message || err.toString() })
  }
}

const deleteComment = async (request, response) => {
  try {
    const moduleItemId = request.params.moduleItemId
    const commentId = request.params.commentId
    if (!moduleItemId || !commentId)
      return response
        .status(400)
        .json({ error: 'missing module item id or comment id' })

    let queryResult = await LectureComments.findOne({
      moduleItemId: moduleItemId
    })

    if (!queryResult)
      return response.status(404).json({ error: 'lecture comments not found' })

    comment = queryResult.comments.id(commentId)

    if (!comment)
      return response.status(404).json({ error: 'comment not found' })

    await comment.remove()

    let result = await queryResult.save()

    result = await result
      .populate('comments.user', '_id name username photo')
      .execPopulate()

    return response.json(result)
  } catch (err) {
    console.log(err)
    response.status(400).json({ error: err.message || err.toString() })
  }
}

module.exports = {
  getAllComments,
  createComment,
  deleteComment
}
