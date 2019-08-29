'use strict'

const express = require('express')
const controller = require('./user.controller')
const validator = require('../../middleware/validator')
const router = express.Router()

router.get('/',[validator.auth], controller.login)

module.exports = router