'use strict'

const firebase_admin = require('../../firebase-admin/admin')
const firebase_client = require('../../firebase-admin/client')
module.exports = {
  createUser: async function (req, res) {
    const authClient = firebase_client.auth()
    const var_email = req.body.email
    const var_password = req.body.password

    if((var_email == undefined || var_email == '') || (var_password == undefined || var_password == '')){
      response_incomplete = {
        'message': 'Los parametros estan incompletos, revise la informacion suministrada antes de enviar nuevamente.',
        'reason':'missing parameters'
      }
      res.status(401).send(response_incomplete)
    }
    await authClient.createUserWithEmailAndPassword(var_email,var_password).then(user => {
      authClient.currentUser.sendEmailVerification().catch(function() {
        const arg_err = {
          'message' : 'Ha ocurrido un problema, verifique la informacion suministrada. Si el error persiste comuniquese con el administrador del servicio',
          'email' : 'xtrate@protonmail.com',
          'reason' : 'invalid'
        }
        res.status(401).send(arg_err)
      })

      const verify = {
        'message' : 'Registro exitoso',
        'id' : user.user.uid,
        'alert': 'Verifique su correo antes de usar el servicio'
      }

      res.status(200).send(verify);
    })
    .catch(error => {  
      const arg_err = {
        'message' : 'Ha ocurrido un problema, verifique la informacion suministrada. Si el error persiste comuniquese con el administrador del servicio',
        'email' : 'xtrate@protonmail.com--',
        'reason' : 'invalid'
      }
      res.status(401).send(arg_err)
    })
  },
  fpassword: function (req, res) {
    const authClient = firebase_client.auth()
    const var_email = req.body.email

    if (var_email == undefined || var_email == '') {
      const response_incomplete = {
        'message': 'Los parametros estan incompletos, revise la informacion suministrada antes de enviar nuevamente.',
        'reason':'missing parameters'
      }

      res.status(401).send(response_incomplete)
    }

    try {
      authClient.sendPasswordResetEmail(var_email)

      const arg_recovery = {
        'message': 'Correo de recuperacion exitoso',
        'alert' : `Correo de recuperacion enviado a la direccion: ${var_email}`
      }

      res.status(200).send(arg_recovery)
    } catch (error) {
      const response_false = {
        'message' : 'Ha ocurrido un problema, verifique la informacion suministrada. Si el error persiste comuniquese con el administrador del servicio',
        'email' : 'xtrate@protonmail.com',
        'reason' : 'invalid'
      }
      res.status(401).send(response_false)
    }
  },
  login: function (req, res) {
    const response = {
      "response": "Loguea con exito"
    }
    res.status(200).send(response)
  }
}