const dotenv = require('dotenv')
const mongoose = require('mongoose')

// Setup
dotenv.config()

// Database config
const connect = (DB_URL = process.env.DB_URL, options = {}) => {
    return mongoose
        .connect(DB_URL, {
            ...options,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })

}

module.exports = { connect }