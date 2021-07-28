const { Router } =  require('express')
const { User } =  require("../../models")
const route = Router()

module.exports =  (app) => {
  app.use('/users', route)

  route.get('/', async (req, res) => {
    const user = await User.findOne({})
    res.json({ user })
  })
}