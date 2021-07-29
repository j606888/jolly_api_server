const { User } = require("../models")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

module.exports = class Auth {
  constructor() {}

  async emailExist(email) {
    const existUser = await User.findOne({ where: { email } })
    return !!existUser
  }

  async register({ name, email, password }) {
    const encryptedPasword = bcrypt.hashSync(
      password,
      process.env.PASSWORD_SALT
    )
    const user = await User.create({ name, email, password: encryptedPasword })
    return user
  }

  async signin({ email, password }) {
    const user = await User.findOne({ where: { email } })
    if (user && bcrypt.compareSync(password, user.password)) return user
  }

  async generateToken(user) {
    const token = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SALT, {
      expiresIn: "1w",
    })
    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SALT)
    await user.update({ refreshToken })

    return { token, refreshToken }
  }
}
