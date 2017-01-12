'use strict'

const db = require('APP/db')
const api = module.exports = require('express').Router()
const getfilteredshoesRoute = require('./getFilteredShoes')

api
  .get('/heartbeat', (req, res) => res.send({ok: true,}))
  .use('/auth', require('./auth'))
  .use('/users', require('./users'))
  .use('/getfilteredshoes', getfilteredshoesRoute)
  .use('/comments', require('./comments'))
  .use('/orders', require('./orders'))

// Send along any errors
api.use((err, req, res, next) => {
  console.log(err, err.stack)
  res.status(500).send(err)
})

// No routes matched? 404.
api.use((req, res) => res.status(404).end())
