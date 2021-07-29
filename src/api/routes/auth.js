const { Router } = require("express")
const { celebrate, Joi, Segments } = require("celebrate")
const Auth = require("../../services/auth")
const AuthService = new Auth()

const route = Router()

module.exports = (app) => {
  app.use("/auth", route)

  route.post(
    "/register",
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().min(8).required(),
      }),
    }),
    async (req, res) => {
      if (await AuthService.emailExist(req.body.email))
        return res.status(409).json({ error: "Eamil was taken" })

      const user = await AuthService.register(req.body)
      const tokenInfo = await AuthService.generateToken(user)
      const result = { ...user.basicInfo(), ...tokenInfo }

      res.json(result)
    }
  )

  route.post(
    "/signin",
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    async (req, res) => {
      const user = await AuthService.signin(req.body)
      if (!user) return res.status(404).json({ error: "User not found" })

      const tokenInfo = await AuthService.generateToken(user)
      const result = { ...user.basicInfo(), ...tokenInfo }

      res.json(result)
    }
  )
}
