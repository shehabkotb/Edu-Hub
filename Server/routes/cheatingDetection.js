const express = require('express');
const auth = require('../middleware/auth')
const {
  detectCheating,
  clear,
  getResult
} = require('../controller/cheatingDetectionController/cheatingDetectionController')

const router = new express.Router();

router.post('/checkCheating', auth, detectCheating)
router.delete('/clear', auth, clear)
router.post('/getResult', getResult)

module.exports = router
