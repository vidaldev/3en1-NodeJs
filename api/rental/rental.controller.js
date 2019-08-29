'use strict'

const firebase_admin = require('../../firebase-admin/admin')
const firebase_client = require('../../firebase-admin/client')

module.exports = {
  addData: async function (req, res) {
    const authClient = firebase_client.auth()
    const var_param = req.body
    const var_modelo = var_param['modelo']
    const var_marca = var_param['marca']
    const var_year = var_param['year']
    const var_color = var_param['color']
    const var_responsable = var_param['responsable']

    if ((var_modelo == undefined || var_modelo == '') || (var_marca == undefined || var_marca == '') || (var_year == undefined || var_year == '') || (var_color == undefined || var_color == '') || (var_responsable == undefined || var_responsable == '')) {
      const response_incomplete = {
        'message': 'Los parametros estan incompletos, revise la informacion suministrada antes de enviar nuevamente.',
        'reason':'missing parameters'
      }
      
      res.status(401).send(response_incomplete)
    }

    let token
    await authClient.currentUser.getIdToken().then(data => token = data)

    const decodedToken = await firebase_admin.auth().verifyIdToken(token)

    const uid = decodedToken.uid

    const date = new Date()

    const dateNow = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`

    const data = {
      'uid': uid,
      'modelo': var_modelo,
      'color': var_color,
      'marca': var_marca,
      'year': var_year,
      'responsable': var_responsable,
      'dia': dateNow,
      'status': 'pendiente'
    }
    
    try {
      const db = firebase_admin.firestore();
      db.collection('rentals').doc().set(data)
      
      const add_true = {
        'message' : 'El alquiler del vehiculo se ha insertado correctamente',
        'reason': 'sucess'
      }

      res.status(200).send(add_true)
    } catch (error) {
      const response_false = {
        'message' : 'Ha ocurrido un problema, verifique la informacion suministrada. Si el error persiste comuniquese con el administrador del servicio',
        'email' : 'xtrate@protonmail.com',
        'reason' : 'invalid',
        'error':error
      }

      res.status(401).send(response_false)
    }
  },
  getdata_all: async function (req, res) {
    const var_param = req.body

    const var_filtro = var_param['filtro']

    if (var_filtro == undefined || var_filtro == '') {
      const response_incomplete = {
        'message': 'Los parametros estan incompletos, revise la informacion suministrada antes de enviar nuevamente.',
        'reason':'missing parameters'
      }
      
      res.status(401).send(response_incomplete)
    }

    if (var_filtro != 'todo' && var_filtro != 'pendiente' && var_filtro != 'entregado') {
      const response_false = {
        'message' : 'Ha ocurrido un problema, verifique la informacion suministrada. Si el error persiste comuniquese con el administrador del servicio',
        'email' : 'xtrate@protonmail.com',
        'reason' : 'invalid'
      }

      res.status(401).send(response_false)
    }

    try {
      const db = firebase_admin.firestore();
      let docs_arg = []
      if (var_filtro == 'todo'){
        await db.collection('rentals').get()
        .then((snapshot) => {
          let i = 0
          snapshot.forEach(doc => {
            const data = doc.data()
            docs_arg[i] = data
            i++
          });
        })
      }
      if (var_filtro == 'pendiente' || var_filtro == 'entregado') {
        await db.collection('rentals').where('status', '==', var_filtro).get()
        .then((snapshot) => {
          let i = 0
          snapshot.forEach(doc => {
            const data = doc.data()
            docs_arg[i] = data
            i++
          });
        })
      }

      let new_docs_arg = []
      docs_arg.forEach( (val,i) => {
        new_docs_arg[i] = {
          'marca' : val['marca'],
          'color' : val['color'],
          'year' : val['year'],
          'dia' : val['dia'],
          'status' : val['status'],
          'responsable' : val['responsable'],
          'modelo' : val['modelo']
        }
      });

      res.status(200).send(new_docs_arg)
    } catch (error) {
      const response_false = {
        'message' : 'Ha ocurrido un problema, verifique la informacion suministrada. Si el error persiste comuniquese con el administrador del servicio',
        'email' : 'xtrate@protonmail.com',
        'reason' : 'invalid'
      }

      res.status(401).send(response_false)
    }
  },
  getdata_user: async function (req, res) {
    const authClient = firebase_client.auth()
    const var_param = req.body

    const var_filtro = var_param['filtro']

    if (var_filtro == undefined || var_filtro == '') {
      const response_incomplete = {
        'message': 'Los parametros estan incompletos, revise la informacion suministrada antes de enviar nuevamente.',
        'reason':'missing parameters'
      }
      
      res.status(401).send(response_incomplete)
    }

    if (var_filtro != 'todo' && var_filtro !='pendiente' && var_filtro != 'entregado') {
      const response_false = {
        'message' : 'Ha ocurrido un problema, verifique la informacion suministrada. Si el error persiste comuniquese con el administrador del servicio',
        'email' : 'xtrate@protonmail.com',
        'reason' : 'invalid'
      }

      res.status(401).send(response_false)
    }

    let token
    await authClient.currentUser.getIdToken().then(data => token = data)

    const decodedToken = await firebase_admin.auth().verifyIdToken(token)

    const uid = decodedToken.uid

    try {
      const db = firebase_admin.firestore();
      let docs_arg = []
      if (var_filtro == 'todo'){
        await db.collection('rentals').where('uid', '==', uid).get()
        .then((snapshot) => {
          let i = 0
          snapshot.forEach(doc => {
            const data = doc.data()
            docs_arg[i] = data
            i++
          });
        })
      }
      if (var_filtro == 'pendiente' || var_filtro == 'entregado') {
        await db.collection('rentals').where('uid', '==', uid).where('status', '==', var_filtro).get()
        .then((snapshot) => {
          let i = 0
          snapshot.forEach(doc => {
            const data = doc.data()
            docs_arg[`${doc.id}`] = data
            i++
          });
        })
      }
      
      let new_docs_arg = {}
      for (let i in docs_arg) {
        let val = docs_arg[i]
        new_docs_arg[i] = {
          'marca' : val['marca'],
          'color' : val['color'],
          'year' : val['year'],
          'dia' : val['dia'],
          'status' : val['status'],
          'responsable' : val['responsable'],
          'modelo' : val['modelo']
        }
      }
      res.status(200).send(new_docs_arg)
    } catch (error) {
      const response_false = {
        'message' : 'Ha ocurrido un problema, verifique la informacion suministrada. Si el error persiste comuniquese con el administrador del servicio',
        'email' : 'xtrate@protonmail.com',
        'reason' : 'invalid'
      }

      res.status(401).send(response_false)
    }

  },
  updateData: async function (req, res) {
    const var_param = req.body

    const var_document = var_param['id']

    if (var_document == undefined || var_document == '') {
      const response_incomplete = {
        'message': 'Los parametros estan incompletos, revise la informacion suministrada antes de enviar nuevamente.',
        'reason':'missing parameters'
      }
      
      res.status(401).send(response_incomplete)
    }

    // Se evalua si algunas de los campos necesita modificación  
    const var_color = var_param['color']
    const var_marca = var_param['marca']
    const var_year = var_param['year']
    const var_responsable = var_param['responsable']
    const var_modelo = var_param['modelo']

    let modify_arg = {}

    if (var_color != undefined && var_color != '') { modify_arg['color'] = var_color }
    if (var_marca != undefined && var_marca != '') { modify_arg['marca'] = var_marca }
    if (var_year != undefined && var_year != '') { modify_arg['year'] = var_year }
    if (var_responsable != undefined && var_responsable != '') { modify_arg['responsable'] = var_responsable }
    if (var_modelo != undefined && var_modelo != '') { modify_arg['modelo'] = var_modelo }

    try {
      const db = firebase_admin.firestore();

      await db.collection('rentals').doc(var_document).set(modify_arg,{merge:true})

      res.status(200).send({
        'message' : 'La data ha sido actualizada correctamente',
        'reason': 'successful update'
      })
    } catch (error) {
      const response_false = {
        'message' : 'Ha ocurrido un problema, verifique la informacion suministrada. Si el error persiste comuniquese con el administrador del servicio',
        'email' : 'xtrate@protonmail.com',
        'reason' : 'invalid'
      }

      res.status(401).send(response_false)
    }
  },
  closeData: async function (req, res) {
    const var_param = req.body

    const var_document = var_param['id']
    const var_filtro = var_param['filtro']

    if ((var_document == undefined || var_document == '') && (var_filtro == undefined || var_filtro == '')) {
      const response_incomplete = {
        'message': 'Los parametros estan incompletos, revise la informacion suministrada antes de enviar nuevamente.',
        'reason':'missing parameters'
      }
      
      res.status(401).send(response_incomplete)
    }

    if (var_filtro != 'entregado') {
      const response_false = {
        'message' : 'Ha ocurrido un problema, verifique la informacion suministrada. Si el error persiste comuniquese con el administrador del servicio',
        'email' : 'xtrate@protonmail.com',
        'reason' : 'invalid'
      }

      res.status(401).send(response_false)
    }

    try {
      const db = firebase_admin.firestore();

      await db.collection('rentals').doc(var_document).set({'status':var_filtro},{merge:true})

      res.status(200).send({
        'message' : 'La data ha sido actualizada correctamente',
        'reason': 'successful update'
      })
    } catch (error) {
      const response_false = {
        'message' : 'Ha ocurrido un problema, verifique la informacion suministrada. Si el error persiste comuniquese con el administrador del servicio',
        'email' : 'xtrate@protonmail.com',
        'reason' : 'invalid'
      }

      res.status(401).send(response_false)
    }

  }
}