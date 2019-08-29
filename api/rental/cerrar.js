'use strict'

const express = require('express')
const controller = require('./rental.controller')
const validator = require('../../middleware/validator')
const router = express.Router()

router.post('/',[validator.auth],controller.closeData)

module.exports = router