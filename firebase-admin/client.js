const client = require('firebase')
const dotenv = require('dotenv').config()

client.initializeApp({
  "apiKey": process.env.FIREBASE_APIKEY,
  "authDomain": process.env.FIREBASE_AUTHDOMAIN,
  "databaseURL": process.env.FIREBASE_DATABASEURL,
  "projectId": process.env.FIREBASE_PROJECT_ID,
  "storageBucket": process.env.FIREBASE_STORAGEBUCKET,
  "messagingSenderId": process.env.FIREBASE_MESSAGINGSENDERID
})
module.exports = client;