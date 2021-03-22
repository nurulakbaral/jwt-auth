const dotenv = require('dotenv')

// Setup
const env = process.env.NODE_ENV || 'development'
dotenv.config()

// Notes : For base config (default for any env)
const config = {
    env,
    port: process.env.PORT,
    secrets: {
        clientUrl: process.env.CLIENT_URL,
        dbUrl: process.env.DB_URL,
        jwtSecret: process.env.JWT_SECRET,
        jwtExp: process.env.JWT_EXPIRES_IN
    }
}

// Notes : Config for dev, prod, or testing env if exist
const envConfig = {}

// Notes : Config for base and env config
const mergeConfig = { ...config, ...envConfig }

module.exports = mergeConfig

