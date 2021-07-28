const { User } = require ('../models')

module.exports = class Auth {
  constructor() {}

  async signup({ name, email, password}) {
    console.log(name, email, password)
  }
}