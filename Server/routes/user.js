const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()
const {
  createUser,
  forgetPassword,
  login,
  updateUser,
  logout,
  deleteUser,
  me
} = require('../controller/userController/userController')

const {
  RECOVER,
  RESET,
  ResetPassword
} = require('../controller/userController/passwordController')

router.post('/register', createUser)
router.post('/forgetpassword', forgetPassword)
router.post('/login', login)
router.post('/logout', logout)
router.post('/recover', RECOVER)
router.get('/reset/:token', RESET)
router.post('/reset/:token', ResetPassword)
router.get('/me', auth, me)
router.patch('/me', auth, updateUser)
router.delete('/me', auth, deleteUser)

module.exports = router
