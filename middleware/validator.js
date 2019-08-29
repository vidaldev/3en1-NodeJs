'use strict'
const firebase_admin = require('../firebase-admin/admin')
const firebase_client = require('../firebase-admin/client')

module.exports = {
  auth: async function (req, res, next) {
    const authCliente = firebase_client.auth()
        
    const email = req.body.email
    const password = req.body.password

    if ((email == undefined || email == '') || (password == undefined || password == '')) {
      res.status(401).send({
        'message': 'Los parametros estan incompletos, revise la informacion suministrada antes de enviar nuevamente.',
        'reason':'missing parameters'
      })
    }
    
    let user = await authCliente.signInWithEmailAndPassword(email,password)
      .catch((error) => {
        res.status(401).send('Error autenticando:', error);
      })

    
    const verified = user.user.emailVerified
    const uuid = user.user.uid
    
    let token
    await authCliente.currentUser.getIdToken().then(data => token = data)
    
    if (!verified) {
      const response = {
        'message' : 'Debe validar su correo para poder hacer uso de esta cuenta',
        'reason' : 'not-verified'
      }
      res.status(401).send(response)
    }
    
    const decodedToken = await firebase_admin.auth().verifyIdToken(token)

    if (decodedToken.uid && decodedToken.uid == uuid) {
      next()
    } else {
      const verified = {
        'message' : 'El token es incorrecto.',
        'reason' : 'incorrect-token'
      }
      res.status(401).send(verified)
    }
  }
}