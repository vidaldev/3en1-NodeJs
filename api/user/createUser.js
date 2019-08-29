'use strict'

const express = require('express')
const controller = require('./user.controller')
const router = express.Router()

router.post('/', controller.createUser)

module.exports = router