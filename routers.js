'use strict'

function route (app) {
  app.use('/', require('./api/general'))
  app.use('/login', require('./api/user/login'))
  app.use('/createUser', require('./api/user/createUser'))
  app.use('/forgotPassword', require('./api/user/forgotPassword'))
  app.use('/alquilar', require('./api/rental/crear'))
  app.use('/alquileres', require('./api/rental/alquiler'))
  app.use('/cerrarAlquiler', require('./api/rental/cerrar'))
  app.use('/corregirDatos', require('./api/rental/corregir'))
}

module.exports = route