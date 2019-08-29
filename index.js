'use strict'

const express = require('express')
const dotenv = require('dotenv').config()
const bodyParser = require('body-parser')
const admin = require('./firebase-admin/admin')
const app = express()
const PORT = process.env.PORT
//const validator = require('./middleware/validator')

app.use(bodyParser.json())
app.use(bodyParser.json())
//app.use('/', validator.verifyToken);

require('./routers')(app)

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})