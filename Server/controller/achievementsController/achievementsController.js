const Achievement = require('../../models/achievement')

const getUserAchievments = async (request, response) => {
  try {
    const user = request.user

    const result = await Achievement.find({ user: user._id })
      .populate('user course')
      .exec()

    return response.json(result)
  } catch (err) {
    console.log(err)
    response.status(400).json({ error: err.message || err.toString() })
  }
}

module.exports = {
  getUserAchievments
}
