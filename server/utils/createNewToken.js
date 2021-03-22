const jwt = require('jsonwebtoken')

const createNewToken = (userId = null) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: parseInt(process.env.JWT_EXPIRES_IN)
    })
}

module.exports = createNewToken