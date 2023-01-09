const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

require('dotenv').config()

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: [true, 'This username is already taken!'],
    lowercase: true
  },
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid')
      }
    }
  },
  photo: {
    type: String,
    default: 'https://www.w3schools.com/howto/img_avatar.png'
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password cannot contain "password"')
      }
    }
  },
  passwordConfirm: {
    type: String,
    required: true,
    minlength: [7, 'Password should have atleast 7 characters.'],
    validate: {
      validator: function (val) {
        return toString(this.password) === toString(val)
      },
      message: 'Provided passwords do not match. Please try again'
    }
  },
  passwordChangedAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
  passwordResetToken: {
    type: String,
    select: false
  },
  passwordResetValidity: {
    type: Date,
    select: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastSeenAt: {
    type: Date,
    default: 0
  },
  code: {
    type: Number
  },
  mobile: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d{3}-\d{3}-\d{4}/.test(v)
      },
      message: (props) => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
  },
  invalidatedTokens: [String],
  role: {
    type: String,
    enum: ['admin', 'student', 'instructor'],
    default: 'student'
  },
  enrollments: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Course'
    }
  ],
  isEmailRegistered: {
    type: Boolean,
    default: false
  }
})

userSchema.index({ name: 1, username: 1 })

userSchema.virtual('Assignment', {
  ref: 'Assignment',
  localField: '_id',
  foreignField: 'owner'
})

userSchema.virtual('followers', {
  ref: 'Follow',
  foreignField: 'follows',
  localField: '_id'
})

userSchema.virtual('followersCount', {
  ref: 'Follow',
  foreignField: 'follows',
  localField: '_id',
  count: true
})

userSchema.virtual('follows', {
  ref: 'Follow',
  foreignField: 'user',
  localField: '_id'
})

userSchema.virtual('followCount', {
  ref: 'Follow',
  foreignField: 'user',
  localField: '_id',
  count: true
})

userSchema.virtual('articles', {
  ref: 'Article',
  foreignField: 'createdBy',
  localField: '_id'
})

userSchema.virtual('view', {
  ref: 'View',
  foreignField: 'user',
  localField: '_id'
})

userSchema.virtual('articlesCount', {
  ref: 'Article',
  foreignField: 'createdBy',
  localField: '_id',
  count: true
})

userSchema.methods.toJSON = function () {
  const user = this.toObject()
  return {
    ...user,
    password: undefined,
    __v: undefined,
    invalidatedTokens: undefined,
    passwordConfirm: undefined
  }
}

userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET_KEY, {
    expiresIn: 86400
  })

  return token
}

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error('Unable to login')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new Error('Unable to login 2')
  }

  return user
}

userSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
