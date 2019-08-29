'use strict'

const express = require('express')
const controller = require('./rental.controller')
const validator = require('../../middleware/validator')
const router = express.Router()

router.post('/',[validator.auth],controller.getdata_all)
router.post('/user',[validator.auth],controller.getdata_user)

module.exports = router