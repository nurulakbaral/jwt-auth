const jwt = require('jsonwebtoken')
const config = require('../config')

const createNewToken = (userId = null) => {
    return jwt.sign({ userId }, config.secrets.jwtSecret, {
        expiresIn: config.secrets.jwtExp
    })
}

module.exports = createNewToken