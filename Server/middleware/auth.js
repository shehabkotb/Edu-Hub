const jwt = require('jsonwebtoken')
const User = require('../models/user')
require('dotenv').config()

const auth = async (req, res, next) => {
  try {
    const authorization = req.get('authorization')
    if (authorization && authorization.startsWith('Bearer')) {
      token = authorization.substring(7)
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    const user = await User.findOne({ _id: decoded._id })

    const invalidToken = await User.findOne({
      _id: decoded._id,
      invalidatedTokens: token
    })

    if (invalidToken)
      return res.status(401).send({ error: 'Please authenticate.' })

    if (!user) {
      throw new Error('Please Register first')
    }

    req.token = token
    req.user = user
    next()
  } catch (e) {
    // console.log(authorization)
    res.status(401).send({ error: 'Please authenticate.' })
  }
}

module.exports = auth
