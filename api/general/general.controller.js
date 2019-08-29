'use strict'

const firebase = require('../../firebase-admin/admin')

module.exports = {
  default: function (req, res) {
    const response = {
      "response": "Para usar este servicio lea la documentacion.",
      "documentacion": ""
    }
    res.status(200).send(response)
  }
}