'use strict'

const express = require('express')
const controller = require('./user.controller')
const router = express.Router()

router.post('/', controller.fpassword)

module.exports = router