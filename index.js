const serverless = require('serverless-http')
const express = require('express')
const { errors } = require('celebrate')
const routes = require('./src/api')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.get('/', (req, res) => {
  const secret = {
    host: process.env.POSTGRES_HOST,
    db: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    name: process.env.NAME
  }
  
  res.json(secret)
})

app.use('/api/v1', routes())
app.use(errors())

module.exports.handler = serverless(app)