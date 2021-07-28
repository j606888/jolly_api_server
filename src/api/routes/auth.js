const  { Router } = require ("express")
const { celebrate, Joi, Segments } = require("celebrate")
const Auth = require ('../../services/auth')
const AuthService = new Auth()

const route = Router()

module.exports =  (app) => {
  app.use("/auth", route)

  route.post("/register", celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required()
    })
  }),
   async (req, res) => {
    // await AuthService.signup({ email: req.body.email, password: 'sss'})
    // const user = await User.findOne({})
    res.json({ hello: req.body })
  })
}
